let count = 0;
let index = 0;

// Default Zikr List
let zikrList = ["SubhanAllah", "Alhamdulillah", "Allahu Akbar"];

// Sound
let sound = new Audio("beep.mp3");
// Load saved data on start
window.onload = function () {

// Load count
if (localStorage.getItem("count")) {
count = parseInt(localStorage.getItem("count"));
}

// Load zikr index
if (localStorage.getItem("zikrIndex")) {
index = parseInt(localStorage.getItem("zikrIndex"));
}

// Load limit
if (localStorage.getItem("limit")) {
document.getElementById("limit").value = localStorage.getItem("limit");
}

// Display
document.getElementById("count").innerText = count;
document.getElementById("zikr").innerText = zikrList[index];

};
// COUNT BUTTON
function increase() {

count++;

let limit = parseInt(document.getElementById("limit").value);

// Normal vibration
if (navigator.vibrate) {
navigator.vibrate(50);
}

// When limit reached
if (count === limit) {

// Sound
sound.play().catch(() => {});

// Strong vibration
if (navigator.vibrate) {
  navigator.vibrate([200, 100, 200]);
}

// Show done message
showDone();

}

// Reset after limit
if (count > limit) {
count = 1;
}

// Update display
document.getElementById("count").innerText = count;

// Save
localStorage.setItem("count", count);
}// RESET BUTTON
function reset() {
count = 0;

document.getElementById("count").innerText = count;

localStorage.setItem("count", count);
}

// CHANGE ZIKR
function changeZikr() {

index++;

if (index >= zikrList.length) {
index = 0;
}

document.getElementById("zikr").innerText = zikrList[index];

localStorage.setItem("zikrIndex", index);
}// ADD CUSTOM ZIKR
function addZikr() {

let input = document.getElementById("newZikr");

if (input.value.trim() !== "") {

zikrList.push(input.value);

input.value = "";

alert("Zikr Added ✅");

}
}

// DONE MESSAGE FUNCTION
function showDone() {

let msg = document.getElementById("doneMsg");

msg.style.display = "block";

setTimeout(() => {
msg.style.display = "none";
}, 2000);
}

// SAVE LIMIT CHANGE
document.getElementById("limit").addEventListener("change", function () {
localStorage.setItem("limit", this.value);
});

// THEME CHANGE
let themes = [
"linear-gradient(135deg, #020617, #0f172a)",
"linear-gradient(135deg, #1e3a8a, #9333ea)",
"linear-gradient(135deg, #065f46, #16a34a)"
];

let themeIndex = 0;

function changeTheme() {

themeIndex++;

if (themeIndex >= themes.length) {
themeIndex = 0;
}

document.body.style.background = themes[themeIndex];
}

// DARK / LIGHT MODE
function toggleMode() {

document.body.classList.toggle("light-mode");
}