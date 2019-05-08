import Builder from './Builder';

const {
  init,
} = Builder();

describe('init', () => {
  it('should sort options by type and create array of pairs', async () => {
    const results = await init();

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

    const crust = {
      id: 4,
      name: 'thin',
      type: 'crust',
    };

    const dodo = {
      id: 5,
      name: 'Dodo egg',
      type: 'rare',
    };

    const expected = [
      ['vegetables', [onion, greenPeppers]],
      ['cheese', [mozzarella]],
      ['crust', [crust]],
      ['rare', [dodo]],
    ];

    expect(results).toEqual(expected);
  });
});
