import axios from "axios";
const LEGAL_ENTITY_BASE_API_URL = "http://localhost:8089/api/v1/user/login";
class UserService {

    login(user) {
      //  const token=window.localStorage.getItem("token");
        return axios.post(LEGAL_ENTITY_BASE_API_URL, user,  { headers: {
            //Authorization: token,
          }})
        
    }
}
export default new UserService();
