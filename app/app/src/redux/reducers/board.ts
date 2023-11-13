import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";


export type Board = {
  [key: string]: any;
};

export const boardAdapter = createEntityAdapter<Board>({
  selectId: (board) => board.id
});


export const boardSlice = createSlice({
  name: "board",
  initialState: boardAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
  }
});

export default boardSlice.reducer;