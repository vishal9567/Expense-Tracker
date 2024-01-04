import React, { useState } from 'react'
import { Box, Button, Container,  Modal,  TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { userData } from '../../utils/slices/userSlice'
import MyBackDrop from '../BackDrop/MyBackDrop'
import MySnackBar from '../SnackBar/MySnackBar'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL

function AddBudget({ open, handleClose, }) {
    const [budget,setBudget]=useState('')
    const [openBackDrop, setOpenBackDrop] = useState(false)
    const [openSnackBar, setOpenSnackBar] = useState({
        open: false,
        message: '',
        severity: ''
    })
   


    const navigate = useNavigate()
    const user=useSelector(userData)


    const closeSnackBar = () => {
        setOpenSnackBar(false)
    }


    const handleChange = (e) => {
        setBudget(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setOpenBackDrop(true)
        const Data={
            amount:budget,
            id:user.id,
        }
        try {
            console.log(Data);
            const { data } = await axios.post(`${baseUrl}/addBudget`, Data)
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
            console.log('not here comes');

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
                                value={budget}
                                variant="outlined"
                                size="small"
                                onChange={handleChange}
                                fullWidth
                                color={'secondary'}
                                focused
                                sx={{ marginTop: { xs: 2, md: 3 }, '& input': { color: 'white' } }}
                            />
                            
                            <Button type='submit'  variant='contained' fullWidth sx={{ marginTop: { xs: 2, md: 3 },color:'white',backgroundColor:'rgb(21,101,192)'}} >Submit</Button>
                        </form>
                        <MyBackDrop open={openBackDrop} handleClose={handleClose} />
                        <MySnackBar handleClose={closeSnackBar} open={openSnackBar.open} message={openSnackBar.message} color={openSnackBar.severity} />
                    </Box>
                </Container>

            </Modal>

        </React.Fragment>
    )
}

export default AddBudget