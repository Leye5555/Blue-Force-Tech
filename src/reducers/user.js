import { NEW_USER } from "../constants";
const user = (state = [], action) => {
    switch(action.type) {
        case NEW_USER:
            localStorage.setItem("profile", JSON.stringify(action.payload));
            return action.payload;
        default:
            return state;
    }

}

export default user;