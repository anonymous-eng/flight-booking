import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./LandingStyles.css";

function LandingPage({ history }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/user/main");
    }
  }, [history, userInfo]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div className="buttonContainer">
              <Link to="/user/login">
                <Button size="lg" className="landingbutton">
                  User
                </Button>
              </Link>
              <Link to="/admin/login">
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="landingbutton"
                >
                  Admin
                </Button>
              </Link>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPage;
