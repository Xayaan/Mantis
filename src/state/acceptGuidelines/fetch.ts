import { Dispatch } from "@reduxjs/toolkit"

import { GetAcceptedStatus } from "../../api/hasAcceptedTerms"

export const fetchAcceptedStatus = (accessToken: string) => {
    return (dispatch: Dispatch) => {
        GetAcceptedStatus(accessToken).then(token => {

        })
    }
}