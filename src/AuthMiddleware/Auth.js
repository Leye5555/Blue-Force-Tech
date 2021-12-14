import jwt_decode from "jwt-decode";
import Cookies from 'universal-cookie';
const Auth = () => {
    let userData = localStorage.getItem("profile");
    userData = JSON.parse(userData);
    let userID = userData?._id;
    const cookies = new Cookies();
    const token = cookies.get("Auth_token");
    const adminToken = cookies.get("Admin_token");
    const getDecodedToken = () => {
       try {
           return jwt_decode(token); 
       }catch(error) {
           console.log(error)
           return null;
       }
    }
    const decodedToken = getDecodedToken();
 


    let AuthenticatedUser = decodedToken?._id === userID ? true : false;
    if (decodedToken === null ) {
        AuthenticatedUser = false;
       
    }
    // localStorage.setItem("result", AuthenticatedUser);

    return AuthenticatedUser;
}
export default Auth;
