import { createRoot } from 'react-dom/client'
import './index.css'
import MainPage from './pages/MainPage/MainPage.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import ServersPage from './pages/ServersPage/ServersPage.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
       <Route path="" element={<MainPage/>}/>
       <Route path="/servers" element={<ServersPage/>}/>
    </Routes>
  </BrowserRouter>
)
