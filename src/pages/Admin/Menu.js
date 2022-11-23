import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  List,
  Col,
  Container,
  ListInlineItem,
  Row,
} from "reactstrap";
import Swal from "sweetalert2";
import Nouislider from "nouislider-react";
import Multiselect from "multiselect-react-dropdown";
import { fetchProducts, selectProducts } from "../../redux/productSlice";
import {
  fetchMenu,
  selectMenus,
  selectStatus,
  addMenu,
  editMenu,
  deleteMenu,
} from "../../redux/menuSlice";
import "nouislider/distribute/nouislider.css";
import axios from "axios";
import { failureMessage, successMessage } from "../../utils/utils";
const Menu = () => {
  const INITIAL_FORMDATA = {
    _id: "",
    name: "",
    timing: [8, 10],
    products: [],
  };
  const dispatch = useDispatch();
  const menus = useSelector(selectMenus);
  const status = useSelector(selectStatus);
  const products = useSelector(selectProducts);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [viewEditModal, setViewEditModal] = useState(false);
  const [viewAddModal, setViewAddModal] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORMDATA);

  const onInputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const onClickUpdateHandler = (item) => {
    setFormData(item);
    setSelectedProducts(item.products);
    setViewEditModal(true);
  };
  const onClickAddHandler = () => {
    setFormData(INITIAL_FORMDATA);
    setViewAddModal(true);
  };
  const onSelect = (selectedList, selectedItem) => {
    setSelectedProducts(selectedList.map((item) => item.name));
  };
  const onRemove = (selectedList, selectedItem) => {
    setSelectedProducts(selectedList.map((item) => item.name));
  };
  const deleteMenuHandler = (item) => {
    Swal.fire({
      title: "Do you want to delete the menu?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .post("delete-menu", { menuId: item._id })
          .then((res) => {
            if (res.status === 200) {
              dispatch(deleteMenu(item._id));
              successMessage("Deleted successfully");
            } else {
              failureMessage("Try again later :(");
            }
          })
          .catch((err) => {
            failureMessage("Try again later :(");
          });
      }
    });
  };
  const closeModal = () => {
    setSelectedProducts([]);
    setViewAddModal(false);
    setViewEditModal(false);
    setFormData(INITIAL_FORMDATA);
  };
  const onAddMenuHandler = (event) => {
    event.preventDefault();
    if (selectedProducts.length === 0) {
      window.alert("Select atleast one product");
      return;
    }
    let data = {
      name: formData.name,
      timing: formData.timing,
      products: selectedProducts,
    };
    axios.post("add-menu", { ...data }).then((res) => {
      if (res.status === 201) {
        dispatch(addMenu(res.data));
        closeModal();
        successMessage("Menu added successfully :)");
      } else {
        failureMessage("Error in adding new menu");
      }
    });
  };
  const onEditMenuHandler = (event) => {
    event.preventDefault();
    if (selectedProducts.length === 0) {
      window.alert("Select atleast one product");
      return;
    }
    let menuItem = {
      ...formData,
      products: selectedProducts,
    };
    axios.post("edit-menu", { menuItem }).then((res) => {
      if (res.status === 200) {
        dispatch(editMenu(res.data.item));
        closeModal();
        successMessage("Menu updated successfully");
      } else {
        failureMessage("Try again later :(");
      }
    });
  };
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMenu());
    }
  }, []);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, []);
  return (
    <div>
      <Container className="my-4">
        <Row className="my-4">
          <Col>
            <Button onClick={onClickAddHandler}>Add New Menu</Button>
          </Col>
        </Row>
        <Table bordered responsive>
          <thead>
            <tr>
              <th className="text-center">Name</th>
              <th className="text-center">Products</th>
              <th className="text-center">Timing</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {menus.length === 0 && <h5>No menus found</h5>}
            {menus.map((item) => {
              return (
                <tr key={item._id}>
                  <th scope="row" className="text-center">
                    {item.name}
                  </th>
                  <td className="text-center">
                    <List type="inline">
                      {item.products.map((i) => (
                        <ListInlineItem key={i}>{i}</ListInlineItem>
                      ))}
                    </List>
                  </td>
                  <td className="text-center">
                    {item.timing[0] + ":00 to " + item.timing[1] + ":00"}
                  </td>

                  <td className="text-center">
                    <Button
                      color="warning"
                      className="mx-2"
                      onClick={() => onClickUpdateHandler(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      color="danger"
                      onClick={() => deleteMenuHandler(item)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      <Modal isOpen={viewEditModal} toggle={() => closeModal()}>
        <ModalHeader toggle={() => closeModal()}>Edit Menu</ModalHeader>
        <ModalBody>
          <Form onSubmit={onEditMenuHandler}>
            <FormGroup row>
              <Label for="name" sm={2}>
                Name
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="name"
                  required
                  onChange={onInputChangeHandler}
                  value={formData.name}
                  placeholder="Enter menu name"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label>Timings</Label>
              <Col sm={10}>
                <Nouislider
                  tooltips
                  step={1}
                  range={{ min: 0, max: 24 }}
                  start={[formData.timing[0], formData.timing[1]]}
                  onChange={(values) => {
                    setFormData((prev) => ({
                      ...prev,
                      timing: values.map((i) => +i),
                    }));
                  }}
                  connect
                />
              </Col>
              <Col sm={2}>[ 24hrs ]</Col>
            </FormGroup>
            <FormGroup row>
              <Label>Products</Label>
              <Col sm={10}>
                <Multiselect
                  options={products.map((item) => ({
                    name: item._id,
                    id: item._id,
                  }))}
                  selectedValues={formData.products.map((item) => ({
                    name: item,
                    id: item,
                  }))}
                  avoidHighlightFirstOption
                  onSelect={onSelect}
                  onRemove={onRemove}
                  displayValue="name"
                />
              </Col>
            </FormGroup>
            <Button type="submit">Update Menu</Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setViewEditModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={viewAddModal} toggle={() => closeModal(false)}>
        <ModalHeader toggle={() => closeModal(false)}>Add Menu</ModalHeader>
        <ModalBody>
          <Form onSubmit={onAddMenuHandler}>
            <FormGroup row>
              <Label for="name" sm={2}>
                Name
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="name"
                  required
                  onChange={onInputChangeHandler}
                  value={formData.name}
                  placeholder="Enter menu name"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label>Timings</Label>
              <Col sm={10}>
                <Nouislider
                  tooltips
                  step={1}
                  onChange={(values) => {
                    setFormData((prev) => ({
                      ...prev,
                      timing: values.map((i) => +i),
                    }));
                  }}
                  range={{ min: 0, max: 24 }}
                  start={[formData.timing[0], formData.timing[1]]}
                  connect
                />
              </Col>
              <Col sm={2}>[ 24hrs ]</Col>
            </FormGroup>
            <FormGroup row>
              <Label>Products</Label>
              <Col sm={10}>
                <Multiselect
                  emptyRecordMsg="No products found"
                  options={products.map((item) => ({
                    name: item._id,
                    id: item._id,
                  }))}
                  selectedValues={formData.products.map((item) => ({
                    name: item,
                    id: item,
                  }))}
                  avoidHighlightFirstOption
                  onSelect={onSelect}
                  onRemove={onRemove}
                  displayValue="name"
                />
              </Col>
            </FormGroup>
            <Button type="submit">Add Menu</Button>
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

export default Menu;
