function removeTopping({ name }) {
  const copy = [...toppings];
  const index = copy.indexOf(name);
  copy.splice(index, 1);
  toppings = [...copy];
  return toppings;
}

function generateDisplayName(selected) {
  const modified = [...selected.reduce((all, topping) => {
    if (!all.get(topping)) {
      all.set(topping, 1);
      return all;
    }
    all.set(topping, all.get(topping) + 1);
    return all;
  }, new Map()),
  ]
  .map(([nameUpdate, count]) => ({
    name: nameUpdate,
    display: `${nameUpdate} ${count === 1 ? '' : `(${count})`}`
  }));
  return modified;
}
