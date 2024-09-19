const secHand = document.getElementById("hands-sec");
const minHand = document.getElementById("hands-min");
const hrHand = document.getElementById("hands-hr");
const clockDigit = document.getElementById("digit-parent");
let dateToday = document.querySelector("#date");
const clockAna = document.getElementsByClassName("clock-ana");
const root = document.querySelector(":root");
const btnD = document.querySelector("#btn");

const nums = document.getElementsByClassName("nums");

function setClock() {
  const now = new Date();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    " Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const year = now.getFullYear();
  const date = now.getDate();
  const month = now.getMonth();

  const digitalClock = document.querySelector(".clock-digit");
  const amPm = document.querySelector(".am-pm");

  let displayHours = hours % 12 || 12;
  amPm.textContent = hours >= 12 ? "PM" : "AM";

  digitalClock.textContent = `${displayHours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;

  dateToday.textContent = `${date} ${months[month]}, ${year}`;

  const secDegree = (seconds / 60) * 360;
  secHand.style.transform = `rotate(${secDegree}deg)`;
  const hourDegree = ((hours % 12) + minutes / 60) * 30;
  hrHand.style.transform = `rotate(${hourDegree}deg)`;

  const minuteDegree = minutes * 6;
  minHand.style.transform = `rotate(${minuteDegree}deg)`;
}

setInterval(setClock, 1000);
setClock();

let btn = document.getElementById("btn");
let darkMode = false;

function darkTheme() {
  if (!darkMode) {
    darkMode = true;
  } else {
    darkMode = false;
  }
  if (darkMode) {
    root.style.setProperty("--font-c", "white");
    root.style.setProperty("--hands", "white");
    root.style.setProperty("--main-bg", "#4c4c4c");
    btnD.innerHTML = "&#x2600;";
  } else {
    root.style.setProperty("--font-c", "#4c4c4c");
    root.style.setProperty("--hands", "#4c4c4c");
    root.style.setProperty("--main-bg", "white");
    btnD.innerHTML = "&#x263D";
  }
}

btn.addEventListener("click", darkTheme);
