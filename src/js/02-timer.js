import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
function styleTimer() {
    const divTimer = document.querySelector(".timer");
    divTimer.style.cssText = "display: flex; gap: 10px; margin-top: 10px;"
    divTimer.querySelectorAll(".field")
        .forEach(element => {
            element.querySelector(".value").style.fontSize = '20px';
            element.style.cssText = `display: flex; 
            flex-direction: column; 
            align-items: center;`;
        })
}
class Timer {
    constructor(data = {}) {
        this.buttons = {
            start: document.querySelector(data.start) ?? false,
            stop: false
        }
        this.fields = {};
        for (const [name, value] of Object.entries(data.fields))
            this.fields[name] = document.querySelector(value) ?? false;
        this.interval = null;
        this.checked = false;
    }
    addLeadingZero(value) {
        return `${value}`.padStart(2, 0)
    }
    parse(milliseconds) {
        return {
            days: Math.floor((milliseconds / 86400000) % 365),
            hours: Math.floor((milliseconds / 3600000) % 24),
            minutes: Math.floor((milliseconds / 60000) % 60),
            seconds: Math.floor((milliseconds / 1000) % 60)
        }
    }
    check() {
        const data = Number(localStorage.getItem("data"));
        if (!data || data < Date.now()) return;
        this.checked = true;
        this.buttons.start.disabled = true;
        this.show();
        this.interval = setInterval(() => this.show(), 1000);
    }
    updateTimer(parsed) {
        for (const [name, value] of Object.entries(this.fields)) {
            value.textContent = parsed ? this.addLeadingZero(parsed[name]) : "00";
        }
    }
    show() {
        const now = Date.now();
        const data = Number(localStorage.getItem("data"));
        const parsed = this.parse(data - now);
        if (now + 1000 >= data) {
            localStorage.removeItem("data")
            clearInterval(this.interval);
        }
        this.updateTimer(now + 1000 >= data ? null : parsed);
    }
    resetTimer() {
        this.buttons.start.disabled = true;
        clearInterval(this.interval);
        localStorage.removeItem("data");
        this.updateTimer();
    }
    execute(value) {
        this.buttons.start.disabled = true;
        flatpickr(value, {
            ...{
                enableTime: true,
                time_24hr: true,
                defaultDate: Date.now(),
                minuteIncrement: 1,
                onClose: this.onClose,
                timer: this
            }
        });
        return this;
    }
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            Notify.failure('Please choose a date in the future');
            return;
        }
        const { timer } = this.config;
        if (localStorage.getItem("data")) return timer.resetTimer();
        timer.buttons.start.disabled = false;
        timer.buttons.start.addEventListener("click", click);
        function click() {
            if (timer.interval) clearInterval(timer.interval)
            const data = selectedDates[0] / 1;
            localStorage.setItem("data", data)
            timer.buttons.start.disabled = true;
            timer.show()
            timer.interval = setInterval(() => timer.show(), 1000)
        }
    }
}
styleTimer();
new Timer({
    start: "[data-start]",
    fields: {
        days: "[data-days]",
        hours: "[data-hours]",
        minutes: "[data-minutes]",
        seconds: "[data-seconds]"
    }
}).execute("#datetime-picker").check();