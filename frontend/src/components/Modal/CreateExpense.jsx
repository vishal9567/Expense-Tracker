import React, { useState } from 'react'
import { Box, Button, Container, MenuItem, Modal, Select, TextField } from '@mui/material'


function CreateExpense({ open, handleClose, }) {
    const [formData, setFormData] = useState({
        date: '',
        amount: '',
        expense: ''
    })
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
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
                        <form>
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
                            <Button type='submit' backgroundColor="primary" variant='contained' fullWidth sx={{ marginTop: { xs: 2, md: 3 },color:'white',backgroundColor:'rgb(21,101,192)'}} >Submit</Button>
                        </form>
                    </Box>
                </Container>

            </Modal>

        </React.Fragment>
    )
}

export default CreateExpense