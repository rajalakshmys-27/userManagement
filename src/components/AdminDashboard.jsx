import React, { useState } from "react";
import { Table, Container, Button } from "react-bootstrap";
import { Eye, EyeSlash } from "react-bootstrap-icons";

const AdminDashboard = () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const [passwordVisibility, setPasswordVisibility] = useState(
    users.map(() => false)
  );

  const togglePasswordVisibility = (index) => {
    setPasswordVisibility((prevState) =>
      prevState.map((visible, i) => (i === index ? !visible : visible))
    );
  };

  return (
    <Container
      className="mt-5 d-flex flex-column align-items-start"
      style={{ gap: "25px" }}
    >
      <h2>Registered Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.username}</td>
              <td>
                {passwordVisibility[index]
                  ? user.password
                  : "•".repeat(user.password.length)}{" "}
              </td>
              <td>
                <Button
                  variant="link"
                  onClick={() => togglePasswordVisibility(index)}
                >
                  {passwordVisibility[index] ? (
                    <EyeSlash color="black" />
                  ) : (
                    <Eye color="black" />
                  )}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminDashboard;
