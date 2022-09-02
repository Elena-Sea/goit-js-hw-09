import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const form = document.querySelector('form');
form.addEventListener('submit', getPromiseResult);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  });
}

function getPromiseResult(e) { 
  e.preventDefault();
  let promiseFirstDelay = Number(e.currentTarget.delay.value);
  const promiseDelayStep = Number(e.currentTarget.step.value);
  const promiseAmount = Number(e.currentTarget.amount.value);

  for (let i = 0; i < promiseAmount; i += 1) { 
    if (i > 0) {
      promiseFirstDelay += promiseDelayStep;
    }

  createPromise(i + 1, promiseFirstDelay)
  .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
  .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }   
}
