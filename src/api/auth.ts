import { PostNonceRequest, SignResponse, Tokens } from '../@types/MetaData'
import Web3 from 'web3';

export const Register = async(accountId: string): Promise<number> => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const obj = {
        "public_address": accountId
    }
    const addressObject = JSON.stringify(obj)

    const nonceRequest = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/register`, {
            method: 'POST',
            headers: myHeaders,
            body: addressObject,
            redirect: 'follow'
        })

    const jsonResult: PostNonceRequest = await nonceRequest.json()
    if (jsonResult["status"] != "failed") {
        const nonce: number = jsonResult["nonce"]
        return nonce
    }
    else {
        // console.log(`[auth.ts] Register ERROR\njsonResult = ${jsonResult["message"]}`)
        return 0
    }
}


export const Sign = async(nonce: string, accountId: string): Promise<SignResponse> => {

    return new Promise((resolve, reject) => { 
        const web3 = new Web3(Web3.givenProvider || `ws://${process.env.REACT_APP_BACKEND_URL}`);
        web3.eth.personal.sign(
            web3.utils.utf8ToHex(nonce), 
            accountId,
            '',
            (err: any, signed: string) => {
                if (err) {
                    // console.log(`=== SIGN ERR === = ${err}`)
                    return reject(err)
                } else {
                    return resolve({accountId, signed})
                }
            }
        ) 
    })
    
}


export const Login = async(accountId: string, signature: string) => {    
    const obj = {
      "public_address": accountId,
      "signature": signature
    }

    const loginObject = JSON.stringify(obj)

    const loginResult = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/login`, 
        {
            method: 'POST',
            body: loginObject 
        })

    const jsonResult = await loginResult.json()
    const accessToken = jsonResult["access_token"]
    const refreshToken = jsonResult["refresh_token"]
    
    const tokens: Tokens = { 
        accessToken: accessToken, 
        refreshToken: refreshToken
    }

    return tokens
}


export const GetNonce = async(accountId: string) => {
    const nonceRequest = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/get-nonce?public_address=${accountId}`,
        {
            method: 'GET',
        }
    )
      
    const nonce = await nonceRequest.json()
    // console.log(`[Auth.ts] GetNonce nonce = ${nonce}`)
    return nonce
}


export const GetTokens = async(accountId: string): Promise<Tokens> => {
    return new Promise((resolve, reject) => {
        GetNonce(accountId).then(nonceObject => {
            // console.log(nonceObject)
            if (nonceObject["status"] !== "not found") {
                const nonce = nonceObject["nonce"].toString()
                Sign(nonce, accountId).then(signObject => {
                
                    // console.log(`=== SIGN ===`)
                    const signObjectString = JSON.stringify(signObject)
                    const signObjectJson = JSON.parse(signObjectString)
                    const signature = signObjectJson["signed"]
    
                    Login(accountId, signature).then((tokens) => {
                        resolve(tokens)
                    }).catch((err) => {
                        // ts
                        // console.log(`[auth.ts] Login error = ${err}`)
                        return reject(err)
                    })
                }).catch((err) => {
                    // ts
                    // console.log(`[Auth.ts] Sign ERROR = ${err}`)
                    return reject()
                })
            } else {
                // ts
                // console.log(`[auth.ts] GetNonce request: ${nonceObject["status"]}. Please register.`)
                return reject()
            }
        }).catch((err) => {
            // ts
            // console.log(`[auth.ts] GetNonce request ERROR = ${err}`)
            return reject()
        })
    })
}


export const RegisterTokens = async(accountId: string): Promise<Tokens> => {
    return new Promise((resolve, reject) => {
        Register(accountId).then(nonceNumber => {
            const nonce = nonceNumber.toString() 
            Sign(nonce, accountId).then(signObject => {
            
                const signObjectString = JSON.stringify(signObject)
                const signObjectJson = JSON.parse(signObjectString)
                const signature = signObjectJson["signed"]

                Login(accountId, signature).then((tokens) => {
                    resolve(tokens)
                }).catch((err) => {
                    // ts
                    // console.log(`[auth.ts] RegisterTokens error = ${err}`)
                    return reject(err)
                })
            })
        })
    })
}


export const RefreshTokens = async(refreshToken: string) => {
    // ts
    // console.log(`REFRESHING TOKEN`)
    const refreshHeaders = new Headers()
    refreshHeaders.append("Authorization", `Bearer ${refreshToken}`)

    const refreshResult = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/refresh`, 
        {
            method: 'POST',
            headers: refreshHeaders
        })

    const jsonResult = await refreshResult.json()
    return jsonResult
}