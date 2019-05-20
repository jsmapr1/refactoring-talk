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

jest.mock('../../api/toppings', () => ({
  fetchToppings: () => Promise.resolve(mockOptions),
  fetchTopping: id => Promise.resolve({ available: id !== 2 }),
}));

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
    const moz = {
      id: 3,
      name: 'mozzarella',
    };
    await init();
    addTopping('mozzarella');
    addTopping('mozzarella');
    const modified = removeTopping('mozzarella');
    expect(modified).toEqual(['mozzarella']);
  });
});
