import React from "react";
import { Card, Container } from "react-bootstrap";

const Dashboard = ({ user }) => {
  return (
    <Container>
      <Card className="text-center">
        <Card.Body>
          <Card.Title>Welcome to the Dashboard!</Card.Title>
          <Card.Text>Hello, {user.username}.</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;
