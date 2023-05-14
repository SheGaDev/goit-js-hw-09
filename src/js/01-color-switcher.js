const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
let interval;
startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
    interval = setInterval(setBackgroundColor, 1000)
})
stopBtn.addEventListener("click", () => {
    startBtn.disabled = false;
    if (interval) clearInterval(interval);
})
function setBackgroundColor() {
    document.body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, 0)}`;
}