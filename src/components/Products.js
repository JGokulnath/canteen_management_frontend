import React, { useEffect } from "react";
import { Container, Row, Col, Spinner } from "reactstrap";
import {
  fetchProducts,
  selectStatus,
  selectProducts,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/productSlice";
import { useSelector, useDispatch } from "react-redux";
import Product from "./Product";
const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const status = useSelector(selectStatus);
  const addToCartHandler = (id) => {
    dispatch(addToCart(id));
  };
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const increaseQuantityHandler = (id) => {
    dispatch(increaseQuantity(id));
  };
  const decreaseQuantityHandler = (id) => {
    dispatch(decreaseQuantity(id));
  };
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, []);
  if (status === "loading") return <Spinner color="primary" type="grow" />;
  return (
    <Container className="my-4">
      <Row md="4" sm="2" xs="1">
        {products.length > 0 ? (
          products.map((item) => (
            <Col className=" m-2 " key={item._id}>
              <Product
                title={item._id}
                price={item.price}
                desc={item.desc}
                add={addToCartHandler}
                remove={removeFromCartHandler}
                increase={increaseQuantityHandler}
                decrease={decreaseQuantityHandler}
              />
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
