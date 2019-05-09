import React from 'react';
import { getByText as getByTextDOM } from 'dom-testing-library'
import {render, fireEvent, cleanup, waitForElement} from 'react-testing-library';
import PizzaMaker from './PizzaMaker';

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

afterEach(cleanup)

describe('PizzaMaker', () => {
  it('should render options column and order column', () => {
    const { getByText } = render(
      <PizzaMaker />,
    )
    const options = getByText('Options')
    expect(options).toBeTruthy();
    const order = getByText('Your Custom Order')
    expect(order).toBeTruthy();
  })

  it('should add item to Custom Order Column', async () => {
    const { getByText, getByTestId } = render(
      <PizzaMaker />,
    )
    const order = getByTestId('order');
    const onion = await waitForElement(() => getByText('onion'));
    fireEvent.click(onion);
    const onionOrder = await waitForElement(() => getByTextDOM(order, 'onion'));
    expect(onionOrder).toBeTruthy();
    fireEvent.click(onion);
    const onionOrder2 = await waitForElement(() => getByTextDOM(order, 'onion'));
    expect(onionOrder2).toBeTruthy();
  })
})
