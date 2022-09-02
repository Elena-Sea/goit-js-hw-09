const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
const TIMER_PERIOD = 1000;
let timerId = null;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() { 
    startBtn.disabled = true;
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, TIMER_PERIOD);
}

function onStopBtnClick() { 
    startBtn.disabled = false;
    clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
