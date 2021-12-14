import React, {useState, useEffect, useRef} from 'react';
import {useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import AuthAdmin from "../../../AuthMiddleware/AuthAdmin";
import {loginAdmin} from "../../../actions/user.js";
import plane from "../../../image/paper-plane.png";
import "./styles.css";
import { getAll } from '../../../actions/user';
const AdminLogin = () => {
    const [adminLogin, setAdminLogin] = useState({email: "", password: ""});
    const dispatch = useDispatch();
    const createRef = useRef();
    const navigate = useNavigate();


    useEffect(() => {
        window.addEventListener("popstate", () => {window.location.reload();});
      }, []);
    
      
    const handleLoginClick = async (e) => {
        try{
        e.preventDefault();
        dispatch(loginAdmin(adminLogin))
        dispatch(getAll());
        createRef.current.innerHTML = "<h1 style = 'font-size : 50px; color : white;'> Loading ..... </h1>";

        setTimeout(() => {
            let auth = AuthAdmin();
            if (!auth) return createRef.current.innerHTML = `<h1 style = 'font-size : 3.5em; color : white;'>Invalid credentials <button type='button'><a href="#/admin/login">Check your details and click button to try again</a></button></h1> `;
            navigate("/admin/login/admin"); 
         },4000) 
        }catch(err) {console.log(err)}
    }

    return (
        <div className="login-wrap">
            <div ref={createRef} className="parent-container login-container">
                 <h3>Admin Login</h3>
                <h1 style={{marginBottom : "20px", color : "rgb(240, 104, 199"}} >Welcome Back</h1>
                <form onSubmit={handleLoginClick}>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" aria-describedby="emailHelp" onChange = {(e) => { setAdminLogin({...adminLogin, email : e.target.value})} } />
            
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" onChange = {(e) =>  { setAdminLogin({...adminLogin , password : e.target.value})} }/>
                    </div>
                    <div className="login-button-wrap">
                        <button type="submit">Login<img src={plane} alt="subscribe" /></button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin;
