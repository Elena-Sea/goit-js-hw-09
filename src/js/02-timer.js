import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const startTimerBtn = document.querySelector('button[data-start]');
const userDateInput = document.querySelector('input#datetime-picker');
const countDays = document.querySelector('span[data-days]');
const countHours = document.querySelector('span[data-hours]');
const countMinutes = document.querySelector('span[data-minutes]');
const countSeconds = document.querySelector('span[data-seconds]');

let userSelectedDate = null;
let currentTime;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onSelectedDate(selectedDates[0]);
  },
};

flatpickr(userDateInput, options);

startTimerBtn.disabled = true;

startTimerBtn.addEventListener('click', onRunTimer);

function onSelectedDate(selectedDate) {
    startTimerBtn.disabled = true;
    userSelectedDate = selectedDate.getTime();
    currentTime = Date.now();

    if (currentTime < userSelectedDate) {
        startTimerBtn.disabled = false;
    } else { 
        Notify.failure('Select time in the future');
    }
}

function runTimer() { 
    currentTime = Date.now();
    if (currentTime >= userSelectedDate) { 
        clearInterval(timerId);
        return;
    }
    const deltaTime = userSelectedDate - currentTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    console.log(`${days} : ${hours} : ${minutes} : ${seconds}`);
    updateTimer(convertMs(deltaTime));
}

function onRunTimer() { 
    startTimerBtn.disabled = true;
    timerId = setInterval(runTimer, 1000);
}

function updateTimer({ days, hours, minutes, seconds }) { 
    countDays.textContent = days;
    countHours.textContent = hours;
    countMinutes.textContent = minutes;
    countSeconds.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}