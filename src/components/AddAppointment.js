import React, { useState } from "react";
import ApoointmentDataService from "../services/AppointService";
const AddAppointment = () => {
  const initialAppointmentState = {
    id: null,
    appoint_date: "",
    description: "",
    appoint_status: false
  };
  const [appointment, setAppointment] = useState(initialAppointmentState);
  const [submitted, setSubmitted] = useState(false);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setAppointment({ ...appointment, [name]: value });
  };
  const saveAppointment = () => {
    var data = {
        appoint_date: appointment.appoint_date,
      description: appointment.description
    };
    ApoointmentDataService.create(data)
      .then(response => {
        setAppointment({
          id: response.data.id,
          appoint_date: response.data.appoint_date,
          description: response.data.description,
          appoint_status: response.data.appoint_status
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const newAppointment = () => {
    setAppointment(initialAppointmentState);
    setSubmitted(false);
  };
  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newAppointment}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="appoint_date">Appointment Date</label>
            <input
              type="text"
              className="form-control"
              id="appoint_date"
              required
              value={appointment.appoint_date}
              onChange={handleInputChange}
              name="appoint_date"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={appointment.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>
          <button onClick={saveAppointment} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};
export default AddAppointment;