function removeTopping({ name }) {
  const index = toppings.indexOf(name);
  toppings.splice(index, 1);
  const modified = [...toppings.reduce((all, topping) => {
    // Other Stuff
  }, new Map()),
  ]
  return Promise.resolve(modified);
}

