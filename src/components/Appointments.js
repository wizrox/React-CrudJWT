import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import ApointmentDataService from "../services/AppointService";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from 'semantic-ui-react'


const Appointment = props => {
  const { id }= useParams();
  let navigate = useNavigate();
  const initialAppointmentState = {
    id: null,
    appoint_date: "",
    description: "",
    appoint_status: false
  };
  const [currentAppointment, setCurrentAppointment] = useState(initialAppointmentState);
  const [message, setMessage] = useState("");
  const getAppointment = id => {
    ApointmentDataService.get(id)
      .then(response => {
        setCurrentAppointment(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    if (id)
      getAppointment(id);
  }, [id]);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentAppointment({ ...currentAppointment, [name]: value });
  };
  const updateStatus = status => {
    var data = {
      id: currentAppointment.id,
      appoint_date: currentAppointment.appoint_date,
      description: currentAppointment.description,
      appoint_status: true
    };
    ApointmentDataService.update(currentAppointment.id, data)
      .then(response => {
        setCurrentAppointment({ ...currentAppointment, appoint_status: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const updateAppointment = () => {
    ApointmentDataService.update(currentAppointment.id, currentAppointment)
      .then(response => {
        console.log(response.data);
        setMessage("The appointment was updated successfully!");
        alert("The record is updated and saved")
        navigate("/appointments")
      })
      .catch(e => {
        console.log(e);
      });
  };
  const deleteAppointment = () => {
    ApointmentDataService.remove(currentAppointment.id)
      .then(response => {
        console.log(response.data);
        alert("The record is deleted");
        navigate("/appointments");
      })
      .catch(e => {
        console.log(e);
      });
  };

  
  return (
    <div>
      {currentAppointment ? (
        <div className="edit-form">
          <h4>Appointment</h4>
          <form>
            <div className="form-group">
              <label htmlFor="appoint_date">Appoint Date</label>
              <input
                type="text"
                className="form-control"
                id="appoint_date"
                name="appoint_date"
                value={currentAppointment.appoint_date}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentAppointment.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentAppointment.appoint_status ? "Active" : "Cancelled"}
            </div>
          </form>
          {currentAppointment.appoint_status ? (
            <button 
              className="btn btn-light justify-content-left"
              onClick={() => updateStatus(false)}
            >
              Cancelled
            </button>
          ) : (
            <button
              className="btn btn-dark justify-content-left"
              onClick={() => updateStatus(true)}
            >
              Active
            </button>
          )}
          <button className="m-3 btn btn-sm btn-danger mr-2" onClick={deleteAppointment}>
            Delete
          </button>
          <button
            type="submit"
            className="m-3 btn btn-sm btn-success mr-2"
            onClick={updateAppointment}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Appointment...</p>
        </div>
      )}
    </div>
  );
};
export default Appointment;