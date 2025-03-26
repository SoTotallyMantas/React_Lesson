import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
<<<<<<< HEAD
import { NavLink } from 'react-router';
import TaskList  from '../Components/TaskList'
=======
import UserList from '../Components/UserList'
>>>>>>> 6a2adcce817da2854abcba74fc182376dc190eb6
function App() {
    // https://dummyjson.com/users?limit=100



  return (
    <>
<<<<<<< HEAD

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
        
=======
          <main className="container mt-5 text-center">
          <div className="row gx-5">
                  <h1>Naudotojų paieška su sąrašo optimizacija</h1>
                  <UserList/>
          </div>
          </main>
>>>>>>> 6a2adcce817da2854abcba74fc182376dc190eb6
    </>
  )
}

export default App
