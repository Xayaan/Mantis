import axios from 'axios'
import rateLimit from 'axios-rate-limit';

const http = rateLimit(axios.create(), { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 })

// AXIOS CALLS
const getOverallStats = (start_date: string, end_date: string) => {
  return http.get(
    `${process.env.REACT_APP_BACKEND_URL}/api/v1/stats/overall-graph?end_date=${end_date}&start_date=${start_date}`
  )
}

const getTagSummary = (start_date: string, end_date: string) => {
  return http.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/stats/overall-tags?start_date=${start_date}&end_date=${end_date}`)
}

const getNumberOfUsers = () => {
  return http.get(`${process.env.REACT_APP_BACKEND_URL}/staticdata/user-count`)
}


// PROMISES
export const GetOverallStats = async(
  end_time: string,
  start_time: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    getOverallStats(end_time, start_time).
      then(res => { 
        // ts
        // console.log(`==== GENERAL STATS ====`)
        // console.log(res)
        
        resolve(res)
      })
      .catch(err => { 
        // console.log(`[stats.ts] GetGeneralStats error = ${err}`)
        reject(err) 
      }); 
    })
}


export const GetTagSummary = async(start_date: string, end_date: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    getTagSummary(start_date, end_date)
      .then(res => {
        // ts
        // console.log(`=== TAG SUMMARY ===`)
        // console.log(res)
        
        resolve(res)
      }).catch(err => {
        console.log(`[stats.ts] GetTagStats error = ${err}`)
        reject(err)
      })
  })
}


export const GetNumberOfUsers = async(): Promise<any> => {
  return new Promise((resolve, reject) => {
    getNumberOfUsers()
      .then(res => {
        resolve(res)
      }).catch(err => {
        console.log(`[stats.ts] GetNumberOfUsers error = ${err}`)
        reject(err)
      })
  })
}