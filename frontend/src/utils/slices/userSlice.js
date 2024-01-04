import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem
        ('userInfo')):null,
    dashboardInfo:localStorage.getItem('dashboardInfo')?JSON.parse(localStorage.getItem('dashboardInfo')):null,
    totalCount:0,
    currentPage:1,
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
        },
        setTotalCount:(state,action)=>{
            state.totalCount=action.payload
        },
        setCurrentPage:(state,action)=>{
            state.currentPage=action.payload
        }
    }
})

export const {setUserData,logout,setDashboardInfo,setTotalCount,setCurrentPage}=userSlice.actions;
export default userSlice.reducer
export const userData=(state)=>state.user;
export const dashboardData=(state)=>state.dashboardInfo;
export const totalCount=(state)=>state.totalCount;
export const currentPage=(state)=>state.currentPage;