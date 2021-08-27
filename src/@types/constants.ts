import { TimeState } from "./MetaData";
import { ErrorObject } from "./Providers";

import { VideoData } from "../components/molecules/TutorialVideo";

const event = new Date();
const date = event.toLocaleString(`en`);
const splitDate = date.split(`, `)[0].split(`/`)
const currentDate = [splitDate[1], splitDate[0], splitDate[2]].join(`-`)


export const noError: ErrorObject = {
    error: false,
    errorText: ''
}

export type TimeStates = {
    [key: string]: TimeState
}

export const timesList = ['24H', '7D', '1M', '3M', '1Y', 'ALL']


export const timeStates: TimeStates = {
    'ALL': {
        start_date: "14-05-2021",
        end_date: currentDate
    }
}

export const photoUploadErrorsList = [
    "Image height too small. Minimum allowed value [400 pixel]",
    "Image width too small. Minimum allowed value [400 pixel]",
    "Allowed file types are {'JPG', 'PNG', 'jpeg', 'png', 'jpg', 'JPEG', 'gif', 'GIF'}",
    "The uploaded file already exists in the dataset.",
    "Token has expired",
    "failed",
    "Could not post image.",
    "FATAL ERROR: Authentication failed. The developers are working hard to fix this as soon as possible."
]

export const metamaskVideo: VideoData = {
    id: `metamaskDownload`,
    title: `How to Download Metamask`,
    description: `To use the Upload, Verify, Annotate and My Stats tabs, you need to download an addon called Metamask. Metamask is a cryptocurrency wallet app. 
       Watch this video to get started.`,
    embedId: `GNPz-Dv5BjM`
}

export const connectVideo: VideoData = {
    id: `connectMetamask`,
    title: `How to Connect Metamask to alpha.dataunion.app`,
    description: `After you've downloaded Metamask, this video will show you how to connect to the DataUnion alpha and get started!`,
    embedId: `QI6Fkt-HRAM`
}

export const welcomeVideo: VideoData = {
    id: `welcomeVideo`,
    title: `Welcome to DataUnion.app's Mantis`,
    description: `To get a short intro into the platform and the introduction material, check out this video!`,
    embedId: `EzUTi1tfbf8`
}

export const uploadVideo: VideoData = {
    id: `uploadImage`,
    title: `Uploading your first image`,
    description: `If you wonder how to Upload your first image - this video is the answer.`,
    embedId: `6_BGFjT31hs`
}

export const verifyVideo: VideoData = {
    id: `verifyImage`,
    title: `Verifying Images`,
    description: `How do you verify your first image? Check out this video!`,
    embedId: `bFfKY6aqgzQ`
}

// export const quicraVideo: VideoData = {
//     title: `How to Use QUICRA-0`,
//     description: `This video explains what the QUICRA-0 token is, where it derives its value, and how you can transfer it into real money.`,
//     embedId: `QI6Fkt-HRAM`
// }

export const statsVideo: VideoData = {
    id: `payouts`,
    title: `What is QUICRA-0?`,
    description: `This video explains what the QUICRA-0 token is, where it derives its value, and how you can transfer it into real money.`,
    embedId: `hwE8SRo7zRs`
}