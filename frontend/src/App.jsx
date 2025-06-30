import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      {/* Toaster placed here, outside Routes */}
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Auth />} />
          <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        {/*redirect for unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
