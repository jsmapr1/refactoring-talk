import { fetchTopping, fetchToppings } from '../../api/toppings';
import { generateDisplayName, generateModalConfig } from  './utils'

import ohYeah from './images/ohyeah.gif';
import save from './images/tobias.gif';

let toppings = [];
let askedSaved = false;

function addTopping(callback, { name, id }) {
  return fetchTopping(id)
    .then(({ available }) => {
      if (available) {
        toppings = [...toppings, name];
        if (toppings.length > 3 && !askedSaved) {
          askedSaved = true;
          const modalConfig = generateModalConfig({
            image: save,
            text: 'This is looking complicated? Would you like to save?',
            width: 600,
          })
          callback(modalConfig);
        }
      } else {
        const modalConfig = generateModalConfig({
          text: 'Topping Not Available',
        })
        callback(modalConfig);
      }
      return generateDisplayName(toppings);
    });
}

function removeTopping({ name }) {
  const index = toppings.indexOf(name);
  toppings = [...toppings].splice(index, 1);
  return toppings;
}

function getToppings() {
  return toppings;
}

function displayMarketingMessage(callback, config) {
  const text = 'Dude, you rock so hard';
  const modalConfig = generateModalConfig({
    image: ohYeah,
    text,
  });
  setTimeout(() => {
    callback(modalConfig);
  }, config.time);
}

export async function init() {
  return fetchToppings()
    .then((options) => {
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
    });
}

export default () => ({
  addTopping,
  displayMarketingMessage,
  getToppings,
  removeTopping,
  init,
});
