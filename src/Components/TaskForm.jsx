import { useState } from 'react'
import React from 'react';

export default function TaskForm({ onAddTask }) {

    const [newTask, setNewTask] = useState('');

    const handleSumbit = (e) => {
        e.preventDefault()
        if (newTask.trim() === '') return;
        onAddTask(newTask);
        setNewTask('');
    };

    return (
        <form className="col-md-9 offset-md-3 row mb-3" onSubmit={handleSumbit}>
            <div class="col-4">
            <input className="form-control"
                type="text"
                placeholder="New Task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                />
            </div>
            <div class="col-auto">
                <button className=" btn btn-primary  " type="submit">Add Task</button>
            </div>
        </form>
    );
}
