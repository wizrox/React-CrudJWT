import React from 'react'
import { Routes, Route, Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/" className="navbar-brand">
                Appointment System Application
            </a>
            <div className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link to={"/appointments"} className="nav-link">
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                    Add
                </Link>
            </li>
            
            </div>
        </nav>
  </div>
  )
}

export default Header