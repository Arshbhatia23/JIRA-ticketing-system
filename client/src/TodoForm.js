import React, { useState } from 'react';
import axios from 'axios';
import Dropdown from './Dropdown';
const TodoForm = ({ onAdd }) => {
    
    const [task, setTask] = useState('');
   

    const addTodo = async () => {
        try {
            const response = await axios.post('http://localhost:5000/todos', { task, status: "CREATED" });
            onAdd(response.data);
            setTask('');
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <input type="text" placeholder='task' value={task} onChange={(e) => setTask(e.target.value)} />
            <button onClick={addTodo}>Add Todo</button>
            
        </div>
    );

};
export default TodoForm;