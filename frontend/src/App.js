import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout"; // Import the Layout component
import Users from "./pages/Users";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* Wrapping admin routes inside Layout */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          {/* Add other admin-related routes inside the Layout */}
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <Layout>
                  <h2 className="text-3xl font-bold">User Management</h2>
                  <Users />
                  {/* Content related to managing users */}
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <Layout>
                  <h2 className="text-3xl font-bold">Task Management</h2>
                  {/* Content related to managing tasks */}
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
