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
  CardFooter,
} from "reactstrap";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [errors, setErrors] = useState({});
  const [isError, setError] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [cnfrmPwd, setCnfrmPwd] = useState("");
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
  const onRegisterHandler = (e) => {
    e.preventDefault();
    if (name.length === 0 || pwd.length === 0 || pwd !== cnfrmPwd)
      setError(true);
    else {
      setError(false);
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
          {isSignIn ? (
            <React.Fragment>
              <CardText>Login using your credentials</CardText>
              <Form onSubmit={onSubmitHandler}>
                <FormGroup>
                  <Label for="Username">Email</Label>
                  <Input
                    id="Username"
                    name="name"
                    type="text"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="Username">Email</Label>
                  <Input
                    id="Username"
                    name="name"
                    type="text"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="Password">Password</Label>
                  <Input
                    id="Password"
                    name="password"
                    type="password"
                    required
                    value={pwd}
                    onChange={(e) => {
                      setPwd(e.target.value);
                    }}
                  />
                </FormGroup>
                <Button type="submit">Sign In</Button>
              </Form>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <CardText>Create your account</CardText>
              <Form onSubmit={(e) => onRegisterHandler(e)}>
                <FormGroup>
                  <Label for="Username">Email</Label>
                  <Input
                    id="Username"
                    name="name"
                    required
                    type="email"
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
                    required
                    value={pwd}
                    onChange={(e) => {
                      setPwd(e.target.value);
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="cnfrmpassword">Confirm Password</Label>
                  <Input
                    id="cnfrmpassword"
                    name="cnfrmpassword"
                    type="password"
                    required
                    value={cnfrmPwd}
                    onChange={(e) => {
                      setCnfrmPwd(e.target.value);
                    }}
                  />
                </FormGroup>
                {isError && pwd !== cnfrmPwd && (
                  <Alert color="danger">Passwords don't match</Alert>
                )}
                <Button type="submit">Sign Up</Button>
              </Form>
            </React.Fragment>
          )}
        </CardBody>
        <CardFooter>
          <Button onClick={() => setIsSignIn((prev) => !prev)}>
            {isSignIn ? "Sign Up" : "Sign In"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
