export interface ImageUrlContainer {
    photoId: string
    imageUrl: string
}

export interface ImageMetadataContainer {
    photoId: string
    tags: string[]
    description: string
}

export interface ImageRenderPackage {
    photoId: string
    imageUrl: string
    tags: string[]
    description: string
    errors?: string[]
}

export interface AnnotationImageRenderPackage {
    src: string
    name: string
    regions: any[]
}

export interface ErrorObject {
    error: boolean
    errorText: string
    errorLog?: string
}

export interface PostImageMetadata {
    uploaded_by: string
    photoId: string
    tags: string[]
    description: string
}