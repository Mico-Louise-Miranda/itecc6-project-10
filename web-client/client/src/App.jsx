import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Plants from './Plants'; 
import AddPlants from './AddPlants';
import UpdatePlants from './UpdatePlants'; 

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Plants />}></Route>
        <Route path='/add' element={<AddPlants />}></Route>
        <Route path='/update/:id' element={<UpdatePlants />}></Route>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App;
