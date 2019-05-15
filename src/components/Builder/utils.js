export function generateDisplayName(selected) {
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
      display: `${nameUpdate} ${count === 1 ? '' : `(${count})`}`,
    }));
  return modified;
}

