import React, { useEffect, useState } from 'react';
import Options from '../Options/Options';
import Choices from '../Choices/Choices';
import Builder from '../Builder/Builder';
import { generateDisplayName } from '../Builder/utils';
import Modal from '../Modal/Modal';

export default function PizzaMaker() {
  const [marketingMessage, setMarketingMessage] = useState(null);
  const [options, setOptions] = useState([]);
  const [toppings, setToppings] = useState([]);
  const {
    addTopping,
    checkAvailability,
    checkToppingLimit,
    displayMarketingMessage,
    getToppings,
    getUnavailableMessage,
    removeTopping,
    init,
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

  const update = async (topping) => {
    const isAvailable = await checkAvailability(topping.id);
    if(!isAvailable) {
      setMarketingMessage(getUnavailableMessage());
      return;
    } 

    const toppings = addTopping(topping.name);
    const marketingMessage = checkToppingLimit(toppings)
    if(marketingMessage) {
      setMarketingMessage(marketingMessage);
    }
    const toppingsUpdate = generateDisplayName(toppings);
    setToppings(toppingsUpdate);
  };

  const handleRemove = (topping) => {
    const toppingsList = removeTopping(topping);
    const toppingsUpdate = generateDisplayName(toppingsList);
    setToppings(toppingsUpdate);
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
