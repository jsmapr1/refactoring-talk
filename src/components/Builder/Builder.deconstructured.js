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
        return generateDisplayName(toppings);
      }
      const modalConfig = generateModalConfig({
        text: 'Topping Not Available',
      })
      callback(modalConfig);
      return generateDisplayName(toppings);
    });
}
