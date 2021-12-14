import React, {useEffect, useRef, useState} from 'react';
import { useDispatch } from 'react-redux';
import { NotFound } from '../';
import { useNavigate } from 'react-router-dom';
import Auth from "../../AuthMiddleware/Auth.js";
import Cookies from 'universal-cookie';
import { createAppointment } from '../../actions/user.js';
import "./styles.css";

const CreateAppointment = () => {
    let sessionUser = localStorage.getItem("profile");
    sessionUser = JSON.parse(sessionUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cookie = new Cookies();
    let auth = Auth();
    const [bool, setBool] = useState(false);
    const [appointData, setAppointData] = useState({fullName : `${sessionUser?.firstName} ${sessionUser?.lastName}`, date : new Date(), reason : ""})
    
    
    useEffect(() => {
      setBool(auth);
      window.addEventListener("popstate", () => {
          window.location.reload();
      })
    }, [setBool])
  
    const handleLogout = () => {
        localStorage.removeItem("profile");
        cookie.remove("Auth_token", {path: "/"})
        setTimeout(() => {
            navigate("/"); 
         },500) 
    }




    const handleSubmit = (e) => {
        e.preventDefault();
         dispatch(createAppointment(appointData));
         e.target.innerHTML = "<h1 style = 'font-size : 50px; color : white; margin-top : max(5vw , 100px)'> Loading ..... </h1>";
         setTimeout(()=> {
             e.target.innerHTML = `<h1 style = 'margin-top : max(5vw , 100px)'>Your appointment has been booked successfully.</h1>`
         },3000)
         
    }
    return (
        <>
        { bool ? 
          <div className = "appointment-form">
              <button type="button" className="logout" onClick={handleLogout}>Logout</button>
            <h1>Create Appointment</h1>
            <form  onSubmit = {handleSubmit}>
                <div className="form-group">
                    <label htmlFor="clientName">Client Name</label>
                    <input type="text" className="form-control" id="patientName" placeholder="Enter patient name" defaultValue={`${sessionUser?.firstName} ${sessionUser?.lastName}`}  onChange={(e) => setAppointData({...appointData , fullName : e.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Date"> What time would you like to book your appointment</label>
                    <input type="datetime-local" className="form-control" id="date" placeholder="Enter date" onChange={(e) => setAppointData({...appointData , date : new Date(e.target.value)})} />
                </div>
                <div className="form-group">
                    <label htmlFor="reason" className="text-label">Reason for appointment </label>
                    <textarea type="text" className="form-control" id="reason" placeholder="Enter reason" onChange={(e) => setAppointData({...appointData , reason : e.target.value})}/>
                   
                </div>
                <button type="submit" className="submit">Submit</button>
            </form>
        </div> : <NotFound />
        }
    </>
    )
}

export default CreateAppointment;
