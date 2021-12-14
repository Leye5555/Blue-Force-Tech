import { ADMIN_LOGIN, ADMIN_LOGOUT } from "../constants";
const admin = (state= [], action) => {
    switch (action.type) {
        case ADMIN_LOGIN:
        localStorage.setItem("admin", JSON.stringify(action.payload));
        return action.payload;
        case ADMIN_LOGOUT:
            localStorage.clear();
            return state = [];
        default:
        return state
    }
}

export default admin;