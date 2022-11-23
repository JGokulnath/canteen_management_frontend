import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { successMessage, failureMessage } from "../../utils/utils";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Container,
  Row,
} from "reactstrap";
import {
  selectProducts,
  fetchProducts,
  selectStatus,
  addProduct,
  editProduct,
} from "../../redux/productSlice";
const Products = () => {
  const INITIAL_FORMDATA = {
    title: "",
    price: null,
    desc: "",
    imageUrl: "",
    quantity: null,
  };
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const products = useSelector(selectProducts);
  const [viewEditModal, setViewEditModal] = useState(false);
  const [viewAddModal, setViewAddModal] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORMDATA);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, []);
  const onInputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? +value : value,
    }));
  };
  const onClickUpdateHandler = (item) => {
    setFormData({
      title: item._id,
      price: item.price,
      desc: item.desc,
      quantity: item.quantity,
      imageUrl: item.imageUrl,
    });
    setViewEditModal(true);
  };
  const updateProductHandler = (e) => {
    e.preventDefault();
    axios.post("edit-product", { ...formData }).then((res) => {
      if (res.status === 200) {
        setViewEditModal(false);
        setFormData(INITIAL_FORMDATA);
        if (res.data._id) {
          dispatch(editProduct({ ...res.data }));
          successMessage("Product details updated successfully");
        }
      } else {
        failureMessage("Error in updating product");
      }
    });
  };
  const addProductHandler = (e) => {
    e.preventDefault();
    axios
      .post("add-product", { ...formData })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          successMessage("Product added successfully !");
          setViewAddModal(false);
          dispatch(
            addProduct({
              _id: formData.title,
              price: formData.price,
              desc: formData.desc,
              imageURL: formData.imageUrl,
              quantity: formData.quantity,
            })
          );
          setFormData(INITIAL_FORMDATA);
        } else {
          failureMessage("Try again later :(");
        }
      })
      .catch((err) => {
        failureMessage("Error in adding new product");
      });
  };
  const onClickAddHandler = () => {
    setFormData(INITIAL_FORMDATA);
    setViewAddModal(true);
  };
  return (
    <div>
      <Container className="my-4">
        <Row className="my-4">
          <Col>
            <Button onClick={onClickAddHandler}>Add New Product</Button>
          </Col>
        </Row>
        <Table bordered responsive>
          <thead>
            <tr>
              <th className="text-center">Name</th>
              <th className="text-center">Price</th>
              <th className="text-center">Description</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              return (
                <tr key={item._id}>
                  <th scope="row" className="text-center">
                    {item._id}
                  </th>
                  <td className="text-center">{item.price}</td>
                  <td className="text-center">{item.desc}</td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-center">
                    <Button onClick={() => onClickUpdateHandler(item)}>
                      Edit
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      <Modal isOpen={viewEditModal} toggle={() => setViewEditModal(false)}>
        <ModalHeader toggle={() => setViewEditModal(false)}>
          Edit Product
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={updateProductHandler}>
            <FormGroup row>
              <Label for="name" sm={2}>
                Name
              </Label>
              <Col sm={10}>
                <Input
                  disabled
                  type="text"
                  name="title"
                  required
                  onChange={onInputChangeHandler}
                  value={formData.title}
                  placeholder="Enter product name"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="price" sm={2}>
                Price
              </Label>
              <Col sm={10}>
                <Input
                  type="number"
                  name="price"
                  min={0}
                  required
                  onChange={onInputChangeHandler}
                  value={formData.price}
                  placeholder="Enter price"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="quantity" sm={2}>
                Quantity
              </Label>
              <Col sm={10}>
                <Input
                  type="number"
                  name="quantity"
                  required
                  min={0}
                  onChange={onInputChangeHandler}
                  value={formData.quantity}
                  placeholder="Enter quantity"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="desc" sm={2}>
                Description
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="desc"
                  value={formData.desc}
                  required
                  onChange={onInputChangeHandler}
                  placeholder="Enter product description"
                />
              </Col>
            </FormGroup>
            <Button type="submit">Update Product</Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setViewEditModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={viewAddModal} toggle={() => setViewAddModal(false)}>
        <ModalHeader toggle={() => setViewAddModal(false)}>
          Add Product
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={addProductHandler}>
            <FormGroup row>
              <Label for="name" sm={2}>
                Name
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="title"
                  required
                  onChange={onInputChangeHandler}
                  value={formData.title}
                  placeholder="Enter product name"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="price" sm={2}>
                Price
              </Label>
              <Col sm={10}>
                <Input
                  type="number"
                  name="price"
                  min={0}
                  required
                  onChange={onInputChangeHandler}
                  value={formData.price}
                  placeholder="Enter price"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="quantity" sm={2}>
                Quantity
              </Label>
              <Col sm={10}>
                <Input
                  type="number"
                  name="quantity"
                  required
                  min={0}
                  onChange={onInputChangeHandler}
                  value={formData.quantity}
                  placeholder="Enter quantity"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="desc" sm={2}>
                Description
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="desc"
                  value={formData.desc}
                  required
                  onChange={onInputChangeHandler}
                  placeholder="Enter product description"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="imageUrl" sm={2}>
                Image URL
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="imageUrl"
                  required
                  onChange={onInputChangeHandler}
                  value={formData.imageUrl}
                  placeholder="Enter Image Url"
                />
              </Col>
            </FormGroup>
            <Button type="submit">Add Product</Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setViewAddModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Products;
