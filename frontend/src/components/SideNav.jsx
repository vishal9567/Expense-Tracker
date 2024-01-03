import { Avatar, Box, Grid, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { userData } from '../utils/slices/userSlice'
import DashboardIcon from '@mui/icons-material/Dashboard';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

function SideNav({handleButtonClick,activePage}) {
    const user = useSelector(userData)
    
    return (
        <Grid item xs={12} md={3}>
            <Box sx={{ backgroundColor: 'rgb(27, 28, 27)', borderRadius: { md: '20px', xs: '10px' },mt:2, height: { md: '90vh' } }}>
                <Box sx={{ display: 'flex', justifyContent: { xs: "space-between", md: "space-evenly" }, alignItems: 'center',pt:2,pl:{xs:2,md:0}}}>
                    <Avatar
                        alt="profile pic"
                        src="/icons8-avatar-30.png"
                        sx={{ width: 56, height: 56 }}
                    />
                    <Stack sx={{ p: { xs: 1, md: '' } }}>
                        <Typography variant='h5' component={'p'} fontSize={'small'} fontWeight={'bold'}>{user?.name}</Typography>
                        <Typography fontSize={'small'}>{user?.email}</Typography>
                    </Stack>
                </Box>
                <Box sx={{ p: { xs: 1, md: 3 }, display: 'flex', flexDirection: { md: 'column', xs: 'row' }, justifyContent: { md: 'center', xs: 'space-evenly' }, alignItems: 'flex-start' }}>
                    <IconButton
                        sx={{ fontSize: "small",color: '#ffffff', backgroundColor: activePage==='dashboard'?'#333':'transparent',borderRadius:'10px' }}
                        onClick={()=>handleButtonClick('dashboard')}
                    >
                        <DashboardIcon fontSize='small'/>
                        Dashboard
                    </IconButton>
                    <IconButton
                        sx={{ fontSize: 'small',color: '#ffffff', backgroundColor: activePage==='expense'?'#333':'transparent',borderRadius:'10px'}}
                        onClick={()=>handleButtonClick('expense')}
                    >
                        <CurrencyRupeeIcon fontSize='small' />
                        Expense
                    </IconButton>
                </Box>
            </Box>
        </Grid>
    )
}

export default SideNav
