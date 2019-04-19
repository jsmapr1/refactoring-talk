import React, { useState } from 'react';
import Options from '../Options/Options';
import Choices from '../Choices/Choices';
import Builder from '../Builder/Builder';

export default function PizzaMaker() {
  const { changeVar, init, x } = Builder();

  const [toppings, addToppings] = useState([])

  function handleAdd(topping) {
    changeVar();

    return(addToppings(current => [...current, topping]));
  }

  return(
    <>
      <Options onClick={handleAdd} options={init()}/>
      <Choices toppings={toppings}/>
    </>
  )
}
