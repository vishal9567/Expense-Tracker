import React, { useState } from 'react'
import { Box, Button, Container,  Modal,  TextField } from '@mui/material'


function AddBudget({ open, handleClose, }) {
    const [budget,setBudget]=useState('')
    const handleChange = (e) => {
        setBudget(e.target.value)
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
                                value={budget}
                                variant="outlined"
                                size="small"
                                onChange={handleChange}
                                fullWidth
                                color={'secondary'}
                                focused
                                sx={{ marginTop: { xs: 2, md: 3 }, '& input': { color: 'white' } }}
                            />
                            
                            <Button type='submit' backgroundColor="primary" variant='contained' fullWidth sx={{ marginTop: { xs: 2, md: 3 },color:'white',backgroundColor:'rgb(21,101,192)'}} >Submit</Button>
                        </form>
                    </Box>
                </Container>

            </Modal>

        </React.Fragment>
    )
}

export default AddBudget