import React from 'react';

export default function TaskItem({task, onToggleComplete, onDelete }) {

    
    return (
      
        <li className=" list-group-item d-flex justify-content-between align-items-center">
            <span>{task.task_title}</span>
            <div className="d-flex gap-2">
                <button className="btn btn-primary btn-fixed w-100 " onClick={() => onToggleComplete(task.id)}>
                {task.completed ? 'Undo' : 'Complete'}
            </button>
                <button className="btn btn-secondary  btn-fixed w-100" onClick={() => onDelete(task.id)}>Delete</button>
                </div>
            </li>
        
    );
}
