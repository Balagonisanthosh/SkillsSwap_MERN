import {configureStore} from '@reduxjs/toolkit'
import mentorReducer from "./slices/mentorSlice";
import authReducer from './slices/authSlice';
export const store=configureStore({
    reducer:{
        auth:authReducer,
        mentors:mentorReducer,
    },

});