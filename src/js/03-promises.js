import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector(".form");
function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res(`✅ Fulfilled promise ${position} in ${delay}ms`)
      } else {
        rej(`❌ Rejected promise ${position} in ${delay}ms`)
      }
    }, delay)
  })
}
async function event(e) {
  e.preventDefault();
  const data = {};
  for (const [name, value] of Object.entries(e.currentTarget.elements))
    data[name] = +value.value;
  for (let i = 0; i < data.amount; i++) {
    createPromise(i, data.delay).then(Notify.success).catch(Notify.failure);
    data.delay += data.step;
  }
  e.currentTarget.reset();
}
form.addEventListener("submit", event);