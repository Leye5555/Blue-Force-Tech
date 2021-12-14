import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import NotFound from "../notFound/NotFound";
import Cookies from 'universal-cookie';
import AuthAdmin from "../../AuthMiddleware/AuthAdmin";
import Paginates from "../pagination/Paginates";
import "./styles.css";
import { getAll } from '../../actions/user';

const Admin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let adminData = localStorage.getItem("admin");
    adminData = JSON.parse(adminData);
    const cookie = new Cookies();
    let auth = AuthAdmin();
    const appointment = useSelector(state => state.create_appointment);

    useEffect(() => {
        window.addEventListener("popstate", () => {
            window.location.reload();
            dispatch(getAll());
        })
      }, [dispatch])
    
      const handleLogout = () => {
          localStorage.removeItem("admin");
          localStorage.removeItem("currentPage")
          cookie.remove("Admin_token", {path: "#/admin/login/admin"})
          setTimeout(() => {
              navigate("/admin/login");
              localStorage.removeItem("currentPage") 
           },500) 
      }
    return (
        <div className="admin-container">
            { auth ?
            <div>
               <h1>Admin Page</h1>
               <p>Welcome</p>
               <p> Title/Name : {adminData.fullName}</p>
               <p>Total number of pending appointments : <span style={{color : "rgb(240, 104, 199)"}}>{appointment?.length}</span> </p>
            <Paginates />
            <button type="button" style={{cursor : "pointer"}} className="logout" onClick={handleLogout}>Logout</button>
           </div>
            : <NotFound />}
        </div>    
    )
}

export default Admin;
