import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddAppointment from "./components/AddAppointment";
import Appointment from "./components/Appointments";
import AppointmentList from "./components/AppointmentsList";
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"

import { AuthProvider } from './context/AuthContext'



function App() {
  
  return (
    <AuthProvider>
    <div> 
      <div className="container mt-3">
        <Routes>          
            <Route path="/" element={<LoginPage/>} />
            <Route path="/appointments" element={<HomePage/>} />
            <Route path="/api" element={<AppointmentList/>} />
            <Route path="/add" element={<AddAppointment/>} />
            <Route path="/appointments/:id" element={<Appointment/>} />
      
        </Routes>
      </div>
    </div>
    </AuthProvider>
  );
}

export default App;
