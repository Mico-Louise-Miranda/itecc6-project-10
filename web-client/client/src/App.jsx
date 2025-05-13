import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'; 
import Garden from './pages/Garden';
import AddPlant from './pages/AddPlant';
import UpdatePlant from './pages/UpdatePlant';
import PlantDetail from './pages/PlantDetail';
import Routine from './pages/Routine';
import SeedData from './SeedData';

function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/garden' element={<Garden />}></Route>
        <Route path='/routine' element={<Routine />}></Route>
        <Route path='/add' element={<AddPlant />}></Route>
        <Route path='/update/:id' element={<UpdatePlant />}></Route>
        <Route path='/plant/:id' element={<PlantDetail />}></Route>
        <Route path='/seed' element={<SeedData />}></Route>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App;
