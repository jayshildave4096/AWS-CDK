import { combineReducers, configureStore } from "@reduxjs/toolkit"
import {notices, board} from "./reducers/index"

const rootReducer = combineReducers({
  notices,
  board
})

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
