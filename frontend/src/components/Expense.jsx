import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import MyTable from './Table/MyTable'
import CreateExpense from './Modal/CreateExpense'
import MyPagination from './Pagination/MyPagination'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage, totalCount } from '../utils/slices/userSlice'

function Expense() {
    const [modalOpen,setModalOpen]=useState(false)
    
    const TotalCount = useSelector(totalCount)
    const dispatch = useDispatch()
    const closeModal=()=>{
        setModalOpen(false)
    }
    const openModal=()=>{
        setModalOpen(true)
    }

    const onPagination = (e, newPage) => {
        dispatch(setCurrentPage(newPage))
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
                    <MyPagination onPagination={onPagination} totalCount={TotalCount}/>
                </Box>
            </Grid>
    )
}

export default Expense
