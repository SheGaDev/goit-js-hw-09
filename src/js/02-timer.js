// ----   Вибачте за такий код, щось погратись захотілось..

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
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
        if (!localStorage.getItem('data')) return;
        this.checked = true;
        this.show();
        this.interval = setInterval(() => this.show(), 1000);
    }
    show() {
        const now = Date.now();
        const data = localStorage.getItem("data")
        const parsed = this.parse(data - now);
        for (const [name, value] of Object.entries(this.fields))
            value.textContent = name !== "days" ?
                this.addLeadingZero(parsed[name]) : parsed[name];
        if (now + 1000 >= +data) {
            console.log(now, data)
            localStorage.removeItem("data")
            clearInterval(this.interval);
        }
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
        timer.buttons.start.disabled = false;
        timer.buttons.start.addEventListener("click", click);
        function click() {
            if (timer.interval) clearInterval(timer.interval)
            const data = selectedDates[0] / 1;
            localStorage.setItem("data", data)
            timer.show()
            timer.interval = setInterval(() => timer.show(), 1000)
        }
    }
}
new Timer({
    start: "[data-start]",
    fields: {
        days: "[data-days]",
        hours: "[data-hours]",
        minutes: "[data-minutes]",
        seconds: "[data-seconds]"
    }
}).execute("#datetime-picker").check();