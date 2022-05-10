import React , {useContext} from 'react'
import SibgleList from './SibgleList'

import {ExpenseTrackerContext} from "../context/context"


const Feeds = () => {
 
  const{ transactions} = useContext(ExpenseTrackerContext)
  return (
    <div className='h-32 w-full px-2 bg-white overflow-scroll '>
        {/* <SibgleList/>
        <SibgleList/>
         <SibgleList/>  */}
         {
           transactions.map(i=> {
             return <>
             <SibgleList id={i.id} type = {i.type} category ={i.category} amount = {i.amount} date = {i.date}/>
             </>
           })
         }
    </div>
  )
}

export default Feeds