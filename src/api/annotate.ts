import { RectangleCoords } from '../@types/MetaData'

export const PostODAnnotations = async(accessToken: string, photoId: string, rectangleCoords: RectangleCoords[]) => {
    const currentTime = new Date()

    const annotationData = {
        photo_id: photoId,
        timestamp: currentTime,
        rectangleCoords: rectangleCoords
    }

    const imageHeaders = new Headers()
    imageHeaders.append("Authorization", `Bearer ${accessToken}`)

    const ODAnnotationsResponse = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/annotate-object-detection`, 
        {
          method: 'POST',
          body: JSON.stringify(annotationData),
          headers: imageHeaders
        }
    )

    const jsonResult = await ODAnnotationsResponse.json()
    return jsonResult
}