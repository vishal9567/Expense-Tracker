import { Avatar, Box, Button, Grid, Stack, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dashboardData, logout, setDashboardInfo, userData } from '../utils/slices/userSlice'
import Statics from './Statics/Statics'
import AddBudget from './Modal/AddBudget'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL

function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false)
    const user = useSelector(userData)
    const expenseData = useSelector(dashboardData)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const closeModal = () => {
        setModalOpen(false)
    }
    const openModal = () => {
        setModalOpen(true)
    }

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${baseUrl}/dashboardData?id=${user.id}`)
                console.log(data);
                dispatch(setDashboardInfo(data))
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchData()
    }, [])

    return (
        <Grid item xs={12} md={9}>
            <Box sx={{ backgroundColor: 'rgb(27, 28, 27)', borderRadius: { md: '20px', xs: '10px' }, mt: 2, height: { md: '90vh' }}}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between',p:3}}>
                    {expenseData?.budget !== 0 ? <Button variant='contained' onClick={openModal}>Update Budget</Button> : <Button variant='contained' onClick={openModal}>Add budget limit</Button>}
                    <Button onClick={handleLogout} sx={{ textTransform: 'none' }}>Logout</Button>
                    <AddBudget open={modalOpen} handleClose={closeModal} />
                </Box>
                <Box sx={{width:'100%',height:'60%',display:'flex',justifyContent:'center',alignItems:'center',pb:2}}>
                <Box sx={{width:'70%',}}>
                    <Grid container spacing={2}>
                        <Statics Icon={CurrencyRupeeIcon} title={"Total Budget"} values={expenseData?.budget} />
                        <Statics Icon={CurrencyRupeeIcon} title={"Total Expense"} values={expenseData?.expense} />
                        <Statics Icon={CurrencyRupeeIcon} title={"Balance"} values={expenseData?.balance} />
                    </Grid>
                    </Box>
                </Box>
            </Box>
        </Grid>
    )
}

export default Dashboard
