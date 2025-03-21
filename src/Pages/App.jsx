import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import UserList from '../Components/UserList'
function App() {
    // https://dummyjson.com/users?limit=100



  return (
    <>
          <main className="container mt-5 text-center">
          <div className="row gx-5">
                  <h1>Naudotojų paieška su sąrašo optimizacija</h1>
                  <UserList/>
          </div>
          </main>
    </>
  )
}

export default App
