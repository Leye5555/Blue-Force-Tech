import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import {useNavigate } from "react-router-dom";
import plane from "../../image/paper-plane.png";
import {newUser, loginUser} from "../../actions/user.js"
import Auth from "../../AuthMiddleware/Auth";
import "./styles.css";

const Login_Register = () => {
    const navigate = useNavigate();
    const [isUser, setIsUser] = useState(true);
    const [userData, setUserData] = useState({firstName: "", lastName: "", email: "", password: ""});
    const [userLogin, setUserLogin] = useState({email: "", password: ""});
    const createRef = useRef();
    const passwordRef = useRef();
    const confirmRef = useRef();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const handleClick = (e) => {setIsUser(!isUser);}


    useEffect(() => {
        window.addEventListener("popstate", () => {window.location.reload();});
      }, []);

  
    const handleSignUpClick = async (e) => {
        e.preventDefault();
        if (confirmRef.current.value !== passwordRef.current.value) {
             alert("passwords do not match");
             return;
        }
        dispatch(newUser(userData));
        createRef.current.innerHTML = "<h1 style = 'font-size : 50px; color : blue;'> Loading ..... </h1>";
        setTimeout(() => {
            let auth = Auth();
           if (!auth || confirmRef.current.value !== passwordRef.current.value) return;
           navigate("/users/user/create_appointment"); 
        },4000) 

         
    }


    const handleLoginClick = async (e) => {
        try{
        e.preventDefault();
        dispatch(loginUser(userLogin))
        createRef.current.innerHTML = "<h1 style = 'font-size : 50px; color : blue;'> Loading ..... </h1>";
        setTimeout(() => {
            let auth = Auth();
            if (!auth) return createRef.current.innerHTML = `<h1 style = 'font-size : 3.5em; color : blue;'>Invalid credentials <button type='button'><a href="/">Check your details and click button to try again</a></button></h1> `;
            navigate("/users/user/create_appointment"); 
         },4000) 
        }catch(err) {console.log(err)}
    }


    return (
        <div ref={createRef} className="parent-container">
            <h1 className="welcome">Welcome</h1>
            <p>{isUser ? "Please sign in to continue" : "Please fill in your details to sign up"}</p>
            <div className="auth-container">
                <div className="auth-form">
                    <form onSubmit={ isUser ? handleLoginClick : handleSignUpClick}>
                        {!isUser && (
                            <div className="new-user">
                                <div className="form-group">
                                    <label htmlFor="email">First Name</label>
                                    <input type="text" className="form-control" name ="firstName" onChange = {(e) => setUserData({...userData, firstName : e.target.value})}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Last Name</label>
                                    <input type="text" className="form-control" name="lastName" onChange = {(e) => setUserData({...userData, lastName : e.target.value})} />
                                </div>
                            </div>
                        ) }
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" className="form-control" aria-describedby="emailHelp" onChange = {(e) => { setUserData({...userData, email : e.target.value}); setUserLogin({...userLogin, email : e.target.value})} } />
                            
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input ref= {passwordRef} type="password" className="form-control" onChange = {(e) =>  { setUserData({...userData, password : e.target.value}); setUserLogin({...userLogin , password : e.target.value})} }/>
                        </div>
                            {
                                !isUser && (
                                <div className="form-group">
                                    <label htmlFor="confirm-password">Confirm Password</label>
                                    <input ref={confirmRef} type="password" className="form-control" id="confirm-password" />
                                 </div>
                            ) } 
                        <div className="login-button-wrap">
                            {isUser ? (
                              <button type="submit">Login<img src={plane} alt="subscribe" /></button>
                            ) : ( <button type="submit" >Sign Up<img src={plane} alt="subscribe" /></button> )}
                        </div>
                        <div className="sign-up" onClick={handleClick}>
                            <p style={{color : "rgb(240, 104, 199"}}>{isUser ? "Don't have an account? Sign Up." : "Existing user? Login."}</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default Login_Register;
