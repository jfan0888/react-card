import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Card, Input, Button } from "antd";
import useDoubleClick from "use-double-click";

import "./style.scss";

const CustomCard = ({ value, onChange, onClick, onDblclick, ...rest }) => {
  const [edit, setEdit] = useState(false);
  const [cardName, setCardName] = useState(value);

  const cardRef = useRef();
  const saveRef = useRef();
  const cancelRef = useRef();
  const inputRef = useRef();

  const onSave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setEdit(false);
    onChange(cardName);
  };

  const onEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (edit) {
      setCardName(value);
    }
    setEdit(!edit);
  };

  useEffect(() => {
    if (value !== cardName) {
      setCardName(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useDoubleClick({
    onSingleClick: (e) => {
      if (!edit) {
        onClick();
      }
    },
    onDoubleClick: (e) => {
      if (!edit) {
        onDblclick();
      }
    },
    ref: cardRef,
    latency: 250,
  });

  return (
    <Card className="custom-card" style={{ width: 500 }} {...rest}>
      <div ref={cardRef} className="custom-card-wrapper">
        {edit ? (
          <>
            <Input
              className="custom-card-input"
              ref={inputRef}
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            />
            <Button ref={saveRef} onClick={onSave}>
              Save
            </Button>
          </>
        ) : (
          <h6 className="custom-card-name">{cardName}</h6>
        )}
      </div>
      <Button ref={cancelRef} onClick={onEdit}>
        {edit ? "Cancel" : "Edit"}
      </Button>
    </Card>
  );
};

CustomCard.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onDblclick: PropTypes.func,
};

CustomCard.defaultProps = {
  value: "",
  onChange: () => {},
  onClick: () => {},
  onDblclick: () => {},
};

export default CustomCard;
