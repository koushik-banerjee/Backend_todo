import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsFillCheckCircleFill, BsCircleFill, BsFillTrashFill } from 'react-icons/bs';

function Home() {
    const [todos, setTodos] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.error(err));
    }, []);
    
    const handleEdit = async (id) => {
        try {
            await axios.put(`http://localhost:3001/update/${id}`);
            setTodos(prevTodos => prevTodos.map(todo => todo._id === id ? { ...todo, done: !todo.done } : todo));
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/delete/${id}`);
            setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='home'>
            <h2 className='header'>Todo List </h2>
            <Create />
            {
                todos.length === 0 
                    ? <div><h2>No Record</h2></div>
                    : todos.map(todo => (
                        <div key={todo._id} className='task'>
                            <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                                {todo.done ? <BsFillCheckCircleFill className='icon' /> : <BsCircleFill className='icon' />}
                                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                            </div>
                            <div>
                                <BsFillTrashFill className='icon icon-2' onClick={() => handleDelete(todo._id)} />
                            </div>
                        </div>
                    ))
            }
        </div>
    );
}

export default Home;
