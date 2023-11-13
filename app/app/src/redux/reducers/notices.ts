import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { ActionTypes } from "../actions/actions";
import { getPosts } from "../api";


export type Notice = {
    [key: string]: any;
};

export const noticeAdapter = createEntityAdapter<Notice>({
    selectId: (notice) => notice.id
  });



export const noticeSlice = createSlice({
  name: "notice",
  initialState: noticeAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ActionTypes.GET_NOTICE, (state, action)=>{
        getPosts().then((res)=> {
            res.forEach((ele: Notice) => {noticeAdapter.addOne(state, {id:ele.id, writer: ele.writer, title: ele.title})})
            
        }) 
    })
  }
});

export default noticeSlice.reducer;