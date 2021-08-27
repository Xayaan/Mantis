import axios from 'axios'
import rateLimit from 'axios-rate-limit';

const http = rateLimit(axios.create(), { maxRequests: 1, perMilliseconds: 1000, maxRPS: 2 })

const getUserMetadata = (accessToken: string) => {
  return http.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/my-metadata`,
    { headers: {'Authorization': `Bearer ${accessToken}`}
  })
}


export const GetUserMetadata = async(accessToken: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    getUserMetadata(accessToken).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
