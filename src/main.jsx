import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router';
import { AuthProvider, useAuth } from "./Context/AuthContext.jsx";
import './index.css'
import App from './Pages/App.jsx'
import Navbar from './Components/Navbar'
import SecondPage from './Pages/SecondTaskPage.jsx'
import ThirdPage from './Pages/ThirdTaskPage.jsx'
import Login from './Pages/login'
import Register from './Pages/register'
import Dashboard from './Pages/dashboard'
import Recipe from './Pages/Recipe.jsx'
import Favorites from './Pages/Favorites.jsx'
import RecipeDetail from './Components/RecipeDetail.jsx'
import {PaginationProvider, usePagination} from './Context/PaginationContext.jsx'

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    return children;
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
      
        <Router>
            <AuthProvider>
            <Navbar />
            <Routes>
                <Route index element={<App />} />
                <Route path='/FirstTask' element={<App />} />
                <Route path='/SecondTask' element={<SecondPage />} />
                   <Route path='/ThirdTask' element={<ThirdPage />} />
                   <Route path='/login' element={<Login />} />
                   <Route path='/Register' element={<Register />} />
                    <Route path='/Dashboard' element={<ProtectedRoute> <Outlet /> </ProtectedRoute> } >
                        <Route index element={<Dashboard />} />
                        <Route element={<PaginationProvider> <Outlet/> </PaginationProvider>}>
                        <Route path="recipe" element={<Recipe />} />
                            <Route path="recipe/:recipeId" element={<RecipeDetail />} />
                            <Route path="favorites" element={<Favorites />} />
                       </Route>
                    </Route>
                   
                </Routes>
            </AuthProvider>
            </Router>
        
  </StrictMode>,
)
