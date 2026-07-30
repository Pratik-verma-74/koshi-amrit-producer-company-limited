import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Success from './pages/Success';
import AdminLogin from './admin/Login';
import AdminDashboard from './admin/Dashboard';
import FarmerDetails from './admin/FarmerDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Registration />} />
        <Route path="success" element={<Success />} />
      </Route>
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/farmer/:id" element={<FarmerDetails />} />
    </Routes>
  );
}

export default App;
