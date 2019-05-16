import { generateDisplayName } from './utils';
describe('generate names', () => {
  it('should generate names', async () => {
    const toppings = [
      'mozzarella',
      'mozzarella',
    ];
    const names = generateDisplayName(toppings);
    expect(names).toEqual([{
      name: 'mozzarella',
      display: 'mozzarella (2)',
    }]);
  });
});

