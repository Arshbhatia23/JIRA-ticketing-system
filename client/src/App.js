import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import './App.css';
import Dropdown from './Dropdown';
import Dropdown2 from './Dropdown2';
import { Constants } from './Constants';

const App = () => {

  const [todos, setTodos] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    // Fetch data from the Express server
    axios.get('http://localhost:5000/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error(error));
  }, []);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  }


  const updateTodo1 = (id, newPriority) => {
    axios.patch(`http://localhost:5000/todos/${id}`, { priority: newPriority })
    .then(response => {
        const updatedTodos = todos.map((todo) => {
          if (todo._id === id) {
            return {...todo, priority: newPriority };
          }
          return todo;
        });
        setTodos(updatedTodos);
      })
    .catch(error => console.error(error));
  }

  const updateTodo2 = (id, newStatus) => {
    axios.patch(`http://localhost:5000/todos/${id}`, { status: newStatus })
    .then(response => {
        const updatedTodos = todos.map((todo) => {
          if (todo._id === id) {
            return {...todo, status: newStatus };
          }
          return todo;
        });
        setTodos(updatedTodos);
      })
    .catch(error => console.error(error));
  }

  return (
    <div className='container'>
      <h1>MERN Stack Todo App</h1>
      <TodoForm onAdd={addTodo} />
      <ul>
        {todos.map((todo) => (
        <li key={todo._id}
        style={{
          borderColor: todo.priority === 1 ? 'red' : todo.priority === 2 ? 'orange' : 'green',
          borderLeftWidth: '2px',
          borderStyle: 'solid',
        }}>
          {console.log(todo?.status)}
            {todo.task} 
            {todo?.status}
            <Dropdown onSelect={(option) => updateTodo1(todo._id, option)} />
            <Dropdown2 onSelect={(option) => updateTodo2(todo._id, option)} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default App;