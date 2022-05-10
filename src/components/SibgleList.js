import React, { useContext } from 'react'
import {AiOutlineArrowDown,AiOutlineArrowUp,} from "react-icons/ai"
import {MdDelete} from "react-icons/md"
import { ExpenseTrackerContext } from '../context/context'

const SibgleList = (props) => {

    const {deleteTransaction}  = useContext(ExpenseTrackerContext)
  return (
    <div className={`h-12 w-full  mt-1 rounded-md flex items-center justify-between  gap-2 border-2  px-2 ${props.type=="Income"?"border-green-400":"border-red-400"}`} key= {props.id}>
        <div className='flex gap-2 items-center justify-between'>
        {
            props.type=="Income"?<AiOutlineArrowDown size={30} className="text-green-400 border border-green-400 rounded-full"/>:<AiOutlineArrowUp size={30} className="text-red-400 border border-red-400 rounded-full"/>
        

        }
        <div className=' flex flex-col justify-center '>
            <span className='font-medium'>
                {props.category}
            </span>
            <span className='text-gray-400 text-sm'>
                ${props.amount}   on {props.date}
            </span>
        </div>
        </div>
        <MdDelete className="text-gray-600 " size={20} onClick={()=>deleteTransaction(props.id)}/>
    </div>
  )
}

export default SibgleList