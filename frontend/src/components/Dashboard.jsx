import { Avatar, Box, Button, Grid, Stack, Typography } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, userData } from '../utils/slices/userSlice'
import MyChart from './Barchart/MyChart'
import Statics from './Statics/Statics'
import AddBudget from './Modal/AddBudget'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useNavigate } from 'react-router-dom'


function Dashboard() {
    const [modalOpen,setModalOpen]=useState(false)
    const user = useSelector(userData)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    
    
    const closeModal=()=>{
        setModalOpen(false)
    }
    const openModal=()=>{
        setModalOpen(true)
    }

    const handleLogout=()=>{
        dispatch(logout())
        navigate('/login')
    }

    return (
        <Grid item xs={12} md={9}>
            <Box sx={{ backgroundColor: 'rgb(27, 28, 27)', borderRadius: { md: '20px', xs: '10px' }, mt: 2, height: { md: '90vh' } }}>
                <Box sx={{display:'flex',justifyContent:'flex-end',p:3}}>
                    <Button variant='contained' onClick={openModal}>Add budget limit</Button>
                    <Button onClick={handleLogout} sx={{textTransform:'none'}}>Logout</Button>
                    <AddBudget open={modalOpen} handleClose={closeModal}/>
                </Box>
                <Grid container>
                    <Grid item xs={12} md={8}>
                        <MyChart />
                    </Grid>
                    <Grid item container xs={12} md={4} spacing={2} sx={{p:3}}>
                        <Statics Icon={CurrencyRupeeIcon} title={"Total"} values={"43636"}/>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    )
}

export default Dashboard
