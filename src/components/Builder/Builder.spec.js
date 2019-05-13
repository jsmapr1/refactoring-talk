import Builder from './Builder';

const onion = {
  id: 1,
  name: 'onion',
  type: 'vegetables',
};

const greenPeppers = {
  id: 2,
  name: 'green peppers',
  type: 'vegetables',
};

const mozzarella = {
  id: 3,
  name: 'mozzarella',
  type: 'cheese',
};

const mockOptions = [onion, greenPeppers, mozzarella];

jest.mock('../../api/toppings', () => {
  return {
    fetchToppings: () => Promise.resolve(mockOptions),
    fetchTopping: (id) => Promise.resolve({ available: id !== 2 })
  }
});

const {
  addTopping,
  init,
  removeTopping,
} = Builder();

describe('init', () => {
  it('should sort options by type and create array of pairs', async () => {
    const results = await init();

    const expected = [
      ['vegetables', [onion, greenPeppers]],
      ['cheese', [mozzarella]],
    ];

    expect(results).toEqual(expected);
  });
});

describe('remove topping', () => {
  it('should remove toppings', async () => {
    const results = await init();
    const modified = await removeTopping('mozzarella');
    expect(modified).toEqual([]);
  });

  it('should remove already added topping', async () => {
    const moz = { 
      id: 3,
      name: 'mozzarella',
    }
    const results = await init();
    await addTopping(()=>{}, moz);
    await addTopping(()=>{}, moz);
    const current = await addTopping(()=>{}, moz);
    expect(current).toEqual([{
      name: 'mozzarella',
      display: 'mozzarella (3)'
    }]);
    const modified = await removeTopping(moz);
    expect(modified).toEqual([{
      name: 'mozzarella',
      display: 'mozzarella (2)'
    }]);
  });
});
