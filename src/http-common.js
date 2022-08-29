import axios from "axios";



export default axios.create({
 
  baseURL: "http://localhost:8000/appointments",
  
  headers: {"Content-type": "application/json"},

});

//     "Authorization": 'Bearer ' + JSON.parse(localStorage.authTokens).access}
