import React, { useState } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

export default function TaskList() { 

    const [tasks, setTasks] = useState([
            { id: 0, task_title: 'Uzduotis Vienas', completed: false },
            { id: 1, task_title: 'Uzduotis Antra', completed: true },
            { id: 2, task_title: 'Uzduotis Trecia', completed: false }
        ]);

    const addTask = (task_title) => {
        const newTask = {
            id: tasks.length + 1,
            task_title,
            completed: false
        };
        setTasks([...tasks, newTask]);
    }

    const toggleComplete = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    }
    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    }

    return (
        <div className="row align-items-start">
            <h2>Task List</h2>
            <TaskForm onAddTask={addTask} />
            <div className="col-md-6 offset-md-3">
                <ul className="list-group text-start">
                {tasks.length === 0 && <p>No Tasks</p>}
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggleComplete={toggleComplete}
                        onDelete={deleteTask}
                    />
                ))}
                </ul>
            </div>
        </div>
    );
}
