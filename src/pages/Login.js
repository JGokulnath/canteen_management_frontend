import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  Input,
  Form,
  FormGroup,
  Label,
  Alert,
  Button,
} from "reactstrap";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [isError, setError] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (name.length === 0 || pwd.length === 0) setError(true);
    else {
      setError(false);
      try {
        const response = await axios.post("login", {
          username: name,
          password: pwd,
        });
        sessionStorage.setItem("accessToken", response.data.accessToken);
        window.history.pushState(`/`, "login", `/`);
        window.location.reload();
      } catch (err) {
        console.log(err);
        window.alert(err.response?.data?.error ?? "Error in reaching server ");
      }
    }
  };
  if (sessionStorage.getItem("accessToken")) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <Card
        className="my-2"
        color="primary"
        outline
        style={{
          width: "80%",
          maxWidth: "30rem",
        }}
      >
        <CardHeader>Login</CardHeader>
        <CardBody>
          <CardText>Login using your credentials</CardText>
          {isError && <Alert color="danger">Empty fields</Alert>}
          <Form onSubmit={(e) => onSubmitHandler(e)}>
            <FormGroup>
              <Label for="Username">Username</Label>
              <Input
                id="Username"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Password">Password</Label>
              <Input
                id="Password"
                name="password"
                type="password"
                value={pwd}
                onChange={(e) => {
                  setPwd(e.target.value);
                }}
              />
            </FormGroup>
            <Button type="submit">Login</Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
