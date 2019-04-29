import React, { useEffect, useState } from 'react';
import Options from '../Options/Options';
import Choices from '../Choices/Choices';
import Builder from '../Builder/Builder';

export default function PizzaMaker() {
  const [options, setOptions] = useState([]);
  const [toppings, setToppings] = useState([]);
  const { addTopping, init } = Builder();

  useEffect(() => {
    const fetch = async() => {
      const options = await init();
      console.log(options)
      setOptions(options)
    }
    fetch()
  }, [])

  const update = (topping) => {
    addTopping(topping)
    .then(toppings => setToppings(toppings))
  }

  return (
    <>
      <Options onClick={update} options={options} />
      <Choices toppings={toppings} />
    </>
  );
}
