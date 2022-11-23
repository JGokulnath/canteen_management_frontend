import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "reactstrap";
import {
  fetchProducts,
  selectStatus,
  selectProducts,
} from "../redux/productSlice";
import { useSelector, useDispatch } from "react-redux";
import Product from "./Product";
const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const status = useSelector(selectStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, []);
  if (status === "loading") return <Spinner color="primary" type="grow" />;
  return (
    <Container className="my-4">
      <Row>
        {products.length > 0 ? (
          products.map((item) => (
            <Col sm="12" md="3" className="m-2 " key={item._id}>
              <Product title={item._id} price={item.price} desc={item.desc} />
            </Col>
          ))
        ) : (
          <h2>No Products found</h2>
        )}
      </Row>
    </Container>
  );
};

export default Products;
