import axios from "axios";
import http from "../http-common";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/appointments";

const getAll = () => {
  // return axios.get("/api");
  return axios.get(API_URL+"/api", { headers: authHeader() });
};
const get = id => {
  // return http.get(`/api/${id}/`);
  return axios.get(API_URL+`/api/${id}/`, { headers: authHeader() });
};
const create = data => {
  // return http.post("/api", data);
  return axios.post(API_URL+`/api`, data , { headers: authHeader() });
};
const update = (id, data) => {
  //return http.put(`/api/${id}/`, data);
  return axios.put(API_URL+`/api/${id}/`, data,  { headers: authHeader() });
};
const remove = id => {
  //return http.delete(`/api/${id}/`);
  return axios.delete(API_URL+`/api/${id}/`, { headers: authHeader() });
};


const AppointmentService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default AppointmentService