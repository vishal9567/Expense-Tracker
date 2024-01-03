import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import LandingPage from './pages/LandingPage.jsx'

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path='/' Component={LandingPage} />
          <Route path='/register' Component={Register} />
          <Route path='/login' Component={Login} />
        </Routes>
      </Provider>
    </Router>
  )
}

export default App
