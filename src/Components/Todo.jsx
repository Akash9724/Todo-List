import { useEffect, useState } from 'react'
import React, { useRef } from 'react'
import todo_icon from '../assets/todo_icon.png'
import Todoitem from './Todoitem'

const Todo = () => {

  const [todoList, SetTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) :[] );



  // this inputRef is used for when you write text in input field it will used after showing the task in todo list
  const inputRef = useRef();



  // when clicked add button this add function is executed and catch data from inputRef
  const add = () => {
    const inputText = inputRef.current.value.trim();


    if (inputText === "") {
      return null;
    }


    // this is object for new task
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    }

    // this settodolist is state updater
    // it will add new todo item in existing todo list without modifying old state
    SetTodoList((prev) => [...prev, newTodo]);

    inputRef.current.value = "";
  }


  const deleteTodo =(id)=>{
      SetTodoList((prevTodos)=>{
        return prevTodos.filter((todo)=> todo.id !== id);
      })
  }


  const Toggle = (id)=>{
      SetTodoList((prevTodos)=>{
        return prevTodos.map((todo)=>{
          if(todo.id == id)
          {
            return {...todo, isComplete: !todo.isComplete}
          }
          return todo;
        })
      })
  }

  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todoList));   
  },[todoList])

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-120 rounded-xl'>

      {/* {title} */}

      <div className='flex items-center mt-7 gap-2'>

        <img src={todo_icon} alt="" className='w-8' />
        <h1 className='text-3xl font-semibold'>To Do List</h1>

      </div>

      {/* {input} */}
      <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input ref={inputRef} type="text" placeholder='Add Your Task' className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder: text-slate-600' />
        <button onClick={add} className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>Add+</button>
      </div>

      {/* {Todo List} */}
      <div>

        {todoList.map((item, index) => {
          return <Todoitem key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} Toggle={Toggle}/>
        })}

      </div>


    </div>
  )
}

export default Todo
