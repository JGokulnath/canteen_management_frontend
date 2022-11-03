import React from "react";
import { Card, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectProducts } from "../redux/productSlice";
import { useShoppingCart } from "../context/ShoppingCartContext";
const CartTable = ({ cartItems }) => {
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
                <span>Quantity</span>
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
                    <span>{item.quantity}</span>
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
