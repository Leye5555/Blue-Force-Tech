import React from 'react'
import {Home, Appointments, CreateAppointment, Admin, AdminLogin, Navigation} from "./components"
import {HashRouter as Router, Route, Routes, useNavigate} from "react-router-dom";

const App = () => {
    return (
        <Router forceRefresh = {true}>
            <Navigation />
            <Routes>
                <Route exact path="/" element={<Home />}/>
                <Route exact path="/appointment" element={<Appointments />}/>
                <Route exact path="/users/user/create_appointment" element={<CreateAppointment />} />
                <Route exact path="/admin/login/admin" element ={<Admin />} /> 
                <Route exact path="/admin/login" element = {<AdminLogin />} />
            </Routes>
        </Router>
    )
}

export default App;
