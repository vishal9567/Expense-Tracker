import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem
        ('userInfo')):null
}
const userSlice= createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserData:(state,action)=>{
            state.user=action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout: (state,action)=>{
            state.user=null;
            localStorage.removeItem('userInfo')
        }
    }
})

export const {setUserData}=userSlice.actions;
export default userSlice.reducer
export const userData=(state)=>state.user;