import { resultsArr, setContent, setEntry, users } from "../store.js";
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
const shuffleBtn = document.querySelector("#shuffleBtn");
const advanceCard = document.querySelector(".controls-advance");
const advanceBtn = document.querySelector("#advance");
const controlsBasic = document.querySelector(".controls-basic");
const addEntry = document.querySelector("#add-entry");
const controlsAdvCard = document.querySelector(".controls-a-card");
const advanceCardHold = document.querySelector(".advance-card-hold");
const controlsParentP = document.querySelector(".controls-parent");
const file = document.querySelector("#file");
// This function is to show Entries tab.
function showTabEntries() {
  entriesTab.style.display = "block";
  resultsTab.style.display = "none";
  entriesTabBtn.style.borderBottom = "2px solid black";
  resultsTabBtn.style.borderBottom = "none";
}

// This function is to show Result tab.
function showTabResults() {
  entriesTab.style.display = "none";
  resultsTab.style.display = "block";
  resultsTabBtn.style.borderBottom = "2px solid black";
  entriesTabBtn.style.borderBottom = "none";
}

entriesTabBtn.addEventListener("click", showTabEntries);
resultsTabBtn.addEventListener("click", showTabResults);

// function to hide and show the entire controls panel.
function hideShow() {
  if (hideBtn.checked) {
    controlParent.style.display = "none";
    headerLeftC.style.display = "none";

    controlsParentP.style.boxShadow = "none";
  }

  if (!hideBtn.checked) {
    controlParent.style.display = "block";
    headerLeftC.style.display = "block";
  }
}

hideBtn.addEventListener("click", hideShow);
// This function is to show the advance tab which is currently disabled.
function hideShowAdv() {
  if (advanceBtn.checked) {
    advanceCard.style.display = "block";
    controlsBasic.style.display = "none";
  }
  if (!advanceBtn.checked) {
    advanceCard.style.display = "none";
    controlsBasic.style.display = "block";
  }
}

advanceBtn.addEventListener("click", hideShowAdv);

const colors = [
  "#FF6347",
  "#FFD700",
  "#90EE90",
  "#87CEFA",
  "#FF69B4",
  "#9370DB",
];
// This function (updateNames) is updating the json.
// Json is in the store.js with the name users.
// Json is updated dynamically as user provide input.
function updateNames() {
  const textInput = textArea.value.trim();
  const nameList = textInput.split("\n").filter((name) => name.trim() !== "");

  users.length = 0;
  nameList.forEach((name, index) => {
    users.push({
      id: index + 1,
      text: name.trim(),
      color: colors[index % colors.length], // Random colors assigned the users (Because not custome color input provided to users).
    });
  });

  drawWheel();
}

textArea.addEventListener("input", updateNames);

// functions to clear the results tab.
function clearResultsList() {
  results.innerHTML = "";
  resultsArr.length = 0;
}

clearBtn.addEventListener("click", clearResultsList);

// functions for shorting the lists
function shortList(arr) {
  if (arr.name == "entries") {
    arr.value = arr.value.split("\n").sort().join("\n");
  } else {
    let sortedArr = arr.sort();
    return sortedArr;
  }
}

//function for updating the shorted list to ui.
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

// function for shuffling the list.
function shuffle(arr) {
  if (arr.name == "entries") {
    let array = arr.value.split("\n");

    let currentIndex = array.length;

    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    arr.value = array.join("\n");
  }
}

shuffleBtn.addEventListener("click", () => shuffle(textArea));

// This function is to add cards in advance mode (which is currently disabled).
function addEntryCard() {
  let child = controlsAdvCard.cloneNode(true);
  advanceCardHold.append(child);
}

addEntry.addEventListener("click", addEntryCard);

function fileRead(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    let content = e.target.result;
    let jsonfile = JSON.parse(content);
    setContent(jsonfile);

    drawWheel();
  };

  if (file) {
    reader.readAsText(file);
  }
}

file.addEventListener("change", fileRead);
