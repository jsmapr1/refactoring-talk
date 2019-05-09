import { fetchTopping, fetchToppings } from '../../api/toppings';
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
          callback({
            getModalStyle: () => {
              const top = 50;
              const left = 50;
              return {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'absolute',
                width: 600,
                backgroundColor: '#fff',
                boxShadow: '1px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
                padding: 32,
                outline: 'none',
                top: `${top}%`,
                left: `${left}%`,
                transform: `translate(-${top}%, -${left}%)`,
              };
            },
            image: save,
            text: 'This is looking complicated? Would you like to save?',
          });
        }
        const modified = [...toppings.reduce((all, topping) => {
          if (!all.get(topping)) {
            all.set(topping, 1);
            return all;
          }
          all.set(topping, all.get(topping) + 1);
          return all;
        }, new Map()),
        ].map(([nameUpdate, count]) => `${nameUpdate} ${count === 1 ? '' : `(${count})`}`);
        return modified;
      }
      callback({
        getModalStyle: () => {
          const top = 50;
          const left = 50;
          return {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
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
        },
        text: 'Topping Not Available',
      });
      const modified = [...toppings.reduce((all, topping) => {
        if (!all.get(topping)) {
          all.set(topping, 1);
          return all;
        }
        all.set(topping, all.get(topping) + 1);
        return all;
      }, new Map()),
      ].map(([nameUpdate, count]) => `${nameUpdate} ${count === 1 ? '' : `(${count})`}`);
      return modified;
    });
}

function removeTopping({ name }) {
  const copy = [...toppings];
  const index = copy.indexOf(name);
  copy.splice(index);
  toppings = [...copy];
  const modified = [...toppings.reduce((all, topping) => {
    if (!all.get(topping)) {
      all.set(topping, 1);
      return all;
    }
    all.set(topping, all.get(topping) + 1);
    return all;
  }, new Map()),
  ].map(([nameUpdate, count]) => `${nameUpdate} ${count === 1 ? '' : `(${count})`}`);
  return Promise.resolve(modified);
}

function getToppings() {
  return toppings;
}

function displayMarketingMessage(callback, config) {
  setTimeout(() => {
    callback(
      {
        getModalStyle: () => {
          const top = 50;
          const left = 50;
          return {
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 400,
            backgroundColor: '#fff',
            boxShadow: '1px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
            padding: 32,
            outline: 'none',
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
          };
        },
        image: ohYeah,
        text: 'Dude, you rock so F****cking hard',
      },
    );
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
  removeTopping,
  init,
});
