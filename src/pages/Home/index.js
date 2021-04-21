import React, { useState } from "react";

import { Button } from "antd";

import Card from "../../components/Card";

import "./style.scss";

const HomePage = () => {
  const Data = Array.from(Array(10).keys()).map((item) => ({
    id: item,
    value: `item ${item + 1}`,
  }));

  const [cardData, setCardData] = useState([...Data]);

  const onChange = (index, data) => {
    setCardData((prev) => {
      prev[index].value = data;
      return [...prev];
    });
  };

  const onClick = (index) => {
    console.log("**** click");
    if (index > 0) {
      setCardData((prev) => {
        return [
          ...prev.slice(0, index - 1),
          prev[index],
          prev[index - 1],
          ...prev.slice(index + 1),
        ];
      });
    }
  };

  const onRightClick = (e, index) => {
    e.preventDefault();
    console.log("**** right click");
    setCardData((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };

  const onDblclick = (index) => {
    console.log("**** double click");
    if (index < cardData.length - 1) {
      setCardData((prev) => {
        return [
          ...prev.slice(0, index),
          prev[index + 1],
          prev[index],
          ...prev.slice(index + 2),
        ];
      });
    }
  };

  const onReset = () => {
    setCardData([...Data]);
  };

  return (
    <div className="home-page">
      {cardData.map((item, index) => (
        <Card
          key={item.id}
          value={item.value}
          onChange={(data) => onChange(index, data)}
          onClick={() => onClick(index)}
          onDblclick={() => onDblclick(index)}
          onContextMenu={(e) => onRightClick(e, index)}
        />
      ))}
      <Button onClick={onReset}>Reset</Button>
    </div>
  );
};

export default HomePage;
