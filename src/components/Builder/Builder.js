import { fetchTopping, fetchToppings } from '../../api/toppings';
import { generateDisplayName, generateModalConfig } from  './utils'

import ohYeah from './images/ohyeah.gif';
import save from './images/tobias.gif';

let toppings = [];
let askedSaved = false;

const thresholdAlert = (...limits) => {
  let asked = false;
  return (arg) => {
    if(asked) {
      return false;
    }
    const reached = limits.every(limit => limit(arg));
    if(!reached) {
      return false;
    }
    asked = true;
    return true;
  }
}

const sendLengthAlert = thresholdAlert(({ toppings}) => toppings.length > 3);

function checkAvailability(id) {
  return fetchTopping(id)
  .then(({ available }) => available)
}

function getUnavailableMessage() {
  return generateModalConfig({
    text: 'Topping Not Available',
  })
}

function addTopping(name) {
    toppings = [...toppings, name];
    return toppings;
}

function checkToppingLimit(toppings) {
  if(sendLengthAlert({ toppings })) {
    return generateModalConfig({
      image: save,
      text: 'This is looking complicated? Would you like to save?',
      width: 600,
    })
  }
  return null;
}

function removeTopping({ name }) {
  const index = toppings.indexOf(name);
  const update = [...toppings];
  update.splice(index, 1);
  toppings = update
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
  checkAvailability,
  checkToppingLimit,
  displayMarketingMessage,
  getToppings,
  getUnavailableMessage,
  removeTopping,
  init,
});
