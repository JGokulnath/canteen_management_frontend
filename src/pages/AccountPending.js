import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  CardTitle,
  Spinner,
  Alert,
} from "reactstrap";
const AccountPending = () => {
  const [visible, setVisible] = useState(false);
  console.log(visible);
  const onDismiss = () => setVisible(false);
  const showAlert = () => {
    setVisible(true);
  };

  return (
    <div style={{ margin: "10rem 30rem" }}>
      <Card
        color="primary"
        outline
        style={{
          width: "18rem",
        }}
      >
        <CardHeader>Account Status..</CardHeader>
        <CardBody>
          <CardTitle tag="h5">Email verification pending...</CardTitle>

          <div
            className="spinner gap-3"
            style={{
              alignItems: "center",
              display: "flex",
              padding: "1rem 4rem 0",
            }}
          >
            <Spinner color="primary" type="grow" />

            <Spinner color="primary" type="grow" />
            <Spinner color="primary" type="grow" />
          </div>
          <div className="Alertmsg" style={{ padding: "1rem 0" }}>
            <Alert isOpen={visible} toggle={onDismiss}>
              Email has been sent
            </Alert>
          </div>
          <div
            className="accpdbtn"
            style={{ margin: "2rem", padding: "0 0.3rem 0 1rem" }}
          >
            <Button
              color="warning"
              onClick={() => {
                window.location.reload();
              }}
            >
              Refresh
            </Button>{" "}
            {/*<Button color="success" outline onClick={showAlert}>
              Resend
            </Button>*/}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AccountPending;
