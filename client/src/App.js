import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import './App.css';
import Dropdown from './Dropdown';
import Dropdown2 from './Dropdown2';
import { Constants } from './Constants';
import Modal from './Modal';

const App = () => {

  const [todos, setTodos] = useState([]);
  const [newTicketModal, setNewTicketModal] = useState(false);
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Fetch data from the Express server
    axios.get('http://localhost:5000/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error(error));
  }, []);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  }

  const deleteTask = (task) => {
    axios.post('http://localhost:5000/delete', task)
      .then(response => setTodos(response.data))
      .catch(error => console.error(error));
  }

  const openNewTicketModal = () => {
    setNewTicketModal(true);
  }

  const closeModal = () => {
    setNewTicketModal(false);
  }

  const updateTask = (data) => {
    todos.forEach(element => {
      if (element.task.includes(data)) {
        console.log("Suggestion: ", element);
      }
    });
    setTask(data);
  }

  const addNewTodo = async () => {
    let myKeys = task.trim().split(" ");
    let data = { task: task, status: "OPEN", description: description, keywords: myKeys, ticketId: 1 };
    
    try {
        // Post the new todo
        const response = await axios.post('http://localhost:5000/todos', data);
        console.log(response);
        addTodo(response.data);
        setTask('');
        setNewTicketModal(false);
    
        // Generate all non-empty combinations of myKeys
        let keywordCombinations = getAllCombinations(myKeys);
    
        // Post suggestions for each combination
        for (let combo of keywordCombinations) {
            await axios.post('http://localhost:5000/suggestions', { ticketIds: [1], keywords: combo });
        }
    
    } catch (error) {
        console.error("Error:", error);
    }
  };

  function getAllCombinations(arr) {
    let result = [];
    let f = function(prefix, arr) {
        for (let i = 0; i < arr.length; i++) {
            result.push(prefix.concat(arr[i]));
            f(prefix.concat(arr[i]), arr.slice(i + 1));
        }
    }
    f([], arr);
    return result;
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
  
  function createTicketModal() {
    return (
      <div>
        <button onClick={() => openNewTicketModal()}>+ Create New Task</button>
        <Modal isOpen={newTicketModal} onClose={() => closeModal()}>
          <div style={{ margin: '10%', height: 'auto', width: '80%', display: 'grid' }}>
            <input type="text" placeholder='Subject' value={task} onChange={(e) => updateTask(e.target.value)} />
            <input type="text" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <button onClick={() => closeModal()}>Cancel</button>
              <button onClick={addNewTodo}>Add Todo</button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }

  return (
    <div className='container'>
      <h1>MERN Stack Todo App</h1>
      {/* <TodoForm onAdd={addTodo} /> */}
      {createTicketModal()}
      <ul>
        {todos.map((todo) => (
        <li key={todo._id}
        style={{
          borderColor: todo.priority === 1 ? 'red' : todo.priority === 2 ? 'orange' : 'green',
          borderLeftWidth: '2px',
          borderStyle: 'solid',
        }}>
          {console.log(todo?.status)}
            {todo.task}{' '}
            {todo?.status}
            <Dropdown onSelect={(option) => updateTodo1(todo._id, option)} />
            <Dropdown2 onSelect={(option) => updateTodo2(todo._id, option)} />
            <button
              onClick={() => {
                console.log('Delete called');
                deleteTask(todo);
              }}
            >Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default App;