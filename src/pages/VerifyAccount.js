import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import imgSrc from "./valid.png";
import {
  Form,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
} from "reactstrap";
import axios from "axios";

const VerifyAccount = () => {
  const params = useParams();
  const [authStatus, setAuthStatus] = useState("loading");
  useEffect(() => {
    if (authStatus === "loading") {
      const userId = params.userId;
      const token = params.token;
      const verifyUser = async () => {
        try {
          const response = await axios.get(`${userId}/verify/${token}`);
          console.log(response);
          return response;
        } catch (err) {
          return err.response;
        }
      };
      verifyUser().then((res) => {
        if (res.status === 200) setAuthStatus("Account Verified successfully");
        else {
          if (res?.data?.err === "Token not found")
            setAuthStatus("Already Verified");
          else setAuthStatus("Wrong URL");
        }
      });
    }
  }, []);
  return (
    <div style={{ margin: "10rem 30rem" }}>
      <Form>
        <Card
          className="my-2"
          style={{
            width: "18rem",
          }}
        >
          <CardHeader>Account Status..</CardHeader>
          <CardBody>
            <CardTitle
              tag="h5"
              style={{ color: "green", padding: "0rem 2rem 0 3.5rem" }}
            >
              {authStatus}
            </CardTitle>
            <img
              alt="Verified img"
              src={imgSrc}
              width="50%"
              style={{ margin: "0 3.7rem" }}
            />
            <div style={{ margin: "0 5.4rem " }}>
              <Button color="success">LOGIN</Button>
            </div>
          </CardBody>
        </Card>
      </Form>
    </div>
  );
};

export default VerifyAccount;
