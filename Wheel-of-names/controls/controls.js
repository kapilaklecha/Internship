import { user } from "../store.js";

const textArea = document.querySelector("#entries-panel");
const entriesTabBtn = document.querySelector("#entries-btn");
const resultsTabBtn = document.querySelector("#results-btn");
const resultsTab = document.querySelector("#results-wrapper");
const entriesTab = document.querySelector("#controls-wrapper");
const hideBtn = document.querySelector("#hide-btn");
const controlParent = document.querySelector("#controls-board");
const headerLeftC = document.querySelector(".controls-h-left");

textArea.addEventListener("input", () => {
  let textVal = textArea.value;
});

function showTabEntries() {
  entriesTab.style.display = "block";
  resultsTab.style.display = "none";
  console.log(hideBtn.checked);
}

function showTabResults() {
  entriesTab.style.display = "none";
  resultsTab.style.display = "block";
}

entriesTabBtn.addEventListener("click", showTabEntries);
resultsTabBtn.addEventListener("click", showTabResults);

function hideShow() {
  if (hideBtn.checked) {
    controlParent.style.display = "none";
    headerLeftC.style.display = "none";
  }

  if (!hideBtn.checked) {
    controlParent.style.display = "block";
    headerLeftC.style.display = "block";
  }
}

hideBtn.addEventListener("click", hideShow);

let currentObject = { text: "" };

let objectsArray = [];

textArea.addEventListener("input", function () {
  currentObject.text = textArea.value;
  console.log(currentObject);
});

textArea.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    user.push({ ...currentObject });

    console.log("New object added:", currentObject);
    console.log("All objects:", user);

    textArea.value = "";
    currentObject = { text: "" };
  }
});
