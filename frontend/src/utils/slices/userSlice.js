import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem
        ('userInfo')):null,
    dashboardInfo:localStorage.getItem('dashboardInfo')?JSON.parse(localStorage.getItem('dashboardInfo')):null
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
            state.dashboardInfo=null
            localStorage.removeItem('userInfo')
            localStorage.removeItem('dashboardInfo')
        },
        setDashboardInfo:(state,action)=>{
            state.dashboardInfo=action.payload;
            localStorage.setItem('dashboardInfo', JSON.stringify(action.payload));
        }
    }
})

export const {setUserData,logout,setDashboardInfo}=userSlice.actions;
export default userSlice.reducer
export const userData=(state)=>state.user;
export const dashboardData=(state)=>state.dashboardInfo;