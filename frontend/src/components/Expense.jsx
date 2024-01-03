import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'

import MyTable from './Table/MyTable'
import CreateExpense from './Modal/CreateExpense'

function Expense() {
    const [modalOpen,setModalOpen]=useState(false)
    
    
    const closeModal=()=>{
        setModalOpen(false)
    }
    const openModal=()=>{
        setModalOpen(true)
    }

    return (
            <Grid item xs={12} md={9}>
                <Box sx={{backgroundColor:'rgb(27, 28, 27)', borderRadius: { md: '20px', xs: '10px' }, mt: 2, height: { md: '90vh' } }}>
                    <Box sx={{p:{md:3,xs:2},display:'flex',justifyContent:'space-between'}}>
                        <Typography>Expense List</Typography>
                        <Button variant='contained' onClick={openModal}>Add Expense</Button>
                        <CreateExpense open={modalOpen} handleClose={closeModal} />
                    </Box>
                    <MyTable/>
                </Box>
            </Grid>
    )
}

export default Expense
