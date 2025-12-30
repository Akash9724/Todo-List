import React from 'react'
import Tick from '../assets/tick.png'
import Delete from '../assets/delete.png'
import notTick from '../assets/not_tick.png'



const Todoitem = ({text, id, isComplete, deleteTodo, Toggle}) => {
  return (
    <div className='flex items-center my-3 gap-2'>

        <div className='flex flex-1 items-center cursor-pointer' onClick={()=>Toggle(id)}>

            <img  src={isComplete? Tick : notTick} alt='' className='w-7'/>
            <p className={`text-slate-700 ml-4 text-17px decoration-slate-500 ${isComplete ? 'line-through' : ""}`}>{text}</p>
        </div>

        <img src={Delete} onClick={()=>{deleteTodo(id)}} alt='' className='w-3.5 cursor-pointer' />
      
    </div>
  )
}

export default Todoitem
