import axios from 'axios'
import rateLimit from 'axios-rate-limit';

const http = rateLimit(axios.create(), { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 })

const getUsageFlag = (accessToken: string) => {
    return http.get(`${process.env.REACT_APP_BACKEND_URL}/usage-flag`, 
        {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        }
    )
  }
  

// Doesn't work with Axios for some reason.
const postAcceptedStatusFetch = async(accessToken: string, status: 'ACCEPTED' | 'REJECTED') => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`)

    const obj = {
        "flag": status
    }
    const postObject = JSON.stringify(obj)

    const statusRequest = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/usage-flag`, {
            method: 'POST',
            headers: myHeaders,
            body: postObject,
            redirect: 'follow'
        })

    const jsonResult = await statusRequest.json()
    return jsonResult
}

export const GetAcceptedStatus = async(accessToken: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        getUsageFlag(accessToken).then(response => {
            // ts
            // console.log(`==== GET ACCEPTED STATUS ====`)
            // console.log(response)
            resolve(response)
        }).catch(err => reject(err))
    })
}

export const PostAcceptedStatus = async(accessToken: string, status: 'ACCEPTED' | 'REJECTED'): Promise<any> => {
    return new Promise((resolve, reject) => {
        postAcceptedStatusFetch(accessToken, status).then(response => {
            // ts
            // console.log(`==== POST ACCEPTED STATUS ====`)
            // console.log(response)
            resolve(response)
        }).catch(err => {
            reject(err)
        })
    })
}