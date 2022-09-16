import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCart } from "../redux/productSlice";
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
} from "reactstrap";
import Products from "../components/Products";
import CartTable from "../components/CartTable";
const Homepage = () => {
  const cartItems = useSelector(selectCart);
  const totalAmount =
    cartItems.length > 0
      ? cartItems.reduce((total, curr) => (total = total + +curr?.price), 0)
      : 0;
  const [cart, showCart] = useState(false);
  const handleTabView = (idx) => {
    if (+idx === 1) showCart(false);
    else showCart(true);
  };
  return (
    <div>
      <Nav tabs>
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
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="8">
              <CartTable cartItems={cartItems} />
            </Col>
            <Col>
              <Card>
                <CardTitle tag="h5">Price Details</CardTitle>
                <CardBody>
                  <h3>Total Amount : {totalAmount}</h3>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
      <button style={{ position: "fixed", right: "2rem" }}>
        Sticky button
      </button>
    </div>
  );
};

export default Homepage;
