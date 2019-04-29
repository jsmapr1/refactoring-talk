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
  removeTopping,
  init,
});
