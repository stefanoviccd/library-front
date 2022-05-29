import axios from "axios";
const USER_BASE_API_URL = "http://localhost:8089/api/v1/librarianMember";


class LibrarianMemberService {

    getAllUsers() {
        const token=window.localStorage.getItem("token");
        return axios.get(USER_BASE_API_URL,  { headers: {
            Authorization: token,
          }});
    }
    addUser(user) {
        const token=window.localStorage.getItem("token");
        return axios.post(USER_BASE_API_URL , user,  { headers: {
            Authorization: token, 
          }}
           )
    }

    getUserById(userId){
        const token=window.localStorage.getItem("token");
        return axios.get(USER_BASE_API_URL+"/id/"+userId,  { headers: {
            Authorization: token, 
          }})
    }

    updateUser(user){
        const token=window.localStorage.getItem("token");
        return axios.put(USER_BASE_API_URL, user,  { headers: {
            Authorization: token,
          }});
    }
    deleteUser(userId){
        const token=window.localStorage.getItem("token");
        return axios.delete(USER_BASE_API_URL+"/"+userId,  { headers: {
            Authorization: token,
          }});
    }

    getUsersByValue(searchValue){
        const token=window.localStorage.getItem("token");
        return axios.get(USER_BASE_API_URL+"/"+searchValue,  { headers: {
            Authorization: token,
          }});

    }
    getBookCategories(){
        const token=window.localStorage.getItem("token");
        return axios.get(USER_BASE_API_URL+"/genres",  { headers: {
            Authorization: token,
          }});

    }
    
    generateCardNumber() {
        const token=window.localStorage.getItem("token");
        return axios.get(USER_BASE_API_URL+"/newCardNumber",  { headers: {
            Authorization: token,
          }});
    }
    getByUserCard(cardNumber){
        const token=window.localStorage.getItem("token");
        return axios.get(USER_BASE_API_URL+"/userCard/"+cardNumber,  { headers: {
            Authorization: token,
          }});

    }
 

}
export default new LibrarianMemberService();