import React, { useEffect, useState } from 'react';
import Options from '../Options/Options';
import Choices from '../Choices/Choices';
import Builder from '../Builder/Builder';
import Modal from '../Modal/Modal';

export default function PizzaMaker() {
  const [marketingMessage, setMarketingMessage] = useState(null);
  const [options, setOptions] = useState([]);
  const [toppings, setToppings] = useState([]);
  const { addTopping, displayMarketingMessage, removeTopping, init } = Builder();

  useEffect(() => {
    displayMarketingMessage(setMarketingMessage, { time: 1000})
  }, [])

  useEffect(() => {
    const fetch = async() => {
      const options = await init();
      setOptions(options)
    }
    fetch()
  }, [])

  const update = (topping) => {
    addTopping(topping)
    .then(toppings => setToppings(toppings))
  }

  const handleRemove = (index) => {
    removeTopping(index)
    .then(toppings => setToppings(toppings))
  }

  return (
    <>
      <Modal
        open={marketingMessage}
        marketingMessage={marketingMessage} 
        onClose={() => setMarketingMessage(null)}
      />
      <Options onClick={update} options={options} />
      <Choices toppings={toppings} onRemove={handleRemove}/>
    </>
  );
}
