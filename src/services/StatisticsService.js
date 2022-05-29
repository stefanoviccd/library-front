import axios from "axios";
const STATISTICS_BASE_API_URL = "http://localhost:8089/api/v1/statistics";


class StatisticsService {

    getStatistics() {
        const token=window.localStorage.getItem("token");
        return axios.get(STATISTICS_BASE_API_URL,  { headers: {
            Authorization: token,
          }});
    }
    
}
export default new StatisticsService();