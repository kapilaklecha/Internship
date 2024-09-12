const secHand = document.getElementById("hands-sec");
const minHand = document.getElementById("hands-min");
const hrHand = document.getElementById("hands-hr");
const clockDigit = document.getElementById("digit-parent");
let dateToday = document.querySelector("#date");

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

function darkTheme() {
  document.body.style.backgroundColor = "black";
  minHand.style.backgroundColor = "white";

  hrHand.style.backgroundColor = "white";
  btn.style.backgroundColor = "black";
  clockDigit.style.backgroundColor = "white";
  dateToday.style.color = "white";
}

btn.addEventListener("click", darkTheme);
