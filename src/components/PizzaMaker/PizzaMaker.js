import React, { useState } from 'react';
import Options from '../Options/Options';
import Choices from '../Choices/Choices';
import Builder from '../Builder/Builder';

export default function PizzaMaker() {
  const [toppings, setToppings] = useState([]);
  const { addTopping, init } = Builder();

  const update = (topping) => {
    addTopping(topping)
    .then(toppings => setToppings(toppings))
  }
  return (
    <>
      <Options onClick={update} options={init()} />
      <Choices toppings={toppings} />
    </>
  );
}
