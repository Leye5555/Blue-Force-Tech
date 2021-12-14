import axios from "axios";

const url = "https://blue-force-app.herokuapp.com";

export const newUser = (user) =>  axios.post(`${url}/users/user`, user);

export const loginUser = (user) => axios.post(`${url}/users/login`, user);

export const createAppointment = (appointment) => axios.post(`${url}/users/user/create_appointment`, appointment);

export const getAll = async () => await axios.get(`${url}/admin/get_all`);

export const deleteOne = async (id) => await axios.patch(`${url}/admin/delete_one/${id}`);

export const loginAdmin = (adminLogin) =>  axios.post(`${url}/admin/login`, adminLogin);