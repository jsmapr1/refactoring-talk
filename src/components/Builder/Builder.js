import ohYeah from './images/ohyeah.gif'
let toppings = [];

function addTopping(topping) {
  toppings = [...toppings, topping]
  return Promise.resolve(toppings);
}

function removeTopping(index) {
  const copy = [...toppings]
  copy.splice(index);
  toppings = [...copy];
  return Promise.resolve(toppings);
}

function getToppings() {
  return toppings;
}



function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    position: 'absolute',
    width: 400,
    backgroundColor: '#fff',
    boxShadow: '1px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
    padding: 32,
    outline: 'none',
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function displayMarketingMessage(callback, config) {
  setTimeout(() => {
    callback(
      {
        getModalStyle,
        image: ohYeah,
        text: 'Dude, you rock so F****cking hard'
      }
    )
  }, config.time)
}

export async function init() {
  return fetch('http://localhost:3009/toppings')
    .then(response => response.json())
    .then(options => {
      const initial = options.reduce((sorted, option) => {
        const { type } = option;
        if (sorted.has(type)) {
          sorted.set(type, [...sorted.get(type), option]);
          return sorted;
        }
        sorted.set(type, [option]);
        return sorted;
      }, new Map());
      return [...initial];
    })
}

export default () => ({
  addTopping,
  displayMarketingMessage,
  removeTopping,
  init,
});
