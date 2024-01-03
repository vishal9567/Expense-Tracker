import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../utils/slices/userSlice.js'

export const store = configureStore({
    reducer:userReducer
})