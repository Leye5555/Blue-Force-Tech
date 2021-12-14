import jwt_decode from "jwt-decode";
import Cookies from 'universal-cookie';

const AuthAdmin = () => {

const cookies = new Cookies();
const adminToken = cookies.get("Admin_token");
let adminData = localStorage.getItem("admin");
adminData = JSON.parse(adminData);
let adminID = adminData?._id; 

const getAdminDecodedToken = () => {
    try {
        return jwt_decode(adminToken);
    }catch(error) {
        console.log(error)
        return null;
    }
}

const adminDecodedToken = getAdminDecodedToken();

let AuthenticatedAdmin = adminDecodedToken?._id === adminID ? true : false;
if (adminDecodedToken === null ) {
    AuthenticatedAdmin = false;
   }
// localStorage.setItem("result", AuthenticatedUser);

return AuthenticatedAdmin;
}


export default AuthAdmin;