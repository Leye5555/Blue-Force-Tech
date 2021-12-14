import { combineReducers } from "redux";
import user from "./user";
import loginUser from "./loginUser";
import create_appointment from "./create_appointment";
import admin from "./admin";
const reducers =  combineReducers({user, loginUser, create_appointment, admin});

export default reducers;