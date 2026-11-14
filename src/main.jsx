import { createRoot } from 'react-dom/client'
import './index.css'
import MainPage from './pages/MainPage/MainPage.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import ServersPage from './pages/ServersPage/ServersPage.jsx'
import ServerDetailsPage from './pages/ServerDetailsPage/ServerDetailsPage.jsx'
import ModificationsPage from './pages/ModificationsPage/ModificationsPage.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
       <Route path="" element={<MainPage/>}/>
       <Route path="/servers" element={<ServersPage/>}/>
       <Route path="/servers/:id" element={<ServerDetailsPage/>}/>
       <Route path="/mods" element={<ModificationsPage/>}/>
    </Routes>
  </BrowserRouter>
)
