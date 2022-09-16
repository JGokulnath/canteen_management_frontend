import React, { useState } from "react";
import { Card, CardTitle, CardText, Button, ButtonGroup } from "reactstrap";
import { selectCart, increaseQuantity } from "../redux/productSlice";
const Product = ({ title, price, desc, add, remove, increase, decrease }) => {
  //const cartItems = useSelector(selectCart);
  const [quantity, setQuantity] = useState(0);
  //const isAdded = cartItems.find((item) => item._id === title) && true;
  const addQuantityHandler = () => {
    setQuantity((prev) => {
      if (prev === 0) add(title);
      else increase(title);
      return prev + 1;
    });
    //if (cartItems.includes(title)) remove(title);
    //else add(title);
  };
  const removeQuantityHandler = () => {
    setQuantity((prev) => {
      if (prev === 1) remove(title);
      else decrease(title);
      return prev - 1;
    });
  };
  return (
    <Card
      body
      className="my-2"
      style={{
        width: "18rem",
      }}
    >
      <CardTitle tag="h5">{title}</CardTitle>
      <CardTitle tag="h2">${price}</CardTitle>
      <CardText>{desc}</CardText>
      {quantity > 0 ? (
        <ButtonGroup>
          <Button onClick={addQuantityHandler}>+</Button>
          <span>{quantity}</span>
          <Button onClick={removeQuantityHandler}>-</Button>
        </ButtonGroup>
      ) : (
        <Button color="primary" onClick={addQuantityHandler}>
          Add to cart
        </Button>
      )}
    </Card>
  );
};

export default Product;
