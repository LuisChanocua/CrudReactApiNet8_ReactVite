import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


//components
import { EditarEmpleado } from './components/EditarEmpleado'
import { NuevoEmpleado } from './components/NuevoEmpleado'
import { ListaEmpleados } from './components/ListaEmpleados'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ListaEmpleados />} />
        <Route path='/agregarempleado' element={<NuevoEmpleado />} />
        <Route path='/empleado/:idEmpleado' element={<EditarEmpleado />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
