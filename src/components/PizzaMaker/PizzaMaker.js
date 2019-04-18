import React, { useState } from 'react';
import Options from '../Options/Options';
import Choices from '../Choices/Choices';

export default function PizzaMaker() {
  const [toppings, addToppings] = useState([])

  function handleAdd(topping) {
    return(addToppings(current => [...current, topping]));
  }

  return(
    <>
      <Options onClick={handleAdd}/>
      <Choices toppings={toppings}/>
    </>
  )
}
