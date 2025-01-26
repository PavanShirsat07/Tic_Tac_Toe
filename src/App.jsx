import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './Pages/Login'
import Game from './Pages/Game'

import Login from './Pages/Login'
import { UserProvider} from '../Context/UserState'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OpponentLogin from './Pages/OpponentLogin'
import DashBord from './Pages/DashBord'

function App() {

  return (
    <>
<UserProvider>
<BrowserRouter>
  <Routes>
   <Route>
      <Route path='/' element={<Login/>}/>
      <Route path='/game' element={<Game/>}/>
      <Route path='/Opponents' element={<OpponentLogin/>}/>
      <Route path='/DashBord' element={<DashBord/>} />
    </Route>
  </Routes>
</BrowserRouter>
</UserProvider>

    </>
  )
}

export default App
