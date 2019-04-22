function getAvailableOptions() {
  // Get options from API
}

function validateOption(topping) {
  // Maybe there's a super expensive topping
  // Like a single DoDo egg and you don't want
  // it to be bad.
}

let x = '';
function changeVar() {
  x = 'hi';
}

const options = [
  {
    name: 'onion',
    type: 'vegetables',
  },
  {
    name: 'green peppers',
    type: 'vegetables',
  },
  {
    name: 'mozarella',
    type: 'cheese',
  },
  {
    name: 'thin',
    type: 'crust',
  },
];

export function init() {
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
}

export default () => ({
  changeVar,
  init,
  x,
});

// Other ideas. Make 'designs' and then call things bugs.
// Have a pop up after the third thing or something like that.
