"use client"
import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
import { v4 as uuidv4 } from 'uuid';
import Navbar from './Navbar';

const TodoContainer = () => {

    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState("")
    const [editId, setEditId] = useState("")
    const [showEditBtn, setShowEditBtn] = useState(false)
    const [todoDialog, setTodoDialog] = useState(false)
    const [showCompleted, setShowCompleted] = useState(false)
    const [search, setSearch] = useState("")
    const [isThinking, setIsThinking] = useState(false)

    const saveToLocalStorage = (todo) => {
        localStorage.setItem("todos", JSON.stringify(todo))
    }

    useEffect(() => {
        const savedTodos = localStorage.getItem("todos");

        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

    const openTodoDialog = () => {
        setTodoDialog(true)
    }

    const handleChange = (e) => {
        setTodo(e.target.value)
    }

    const addTodo = () => {
        const now = new Date();
        const formattedTime = new Intl.DateTimeFormat("en-GB", {
            weekday: "short",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        }).format(now);

        const newTodo = { time: formattedTime, id: uuidv4(), todo: todo, completed: false }
        let updatedTodo = [...todos, newTodo]
        setTodos(updatedTodo)
        saveToLocalStorage(updatedTodo)
        setTodo("")
        setTodoDialog(false)
    }

    const toggleCompleted = (id) => {
        const updatedTodos = todos.map(t => {
            if (t.id === id && !t.completed) return { ...t, completed: true }
            return t
        })

        setTodos(updatedTodos)
        saveToLocalStorage(updatedTodos)
    }

    const editTodo = (e, id) => {
        setTodoDialog(true)
        let findTodo = todos.find(t => t.id === id)
        setTodo(findTodo.todo)
        setEditId(id)
        setShowEditBtn(true)
    }

    const saveEditedTodo = () => {
        if (!todo.trim()) return

        const updatedTodos = todos.map(t => {
            if (t.id === editId) {
                return { ...t, todo: todo }
            }
            return t
        });

        setTodos(updatedTodos)
        saveToLocalStorage(updatedTodos)
        setTodo("")
        setEditId("")
        setShowEditBtn(false)
        setTodoDialog(false)
    };

    const deleteTodo = (e, id) => {
        const updatedTodos = todos.filter(t => t.id !== id);
        setTodos(updatedTodos)
        saveToLocalStorage(updatedTodos)
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const toggleShowCompleted = () => {
        setShowCompleted(prev => !prev)
    }

    const filteredTodos = todos.filter(item => showCompleted || !item.completed)

    const askAI = async () => {
        setIsThinking(true)
        let todoList = todos.map(t => t.todo).join(", ")
        try {
            const response = await puter.ai.chat(
                `"Suggest the user a todo if the user is new suggest the todo as you wish but if the user had added 2-3 todos already generate todos based on previous todos and you just have to give one todo and nothing else and you have to give unique todo everytime" These are the user's previous todos: ${todoList}`
            );
            setTodo(response.message.content)
            console.log(response.message.content);
            console.log(todo)
        } catch (error) {
            console.error(error);
        } finally {
            setIsThinking(false)
        }
    };

    return (
        <main className='min-h-screen p-3'>
            <div className="bg-[#2e2a2a] text-white rounded-2xl px-4 py-5 sm:px-10 overflow-auto scrollbar-thumb-white min-h-screen">
             <Navbar/>
                <div className="add-to-do-button flex flex-row gap-3 justify-end flex-wrap">
                    <button onClick={toggleShowCompleted} className='bg-white text-black rounded-2xl px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm cursor-pointer hover:bg-[#ece6e6]'>
                        {showCompleted ? 'Hide completed Todos' : 'Show completed Todos'}
                    </button>
                    <button onClick={openTodoDialog} className='bg-white text-black rounded-2xl px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm cursor-pointer hover:bg-[#ece6e6]'>Add Todo</button>
                </div>


                <div className="todo-container my-8">
                    {todos.length === 0 ? (
                        <div className='text-xl font-bold text-center py-15 text-[#655d5d]'>No Todos Created Yet!</div>
                    ) : filteredTodos.length === 0 ? (
                        <div className='text-xl font-bold text-center py-15 text-[#655d5d]'>No Todos To Show</div>
                    ) : null}
                    {filteredTodos.map((item) => {
                        return <div key={item.id} className="todo flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 my-3 bg-[#211c1c] p-4 sm:p-5 rounded-2xl hover:shadow-2xl transition">
                            <div className="right flex items-start gap-3 flex-1 min-w-0">
                                <input type="checkbox" checked={item.completed || false} onChange={() => toggleCompleted(item.id)} disabled={item.completed} className="mt-1" />

                                <p className={`wrap-break-word ${item.completed ? "line-through text-gray-400" : ""}`}>{item.todo} </p>
                            </div>

                            <div className="left flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                                <small className="text-gray-400">{item.time}</small>

                                <div className="flex gap-2">
                                    <button onClick={(e) => editTodo(e, item.id)} disabled={item.completed} className="bg-white text-black px-4 py-2 rounded-xl hover:bg-[#ece6e6] disabled:opacity-50 disabled:cursor-not-allowed">Edit</button>

                                    <button onClick={(e) => deleteTodo(e, item.id)} className="bg-white text-black px-4 py-2 rounded-xl hover:bg-[#ece6e6]">Delete</button>
                                </div>
                            </div>
                        </div>
                    })}
                </div>

                {todoDialog ? <div className="add-todo-dialog fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="add-to-do bg-[#1c1b1b] rounded-2xl w-full max-w-2xl flex flex-col p-4 sm:p-6 md:p-8 gap-5 shadow-2xl">
                        <div className="close-dialog flex justify-end">
                            <button onClick={() => setTodoDialog(false)}><IoClose /></button>
                        </div>

                        <div className='relative'>
                            <textarea onChange={(e) => handleChange(e)} value={todo} className='w-full bg-[#2b2626] text-white resize-none p-4 pb-16 rounded-2xl' name="todo" id="todo" rows="8" placeholder='What to do today?'></textarea>

                            {isThinking ? <button disabled={true} className='bg-white px-4 py-2 rounded-2xl text-black absolute bottom-4 right-4 animate-pulse'>Thinking...</button> : <button onClick={askAI} className='bg-white px-4 py-2 rounded-2xl text-black absolute bottom-4 right-4 hover:bg-[#ece6e6]'>Suggest Me</button>}
                        </div>

                        {showEditBtn ? <button onClick={saveEditedTodo} className='bg-white text-black w-full py-3 rounded-2xl hover:bg-[#ece6e6]'>Edit Todo</button> : <button onClick={addTodo} className='bg-white text-black w-full py-3 rounded-2xl hover:bg-[#ece6e6]'>Add Todo</button>}
                    </div>
                </div> : ""}
            </div>
        </main >
    )
}

export default TodoContainer