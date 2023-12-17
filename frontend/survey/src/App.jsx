// src/App.js
// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import login from "./components/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" component={login} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
