import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import NavigationBar from "./components/NavigationBar";
import Container from "react-bootstrap/Container";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) setCurrentUser(user);
  }, []);

  return (
    <Router>
      <NavigationBar
        setCurrentUser={setCurrentUser}
        currentUser={currentUser}
      />
      <Container className="mt-5">
        <Routes>
          <Route
            path="/"
            element={
              currentUser ? (
                currentUser.username === "admin" ? (
                  <Navigate to="/admin" />
                ) : (
                  <Navigate to="/dashboard" />
                )
              ) : (
                <AuthForm setCurrentUser={setCurrentUser} isUser={false} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              currentUser ? (
                <Dashboard user={currentUser} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/admin"
            element={
              currentUser && currentUser.username === "admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/login"
            element={
              currentUser ? (
                <Navigate to="/" />
              ) : (
                <AuthForm setCurrentUser={setCurrentUser} isUser={true} />
              )
            }
          />
          <Route
            path="/register"
            element={
              currentUser ? (
                <Navigate to="/" />
              ) : (
                <AuthForm setCurrentUser={setCurrentUser} isUser={false} />
              )
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
