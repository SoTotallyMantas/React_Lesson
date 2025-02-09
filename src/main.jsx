import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route} from 'react-router';
import './index.css'
import App from './App.jsx'
import Navbar from './Components/Navbar'
import SecondPage from './SecondTaskPage.jsx'
import ThirdPage from './ThirdTaskPage.jsx'
createRoot(document.getElementById('root')).render(
    <StrictMode>
    
       <Router>
            <Navbar />
            <Routes>
                <Route index element={<App />} />
                <Route path='/FirstTask' element={<App />} />
                <Route path='/SecondTask' element={<SecondPage />} />
                <Route path='/ThirdTask' element={<ThirdPage />} />
            </Routes>
        </Router>
  </StrictMode>,
)
