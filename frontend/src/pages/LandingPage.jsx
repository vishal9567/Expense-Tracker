import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { userData } from '../utils/slices/userSlice'
import { Box, Container, Grid, createTheme, ThemeProvider, Typography,CssBaseline } from '@mui/material'
import SideNav from '../components/SideNav'
import Dashboard from '../components/Dashboard'
import Expense from '../components/Expense'

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
        text: {
            primary: '#ffffff',
        },
    },
    typography:{
        fontFamily:"'Josefin Sans', 'sans-serif'"
    }
});

function LandingPage() {
    const [activePage,setActivePage]=useState('dashboard')
    const handleButtonClick=(page)=>{
        setActivePage(page)
    }
    const renderPage=()=>{
        if(activePage === 'dashboard') return <Dashboard/>
        else if(activePage === 'expense') return <Expense/>
    }
    const user = useSelector(userData)
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container>
                <Box sx={{ padding: '10px' }}>
                    <Grid container spacing={2} >
                        <SideNav handleButtonClick={handleButtonClick} activePage={activePage}/>
                        {renderPage()}
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default LandingPage
