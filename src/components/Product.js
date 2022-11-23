import React from "react";
import { Card, CardTitle, CardText, Button, ButtonGroup } from "reactstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
const Product = ({ title, price, desc }) => {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } =
    useShoppingCart();
  const quantity = getItemQuantity(title);
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
        <div className="d-flex justify-content-between">
          <Button
            size="xs"
            className="px-4"
            onClick={() => decreaseCartQuantity(title)}
          >
            -
          </Button>
          <div>
            <span>{quantity}</span>
          </div>
          <Button
            size="xs"
            className="px-4"
            onClick={() => increaseCartQuantity(title)}
          >
            +
          </Button>
        </div>
      ) : (
        <Button color="primary" onClick={() => increaseCartQuantity(title)}>
          Add to cart
        </Button>
      )}
    </Card>
  );
};

export default Product;
