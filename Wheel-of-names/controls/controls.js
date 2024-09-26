import { resultsArr, setEntry, users } from "../store.js";
import { drawWheel } from "../wheel/wheel.js";

const textArea = document.querySelector("#entries-panel");
const entriesTabBtn = document.querySelector("#entries-btn");
const resultsTabBtn = document.querySelector("#results-btn");
const resultsTab = document.querySelector("#results-wrapper");
const entriesTab = document.querySelector("#controls-wrapper");
const hideBtn = document.querySelector("#hide-btn");
const controlParent = document.querySelector("#controls-board");
const headerLeftC = document.querySelector(".controls-h-left");
const clearBtn = document.querySelector("#clear-btn");
const results = document.querySelector(".display-results");
const sortBtn = document.querySelector("#sortBtn");
const sortBtnEnt = document.querySelector("#sortBtnEnt");

textArea.addEventListener("input", () => {
  let textVal = textArea.value;
});

function showTabEntries() {
  entriesTab.style.display = "block";
  resultsTab.style.display = "none";
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

function updateNames() {
  const textInput = textArea.value.trim();
  const nameList = textInput.split("\n").filter((name) => name.trim() !== "");

  users.length = 0;
  nameList.forEach((name, index) => {
    users.push({
      id: index + 1,
      text: name.trim(),
      color: "",
    });
  });

  drawWheel();
}

textArea.addEventListener("input", updateNames);

function clearResultsList() {
  console.log(textArea.value);
  results.innerHTML = "";
  resultsArr.length = 0;
}

clearBtn.addEventListener("click", clearResultsList);

function shortList(arr) {
  if (arr.name == "entries") {
    arr.value = arr.value.split("\n").sort().join("\n");
  } else {
    let sortedArr = arr.sort();
    return sortedArr;
  }
}

function updateSortedList(arr) {
  if (arr.length == 0) return;
  let sortedList = shortList(arr);
  setEntry(sortedList);
  results.innerHTML = "";
  resultsArr.forEach((val) => {
    let child = document.createElement("div");
    child.innerText = val;
    results.append(child);
  });
}

sortBtn.addEventListener("click", () => updateSortedList(resultsArr));
sortBtnEnt.addEventListener("click", () => shortList(textArea));
