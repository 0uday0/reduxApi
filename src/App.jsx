import React from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import HomePage from './Components/HomePage'
import WrapClass from './Components/ListUsers'
import WrapReg from './Components/Registration'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super()
  }
  render () {
    return(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage></HomePage>}></Route>
      <Route path='listusers' element={<WrapClass></WrapClass>}></Route>
      <Route path='registration' element={<WrapReg></WrapReg>}></Route>
    </Routes>
    </BrowserRouter>
    )
  }
}



export default App
