import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { NavLink } from 'react-router';
import TaskList  from '../Components/TaskList'
function App() {
  



  return (
    <>

              <main className="d-flex flex-column justify-content-center align-items-center min-vh-100">
                <div className="card m-5 p-5">
                    <div className="card-body">
                        <h5 className="card-title text-center">Dashboard</h5>
                        <NavLink to="/login" className="btn btn-primary m-3 w-100">
                            Login
                        </NavLink>
                        <NavLink to="/register" className="btn btn-primary m-3 w-100">
                            Register
                        </NavLink>
                    </div>
                    
                </div>
            </main>
        
    </>
  )
}

export default App
