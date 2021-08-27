import axios from 'axios'
import rateLimit from 'axios-rate-limit';

const http = rateLimit(axios.create(), { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 })

const getWords = (type: 'RECOMMENDED_WORDS' | 'BANNED_WORDS') => {
    return http.get(
      `${process.env.REACT_APP_BACKEND_URL}/staticdata/tags?type=${type}`,
    )
}

export const GetWords = async(type: 'RECOMMENDED_WORDS' | 'BANNED_WORDS'): Promise<any> => {
    return new Promise((resolve, reject) => {
      getWords(type)
        .then(res => {
          // ts
          // console.log(`==== ${type} ====`)
          // console.log(res)
          
          resolve(res)
        }).catch(err => {
          // console.log(`[stats.ts] GetUserStats error = ${err}`)
          reject(err)
        })
    })
  }
