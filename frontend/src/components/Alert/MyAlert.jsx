import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

function MyAlert({ handleClose, handleAgree, open, id, msg }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                {"Confirmation"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {msg}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} variant='outlined' sx={{backgroundColor:'blue',':hover':{backgroundColor:'blue'}}}>
                    Disagree
                </Button>
                <Button onClick={() => handleAgree(id)} autoFocus variant='outlined' sx={{backgroundColor:'blue',':hover':{backgroundColor:'blue'}}}>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default MyAlert
