const optionsContainerLeft = document.querySelector(".options-container.left");
const selectBoxBtnLeft = document.querySelector(".selected-btn.left");
const unitTitleLeft = document.querySelector(".input-title.left");

const optionsContainerRight = document.querySelector(
  ".options-container.right"
);
const selectBoxBtnRight = document.querySelector(".selected-btn.right");
const unitTitleRight = document.querySelector(".input-title.right");

const inputField = document.querySelector(".input-field");
const outputField = document.querySelector(".output-field");

let optionsArrayLeft = new Array();
let optionsArrayRight = new Array();

const units = {
  kg: 1,
  gram: 1000,
  pound: 2.20462,
  oz: 35.274,
  ton: 0.00110231,
};

let currentUnitLeft;
let currentUnitRight;

const addUnitBtn = document.querySelector(".add-unit-btn");
const addUnitContainer = document.querySelector(".add-unit");
const showAddUnitBtn = document.querySelector(".show-add-unit-btn");

const newUnitName = document.querySelector(".new-unit-name");
const newUnitConversion = document.querySelector(".new-unit-conversion");

selectBoxBtnLeft.addEventListener("click", () => {
  optionsContainerLeft.classList.toggle("active");
});

selectBoxBtnRight.addEventListener("click", () => {
  optionsContainerRight.classList.toggle("active");
});

setInputFilter(inputField, function (value) {
  return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
});

inputField.addEventListener("input", () => {
  updateFields();
});

addUnitBtn.addEventListener("click", () => {
  addUnitContainer.classList.remove("active-unit");

  const id = newUnitName.value;

  units[id] = newUnitConversion.value;

  localStorage.setItem(id, newUnitConversion.value);

  addOption(id, false, false);
  addOption(id, false, true);

  setTimeout(() => {
    showAddUnitBtn.style.opacity = "1";
    showAddUnitBtn.style.pointerEvents = "initial";
  }, 400);
});

showAddUnitBtn.addEventListener("click", () => {
  showAddUnitBtn.style.opacity = "0";
  showAddUnitBtn.style.pointerEvents = "none";

  setTimeout(() => {
    addUnitContainer.classList.add("active-unit");
  }, 400);
});

function updateFields() {
  const inputValue = parseFloat(inputField.value);
  if (Number.isNaN(inputValue)) {
    outputField.textContent = "";
    return;
  }
  outputField.textContent =
    (inputValue / units[currentUnitLeft]) * units[currentUnitRight];
}

function initization() {
  Object.entries(units).forEach(([key, item], index) => {
    index === 0 ? addOption(key, true, false) : addOption(key, false, false);
    index === 0 ? addOption(key, true, true) : addOption(key, false, true);
  });

  allStorage().forEach(([key, item]) => {
    addOption(key, false, false);
    addOption(key, false, true);

    units[key] = item;
  });
}

function addOption(id, active, left) {
  const option = document.createElement("div");
  option.classList.add("option");
  option.textContent = id;
  if (active) {
    option.classList.add("active-option");

    if (left) {
      unitTitleLeft.textContent = `From ${option.textContent}`;
      currentUnitLeft = id;
    } else {
      unitTitleRight.textContent = option.textContent;
      currentUnitRight = id;
    }
  }

  option.addEventListener("click", () => {
    if (left) {
      optionsContainerLeft.classList.remove("active");
      unitTitleLeft.textContent = `From ${option.textContent}`;
      deactivateOptions(optionsArrayLeft);
      currentUnitLeft = option.textContent;
    } else {
      optionsContainerRight.classList.remove("active");
      unitTitleRight.textContent = option.textContent;
      deactivateOptions(optionsArrayRight);
      currentUnitRight = option.textContent;
    }

    option.classList.add("active-option");
    updateFields();
  });

  if (left) {
    optionsContainerLeft.appendChild(option);
    optionsArrayLeft.push(option);
  } else {
    optionsContainerRight.appendChild(option);
    optionsArrayRight.push(option);
  }
}

function deactivateOptions(options) {
  options.forEach((item) => {
    item.classList.remove("active-option");
  });
}

// Code used from => https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
function setInputFilter(textbox, inputFilter) {
  [
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mouseup",
    "select",
    "contextmenu",
    "drop",
  ].forEach(function (event) {
    textbox.addEventListener(event, function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}

// Code used from => https://www.codegrepper.com/code-examples/javascript/how+to+get+all+items+in+localstorage
function allStorage() {
  var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

  while (i--) {
    values.push([keys[i], localStorage.getItem(keys[i])]);
  }

  return values;
}

initization();
updateFields();
