import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Dashboard from './Dashboard';
import User from './User';
import UserLogin from './UserLogin'

function App() {
  return (
    <Router>
        <Routes>
        <Route path="/user" element={<User />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user/login" element={<UserLogin />} />
        </Routes>
      </Router>
  );
}

export default App;
