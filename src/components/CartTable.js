import React from "react";
import { Card, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectCart, removeFromCart } from "../redux/productSlice";
const CartTable = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCart);
  return (
    <div>
      <Card>
        <table>
          <thead>
            <tr>
              <th>
                <span>Item</span>
              </th>
              <th>
                <span>Price</span>
              </th>
              <th>
                <span>Description</span>
              </th>
              <th>
                <span>Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => {
              return (
                <tr key={item._id}>
                  <th>
                    <span>{item._id}</span>
                  </th>
                  <th>
                    <span>{item.price}</span>
                  </th>
                  <th>
                    <span>{item.desc}</span>
                  </th>
                  <th>
                    <Button
                      color="warning"
                      onClick={() => dispatch(removeFromCart(item._id))}
                    >
                      Remove
                    </Button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default CartTable;
