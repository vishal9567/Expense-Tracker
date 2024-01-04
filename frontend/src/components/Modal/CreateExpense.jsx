import React, { useState } from 'react'
import { Box, Button, Container, MenuItem, Modal, Select, TextField } from '@mui/material'
import axios from 'axios'
import MyBackDrop from '../BackDrop/MyBackDrop'
import { useNavigate } from 'react-router-dom'
import MySnackBar from '../SnackBar/MySnackBar'
import { useSelector } from 'react-redux'
import { userData } from '../../utils/slices/userSlice'

const baseUrl = import.meta.env.VITE_BASE_URL


function CreateExpense({ open, handleClose, }) {
    const [openBackDrop, setOpenBackDrop] = useState(false)
    const [openSnackBar, setOpenSnackBar] = useState({
        open: false,
        message: '',
        severity: ''
    })
    const [formData, setFormData] = useState({
        date: '',
        amount: '',
        expense: ''
    })


    const navigate = useNavigate()
    const user=useSelector(userData)


    const closeSnackBar = () => {
        setOpenSnackBar(false)
    }
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setOpenBackDrop(true)
        const Data={
            date:formData.date,
            amount:formData.amount,
            expense:formData.expense,
            id:user.id,
        }
        try {
            const { data } = await axios.post(`${baseUrl}/addExpense`, Data)
            setOpenSnackBar((prev) => ({
                ...prev,
                open: true,
                message: data.message,
                severity: data.color
            }))
            setTimeout(() => {
                navigate('/login')
            }, 1000)
        }
        catch (err) {
            const data = err.response.data
            setOpenSnackBar((prev) => ({
                ...prev,
                open: true,
                message: data.message,
                severity: data.color
            }))
        }
        finally {
            setOpenBackDrop(false)
        }
    }

    return (
        <React.Fragment>
            <Modal
                open={open}
                onClose={handleClose}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    backgroundColor: "white",
                }}
            >
                <Container maxWidth={false} sx={{ height: '100vh', backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Box
                        sx={{
                            width: {
                                xs: 200,
                                md: 270
                            },
                            padding: {
                                xs: 3,
                                md: 4
                            },
                            borderRadius: {
                                xs: 3,
                                md: 5
                            }
                        }}
                        backgroundColor='rgb(27, 28, 27)'
                    >
                        <form onSubmit={handleSubmit}>
                            <TextField
                                type='number'
                                label={'Amount'}
                                name={'amount'}
                                value={formData?.amount}
                                variant="outlined"
                                size="small"
                                onChange={handleChange}
                                fullWidth
                                color={'secondary'}
                                focused
                                sx={{ marginTop: { xs: 2, md: 3 }, '& input': { color: 'white' } }}
                            />
                            <TextField
                                type='date'
                                label={'Date'}
                                name={'date'}
                                value={formData?.date}
                                variant="outlined"
                                size="small"
                                onChange={handleChange}
                                fullWidth
                                color={'secondary'}
                                focused
                                sx={{ marginTop: { xs: 2, md: 3 }, '& input': { color: 'white' } }}
                            />
                            <TextField
                                type='number'
                                label={'Select Expense'}
                                name={'expense'}
                                value={formData?.expense}
                                variant="outlined"
                                size="small"
                                onChange={handleChange}
                                fullWidth
                                color={'secondary'}
                                focused
                                select
                                sx={{ marginTop: { xs: 2, md: 3 }, '& input': { color: 'white' } }}
                            >
                                <MenuItem value={'food'} sx={{ color: 'black' }}>Food</MenuItem>
                                <MenuItem value={'transportation'} sx={{ color: 'black' }}>Transportation</MenuItem>
                                <MenuItem value={'others'} sx={{ color: 'black' }}>Others</MenuItem>
                            </TextField>
                            <Button type='submit'  variant='contained' fullWidth sx={{ marginTop: { xs: 2, md: 3 }, color: 'white', backgroundColor: 'rgb(21,101,192)' }} >Submit</Button>
                        </form>
                        <MyBackDrop open={openBackDrop} handleClose={handleClose} />
                        <MySnackBar handleClose={closeSnackBar} open={openSnackBar.open} message={openSnackBar.message} color={openSnackBar.severity} />
                    </Box>
                </Container>

            </Modal>

        </React.Fragment>
    )
}

export default CreateExpense