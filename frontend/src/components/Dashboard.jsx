import { Avatar, Box, Grid, Stack, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { userData } from '../utils/slices/userSlice'
import MyChart from './Barchart/MyChart'
import Statics from './Statics/Statics'

function Dashboard() {
    const user = useSelector(userData)

    return (
        <Grid item xs={12} md={9}>
            <Box sx={{ backgroundColor: 'rgb(27, 28, 27)', borderRadius: { md: '20px', xs: '10px' }, mt: 2, height: { md: '90vh' } }}>
                <Grid container>
                    <Grid item xs={12} md={8}>
                        <MyChart />
                    </Grid>
                    <Grid item container xs={12} md={4} spacing={2} sx={{p:3}}>
                        <Statics/>
                        <Statics/>
                        <Statics/>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    )
}

export default Dashboard
