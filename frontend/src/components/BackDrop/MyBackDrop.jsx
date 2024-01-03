import { Backdrop, CircularProgress } from '@mui/material'
import React, { Fragment } from 'react'

function MyBackDrop({handleClose,open}) {
    return (
        <Fragment>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Fragment>
    )
}

export default MyBackDrop