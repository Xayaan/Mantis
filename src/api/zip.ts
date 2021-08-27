export const PostZip = async(zip: any, accountId: string, accessToken: string): Promise<any> => {
    const filedata = new FormData()
    const filepath = zip.name
    
    filedata.append("file", zip, filepath)
    filedata.append("uploaded_by", accountId)
    
    const imageHeaders = new Headers();
    // imageHeaders.append("content-type", "multipart/form-data")
    imageHeaders.append("Authorization", `Bearer ${accessToken}`);
    
    const fileResponse = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/bulk/upload-zip`,
        {
            method: 'POST',
            body: filedata,
            headers: imageHeaders
        })
    
    const jsonResult = await fileResponse.json()
    
    // ts
    // console.log(`[zip.ts] PostFile jsonResult`)
    // console.log(jsonResult)
    
    return jsonResult
}

export const PostZipMetadata = async(zipMetadata: any, accountId: string, accessToken: string): Promise<any> => {
    
}