import { Box, Button, Container, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MyForm from '../components/MyForm.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { validation } from '../utils/formValidation.js'
import MyBackDrop from '../components/BackDrop/MyBackDrop.jsx'
import MySnackBar from '../components/SnackBar/MySnackBar.jsx'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData, userData } from '../utils/slices/userSlice.js'

const baseUrl = import.meta.env.VITE_BASE_URL

const label = [
  { name: 'Name', label: 'name' },
  { name: 'Email', label: 'email' },
  { name: 'Password', label: 'password' },
  { name: 'Confirm Password', label: 'cPassword' },
]

function Register() {
  const [formErr, setFormErr] = useState({
    name: '',
    email: '',
    password: '',
    cPassword: ''
  })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cPassword: ''
  })
  const [openBackDrop, setOpenBackDrop] = useState(false)
  const [openSnackBar, setOpenSnackBar] = useState({
    open: false,
    message: '',
    severity: ''
  })

  const dispatch=useDispatch()
  const user=useSelector(userData)
  const navigate= useNavigate()
  useEffect(()=>{
    if(user) navigate('/')
    else navigate('/register')
  },[])

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  const handleClose = () => {
    setOpenBackDrop(false)
  }
  const closeSnackBar = () => {
    setOpenSnackBar(false)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const error = validation(formData)
    setFormErr(error)
    if (Object.keys(error).length === 0) {
      setOpenBackDrop(true)
      try{
        const { data } = await axios.post(`${baseUrl}/register`, formData)
        setOpenSnackBar((prev) => ({
          ...prev,
          open: true,
          message: data.message,
          severity: data.color
        }))
        console.log(data.newUser);
        dispatch(setUserData(data.newUser))
        setTimeout(() => {
          
          navigate('/')
        }, 1000);
      }
      catch(err){
        const data=err.response.data
        setOpenSnackBar((prev) => ({
          ...prev,
          open: true,
          message: data.message,
          severity: data.color
        }))
      }
      finally{
        setOpenBackDrop(false)
      }
    }
  }
  return (
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
        <Stack direction={'row'} spacing={2} justifyContent={'center'}>
          <Typography variant='h5' component={'h1'} color={'white'} textTransform={'uppercase'} sx={{fontSize:{xs:15,md:20} }}>Register here</Typography>
        </Stack>
        <form onSubmit={handleSubmit}>
          <MyForm handleChange={handleChange} formData={formData} formErr={formErr} label={label} color={'secondary'} inputColor='white' />
          
          <Button type='submit' variant='contained' fullWidth sx={{ marginTop: { xs: 2, md: 3 } }} >Submit</Button>
        </form>
        <Typography variant='subtitle2' color={'white'} sx={{ mt: 1, fontSize: { xs: 10, md: 12 } }}>Already have an account? <Link to={'/login'} style={{ color: 'blue', textDecoration: 'none' }}>login</Link></Typography>
      </Box>
      <MyBackDrop open={openBackDrop} handleClose={handleClose} />
      <MySnackBar handleClose={closeSnackBar} open={openSnackBar.open} message={openSnackBar.message} color={openSnackBar.severity} />
    </Container>
  )
}

export default Register
