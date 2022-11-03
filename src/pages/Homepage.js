import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectProducts } from "../redux/productSlice";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
  CardTitle,
  Card,
  CardBody,
  Button,
} from "reactstrap";
import Products from "../components/Products";
import CartTable from "../components/CartTable";
import { useShoppingCart } from "../context/ShoppingCartContext";
import axios from "axios";
const Homepage = () => {
  const [orderStatus, setOrderStatus] = useState(false);
  const { getTotal, getCart, clearCart } = useShoppingCart();
  const products = useSelector(selectProducts);
  const cartFromContext = getCart();
  const cartItems = [];
  cartFromContext.forEach((item) => {
    const product = products.find((i) => i._id === item.id);
    cartItems.push({ ...product, quantity: item.quantity });
  });

  const totalAmount = getTotal();
  const [cart, showCart] = useState(false);
  const handleTabView = (idx) => {
    if (+idx === 1) showCart(false);
    else showCart(true);
  };
  const placeOrder = async () => {
    setOrderStatus(true);
    try {
      const response = await axios.post("place-order", {
        username: "Roopan",
        products: [...cartItems],
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    //handleTabView(1);
    //clearCart();
  };
  return (
    <div>
      <Nav tabs horizontal="center">
        <NavItem>
          <NavLink
            className={cart ? "" : "active"}
            onClick={() => handleTabView(1)}
          >
            Items
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={cart ? "active" : ""}
            onClick={() => handleTabView(2)}
          >
            Cart
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={cart ? "2" : "1"}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <Products />
            </Col>
          </Row>
          <Button
            size="lg"
            style={{ position: "fixed", right: "2rem" }}
            color="warning"
            onClick={() => handleTabView(0)}
          >
            Go To Cart
          </Button>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="8">
              <CartTable cartItems={cartItems} />
            </Col>
            <Col>
              <Card>
                <CardTitle tag="h5">Price Details</CardTitle>
                <CardBody className="d-flex flex-column jusify-con">
                  <h3>Total Amount : {totalAmount}</h3>
                </CardBody>
                <Button style={{ width: "90%" }}>Place Order</Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Homepage;
