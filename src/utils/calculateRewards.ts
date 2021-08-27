// const fixedStartDate: number = 1620164827000                  // TODO: Call with API
// const fixedEndDate: number = fixedStartDate + 10000000           // TODO: Call with API

const quicraTotal = 20

// IF FIXEDENDDATE HASN'T BEEN ACHIEVED
const imagesTotal = 1000000
const estimatedVerificationsTotal = 100000000
const estimatedTagsTotal = 7000000
const estimatedDescriptionsTotal = 3000000


export const calculateQuicraTotal = (images_uploaded: number) => {
    const quicraTotalUser = Math.floor( (images_uploaded * (quicraTotal/imagesTotal)) * 1000000) / 1000000
    return quicraTotalUser
}

export const calculateQuicraTotalVerify = (images_verified: number) => {
    const quicraTotalVerified = Math.floor( (images_verified * (quicraTotal / estimatedVerificationsTotal)) * 1000000) / 1000000
    return quicraTotalVerified
}

export const calculateQuicraTotalAnnotations = (tags_added: number, descriptions_added: number) => {
    const quicraTotalAnnotations =  Math.floor( ((descriptions_added * 2 + tags_added) * quicraTotal / (2 * estimatedDescriptionsTotal + estimatedTagsTotal)) * 1000000) / 1000000
    return quicraTotalAnnotations
}