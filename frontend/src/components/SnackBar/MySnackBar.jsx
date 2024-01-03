import { Snackbar, Alert, } from '@mui/material'
import React, { Fragment, forwardRef } from 'react'

const SnackAlert=forwardRef(function SnackAlert(props,ref){
    return <Alert elevation={6} ref={ref} variant='filled' {...props}/>
})

function MySnackBar({handleClose,open,message,color}) {
  return (
    <Fragment>
        <Snackbar autoHideDuration={1500} open={open} onClose={handleClose}>
        {color ? (
          <SnackAlert onClose={handleClose} severity={color} sx={{ width: '100%' }}>
            {message && message}
          </SnackAlert>
        ) : null}
        </Snackbar>
    </Fragment>
  )
}

export default MySnackBar
