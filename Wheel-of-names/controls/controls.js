import { user } from "../store.js";

const textArea = document.querySelector("#entries-panel");
const entriesTabBtn = document.querySelector("#entries-btn");
const resultsTabBtn = document.querySelector("#results-btn");
const resultsTab = document.querySelector("#results-wrapper");
const entriesTab = document.querySelector("#controls-wrapper");

let userObj = {};

textArea.addEventListener("input", () => {
  let textVal = textArea.value;
  userObj.text = textVal;

  user.push(userObj);
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
