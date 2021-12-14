import { LOGIN_USER, LOGOUT_USER } from "../constants";
const loginUser = (state = [], action) => {
  switch (action.type) {
    case LOGIN_USER:
        localStorage.setItem('profile', JSON.stringify(action.payload));
        return action.payload;
    case LOGOUT_USER:
        localStorage.clear();
        return state = [];
    default:
      return state;
  }
}

export default loginUser;