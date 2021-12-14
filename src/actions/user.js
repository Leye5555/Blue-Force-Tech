import * as api from "../api/index.js";
import Cookies from "universal-cookie";
import { NEW_USER, LOGIN_USER, CREATE_APPOINTMENT, GET_ALL , DELETE_ONE, ADMIN_LOGIN } from "../constants";
const cookies = new Cookies();



export const newUser = (user) => async (dispatch) => {
    try {
    const {data} = await api.newUser(user);
    dispatch({type: NEW_USER, payload: data});
    cookies.set("Auth_token", data.tokens[0].token, {path: "/"});
    } catch (error) {
        console.log(error);
    }

}

export const loginUser = (user) => async (dispatch) => {
    try {
    const {data} = await api.loginUser(user);
    dispatch({type: LOGIN_USER, payload: data});
    const last_token = data.tokens.length - 1;
    cookies.set("Auth_token", data.tokens[last_token].token, {path: "/"});
    } catch (error) {
        console.log(error);
    }

}

export const createAppointment = (appointment) => async (dispatch) => {
   try{
       const {data} = await api.createAppointment(appointment);
       dispatch({type: CREATE_APPOINTMENT, payload : data})
   }catch(err) {
      console.log(err)
   }
}

export const getAll = () => async (dispatch) => {
    try{
        const {data} = await api.getAll();
        dispatch({type : GET_ALL, payload : data});
    } catch(err) {
        console.log(err)
    }

}

export const deleteOne = (id) => async (dispatch) => {
    try{
        const {data} = await api.deleteOne(id);
        dispatch({type : DELETE_ONE, payload : data})
    }catch(err) {
        console.log(err);
    }
}


export const loginAdmin = (adminLogin) =>  async (dispatch) => {
    try {
       const {data} = await api.loginAdmin(adminLogin);
       dispatch({type : ADMIN_LOGIN, payload : data});
       const last_token = data.tokens.length - 1;
       cookies.set("Admin_token", data.tokens[last_token].token, {path: "#/admin/login/admin"});
    }catch(err) {console.log(err)}
}