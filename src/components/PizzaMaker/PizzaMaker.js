import React, { useEffect, useState } from 'react';
import Options from '../Options/Options';
import Choices from '../Choices/Choices';
import Builder from '../Builder/Builder';
import Modal from '../Modal/Modal';

export default function PizzaMaker() {
  const [marketingMessage, setMarketingMessage] = useState(null);
  const [options, setOptions] = useState([]);
  const [toppings, setToppings] = useState([]);
  const {
    addTopping, displayMarketingMessage, removeTopping, init,
  } = Builder();

  useEffect(() => {
    displayMarketingMessage(setMarketingMessage, { time: 1000 });
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const fetchedOptions = await init();
      setOptions(fetchedOptions);
    };
    fetch();
  }, []);

  const update = (topping) => {
    addTopping(setMarketingMessage, topping)
      .then(toppingsUpdate => setToppings(toppingsUpdate));
  };

  const handleRemove = (topping) => {
    removeTopping(topping)
      .then(toppingsUpdate => setToppings(toppingsUpdate));
  };

  return (
    <>
      <Modal
        open={!!marketingMessage}
        marketingMessage={marketingMessage}
        onClose={() => setMarketingMessage(null)}
      />
      <Options onClick={update} options={options} />
      <Choices toppings={toppings} onRemove={handleRemove} />
    </>
  );
}
