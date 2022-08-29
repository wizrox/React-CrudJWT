import React, { useState, useEffect } from "react";
import { Grid, GridRow, Image, List } from 'semantic-ui-react'
import "bootstrap/dist/css/bootstrap.min.css";
import ApoointmentDataService from "../services/AppointService";
import { Link } from "react-router-dom";
const AppointmentsList = () => {
  const [appointments, setAppoinments] = useState([]);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchAppointmentDate, setSearchAppointmentDate] = useState("");
  useEffect(() => {
    retrieveAppointments();
  }, []);
  const onChangeSearchAppointmentDate = e => {
    const searchAppointmentDate = e.target.value;
    setSearchAppointmentDate(searchAppointmentDate);
  };
  const retrieveAppointments = () => {
    ApoointmentDataService.getAll()
      .then(response => {
        setAppoinments(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const refreshList = () => {
    retrieveAppointments();
    setCurrentAppointment(null);
    setCurrentIndex(-1);
  };
  const setActiveAppointment = (appointment, index) => {
    setCurrentAppointment(appointment);
    setCurrentIndex(index);
  };
  const removeAllAppointments = () => {
    ApoointmentDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };
  
  return (
    <div className="list row  m-0">
      
      <div className="col-md-6   ">
        <h4>Appointments List</h4>
        <ul className="list-group border border-primary">
          {appointments &&
            appointments.map((appointment, index) => (
              <List divided verticalAlign="middle"
                className={ 
                  " list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveAppointment(appointment, index)}
                key={index}
              >
                <List.Item>
                  {appointment.appoint_date}
                  <List.Content>
                    <List.Header>
                      {appointment.appoint_status? "Active":"Cancelled"}
                    </List.Header>
                    {appointment.description}
                  </List.Content>
                </List.Item>
              </List>
            ))}
        </ul>        
      </div>
      <div className="col-md-6">
        {currentAppointment ? (
          <div>
            <h4>Appointment Details</h4>
            <Grid divided='vertically'>
              <Grid.Row columns={2}>
              <Grid.Column>
                  <label>
                    <strong>AppointmentDate:</strong>
                  </label>
              </Grid.Column>
              <Grid.Column>
                  {currentAppointment.appoint_date}
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>&nbsp;</Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column>
                <label>
                  <strong>Description:</strong>
                </label>
              </Grid.Column>
              <Grid.Column>
                  {currentAppointment.description}
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column>
                <label>
                  <strong>Status:</strong>
                </label>
              </Grid.Column>
              <Grid.Column>
                {currentAppointment.appoint_status ? "Active" : "Cancelled"}
              </Grid.Column>
            </Grid.Row>
            
            <Grid.Row>
              <Link className="badge badge-primary mr-2"
                to={"/appointments/" + currentAppointment.id}
                ><button className="btn btn-sm btn-warning">Edit</button>
                
              </Link>
            </Grid.Row>
          </Grid>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Appointment to make changes...</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default AppointmentsList;