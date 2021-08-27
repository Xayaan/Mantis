import axios from 'axios'
import rateLimit from 'axios-rate-limit';

const http = rateLimit(axios.create(), { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 })

const getUserStats = (start_date: string, end_date: string, accessToken: string) => {
  return http.get(
    `${process.env.REACT_APP_BACKEND_URL}/api/v1/stats/user-graph?start_date=${start_date}&end_date=${end_date}`, 
    { headers: {'Authorization': `Bearer ${accessToken}`},
  })
}

export const GetUserStats = async(start_date: string, end_date: string, accessToken: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    getUserStats(start_date, end_date, accessToken)
      .then(res => {
        // ts
        // console.log(`==== USER STATS ====`)
        // console.log(res)
        
        resolve(res)
      }).catch(err => {
        // console.log(err)
        reject(err)
      })
  })
}