import { CREATE_APPOINTMENT, GET_ALL, DELETE_ONE } from "../constants";
const create_appointment = (state=[], action) => {
    switch(action.type) {
        case CREATE_APPOINTMENT :
            return action.payload;
        case GET_ALL : 
        return action.payload;
        case DELETE_ONE :
        return [...state, action.payload];
        default :
        return state; 
    }
}

export default create_appointment;