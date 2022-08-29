import React from 'react'
import Header from "../components/Header"
import AppointmentsList from '../components/AppointmentsList';

import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const HomePage = () => {
  const  user  = useContext(AuthContext);
  return (
    // eslint-disable-next-line no-restricted-globals
      <div>
          <Header/>
        
        <div>
            <p> You are logged in with user-id:&nbsp; <strong>{user.user.user_id}</strong>  </p>
        </div>
        <AppointmentsList/>
      </div>

  )
}

export default HomePage