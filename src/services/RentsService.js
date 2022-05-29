import axios from "axios";
const RENT_BASE_API_URL = "http://localhost:8089/api/v1/rents";


class RentsService {

    rentBook(rent) {
        const token=window.localStorage.getItem("token");
        return axios.post(RENT_BASE_API_URL+"/rent", rent,  { headers: {
            Authorization: token,
          }});
    }
    getUserRents(id){
        const token=window.localStorage.getItem("token");
        return axios.get(RENT_BASE_API_URL+"/"+id,  { headers: {
            Authorization: token,
          }})
    }
    restoreBook(rent){
        const token=window.localStorage.getItem("token");
        return axios.post(RENT_BASE_API_URL+"/restore", rent,  { headers: {
            Authorization: token,
          }})
    }
    
}
export default new RentsService();