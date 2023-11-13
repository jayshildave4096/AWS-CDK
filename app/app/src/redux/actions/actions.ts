import { createAction } from "@reduxjs/toolkit"

const GET_NOTICE = '[Notice] Get Notice'
const GET_BOARD = '[Board] Get Board'
const POST_NOTICE = '[Notice] Post Notice'
const POST_BOARD = '[Board] Post Board'

export const ActionTypes = {
    GET_NOTICE,
    GET_BOARD,
    POST_BOARD,
    POST_NOTICE
}

export const createGetNoticeAction = createAction(ActionTypes.GET_NOTICE, ()=>{
    return {
        type: ActionTypes.GET_NOTICE,
        payload: null
    }
})