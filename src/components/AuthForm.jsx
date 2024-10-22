import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const AuthForm = ({ setCurrentUser, isUser }) => {
  const [isLogin, setIsLogin] = useState(isUser);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    setError("");
    setMessage("");
    setUsername("");
    setPassword("");
  }, [location.pathname]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const lowerUsername = username.toLowerCase();

    if (isLogin) {
      const user = users.find(
        (user) =>
          user.username.toLowerCase() === lowerUsername &&
          user.password === password
      );
      if (user !== undefined && Object.keys(user).length !== 0) {
        navigate("/dashboard");
      }
      if (user || (lowerUsername === "admin" && password === "admin")) {
        setCurrentUser(user || { username: "admin", password: "admin" });
        localStorage.setItem(
          "currentUser",
          JSON.stringify(user || { username: "admin", password: "admin" })
        );
      } else {
        setError("Invalid username or password");
      }
    } else {
      const existingUser = users.find(
        (user) => user.username.toLowerCase() === lowerUsername
      );
      if (existingUser) {
        setError("User already exists");
      } else {
        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));
        setMessage("Registration successful! Please login.");
        setUsername("");
        setPassword("");
      }
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-start"
      style={{ height: "100vh" }}
    >
      <Card style={{ width: "24rem" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">
            {location.pathname === "/login" ? "Login" : "Register"}
          </Card.Title>
          {error && <p className={"text-danger"}>{error}</p>}
          {message && <p className={"text-success"}>{message}</p>}
          <Form onSubmit={handleSubmit} className="mb-4">
            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => {
                  setError("");
                  setMessage("");
                  setUsername(e.target.value);
                }}
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setError("");
                  setMessage("");
                  setPassword(e.target.value);
                }}
                required
              />
            </Form.Group>
            <Button variant="dark" type="submit" className="w-100">
              {location.pathname === "/login" ? "Login" : "Register"}
            </Button>
          </Form>
          <div
            className="d-flex justify-content-center align-items-baseline"
            style={{ gap: "10px" }}
          >
            <p>
              {location.pathname === "/login"
                ? "Not a Member?"
                : "Have already an account?"}
            </p>
            <Link
              variant="dark"
              to={location.pathname === "/login" ? "/register" : "/login"}
            >
              {location.pathname === "/login" ? "Register" : "Login"}
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AuthForm;
