import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

import TaskList from '../Components/TaskList'
function tasklist() {




    return (
        <>
            <main className="container mt-5 text-center">
                <div className="row gx-5">
                    <h1>Task Management App</h1>
                    <TaskList />
                </div>
            </main>
        </>
    )
}

export default tasklist
