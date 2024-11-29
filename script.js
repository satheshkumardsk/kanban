let addBtn = document.querySelector(".add-btn");
let removeBtn = document.querySelector(".remove-btn");
let modalCont = document.querySelector(".modal-cont");
const allPriorityColors = document.querySelectorAll(".priority-color");
const textArea = document.querySelector(".textArea-cont");
const ticketColorArr = ["lightpink", "lightgreen", "lightblue", "black"];
let modalPriorityColor = ticketColorArr[0];
const tickets = [];

const toolBoxEl = document.querySelector(".toolbox-priority-cont");

const ticketsContainer = document.querySelector(".tickets-container");

let addTaskFlag = false;
let removeTaskFlag = false;

addBtn.addEventListener("click", function () {
  addTaskFlag = !addTaskFlag;
  if (addTaskFlag === true) {
    // flex
    modalCont.style.display = "flex";
  } else {
    // none
    modalCont.style.display = "none";
  }
});

removeBtn.addEventListener("click", function () {
  removeTaskFlag = !removeTaskFlag;
  if (removeTaskFlag === true) {
    // flex
    alert("Remove button activated");
    removeBtn.style.color = "red";
  } else {
    // none
    removeBtn.style.color = "white";
  }
});

allPriorityColors.forEach(function (colorElem) {
  colorElem.addEventListener("click", function () {
    allPriorityColors.forEach(function (priorityColorElem) {
      priorityColorElem.classList.remove("active");
    });
    colorElem.classList.add("active");
    modalPriorityColor = colorElem.classList[0];
  });
});

modalCont.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    const textAreaValue = textArea.value;
    createTicket(textAreaValue, modalPriorityColor);
    addTaskFlag = false;
    modalCont.style.display = "none";
    textArea.value = "";
  }
});

function createTicket(textAreaValue, modalPriorityColor, tId) {
  const ticketId = tId ? tId : Math.random();
  const ticketDetails = document.createElement("div");
  ticketDetails.setAttribute("class", "ticket-details");
  ticketDetails.innerHTML = `
  <div class="ticket-color ${modalPriorityColor}"></div>
  <div class="ticket-id">${ticketId}</div>
  <div class="ticket-text">${textAreaValue}</div>
  <div class="ticket-lock"><i class="fa-solid fa-lock"></i></div>
  `;
  ticketsContainer.appendChild(ticketDetails);
  handleRemoveTicket(ticketDetails);
  handleTicketLock(ticketDetails, ticketId);

  if(tId) return;
  tickets.push({
    ticketId,
    ticketColor: modalPriorityColor,
    ticketText: textAreaValue,
  });
}

function handleRemoveTicket(ticketDetails) {
  ticketDetails.addEventListener("click", function () {
    if (!removeTaskFlag) return;
    ticketDetails.remove();
  });
}

function handleTicketLock(ticketDetails, ticketId) {
  const ticketLock = ticketDetails.querySelector(".ticket-lock");
  ticketLock.addEventListener("click", function () {
    
    const ticketText = ticketDetails.querySelector(".ticket-text");
    const ticketIconStatus = ticketLock.querySelector("i");
    if (ticketIconStatus.classList.contains("fa-lock")) {
      ticketIconStatus.classList.remove("fa-lock");
      ticketIconStatus.classList.add("fa-lock-open");
      ticketText.setAttribute("contenteditable", "true");
    } else {
      ticketIconStatus.classList.remove("fa-lock-open");
      ticketIconStatus.classList.add("fa-lock");
      ticketText.setAttribute("contenteditable", "false");
    }
    tickets.forEach(function (ticket) {
      if (ticket.ticketId === ticketId) {
        ticket.ticketText = ticketText.innerHTML;
      }
    });
    console.log(tickets);
  });
}

toolBoxEl.addEventListener("click", function (e) {
  const selectedColor = e.target.classList[0];
  const allTicketsInDOM = document.querySelectorAll(".ticket-details");
  const filteredTickets = [];

  allTicketsInDOM.forEach(function (ticket) {
    const ticketColor = ticket.querySelector(".ticket-color").classList[1];
    if (ticketColor === selectedColor) {
      filteredTickets.push(ticket);
    }
    ticket.remove();
  });

  filteredTickets.forEach(function (ticket) {
    createTicket(ticket.querySelector(".ticket-text").innerHTML, ticket.querySelector(".ticket-color").classList[1], ticket.querySelector(".ticket-id").innerHTML);
  });

})

toolBoxEl.addEventListener("dblclick", function (e) {

  const allTicketsInDOM = document.querySelectorAll(".ticket-details");

  allTicketsInDOM.forEach(function (ticket) {
    ticket.remove();
  });

  tickets.forEach(function (ticket) {
    createTicket(ticket.ticketText, ticket.ticketColor, ticket.ticketId);
  });

})
