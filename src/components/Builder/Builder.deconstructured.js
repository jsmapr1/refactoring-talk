import { getTopping, getToppings } from '../../api/toppings';

function addTopping(callback, { name, id }) {
  return getTopping(id)
    .then(({ available }) => {
      // 70 Lines of code 😱
    });
}

async function init() {
  return getToppings()
    .then((options) => {
      // 10 lines of code
    });
}
