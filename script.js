let addBtn = document.querySelector(".add-btn");
let removeBtn = document.querySelector(".remove-btn");
let modalCont = document.querySelector(".modal-cont");
const allPriorityColors = document.querySelectorAll(".priority-color");

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

allPriorityColors.forEach(function(colorElem) {
    colorElem.addEventListener('click', function() {
        allPriorityColors.forEach(function(priorityColorElem) {
            priorityColorElem.classList.remove('active');
        })
        colorElem.classList.add('active');
        modalPriorityColor = colorElem.classList[0];
    })
})
