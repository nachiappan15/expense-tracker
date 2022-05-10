import React from 'react'
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2'
import useTransactions from '../useTransaction'
import {GiMoneyStack,GiExpense} from "react-icons/gi"

const Details = (props) => {
  const { total, chartData } = useTransactions(props.type)
  return (
    <div className = {` h-96 lg:w-1/3  w-4/5 flex flex-col gap-2 rounded-md  ${props.type == "Income"?"bg-green-300":"bg-red-300"}`}>
      <p className='text-2xl font-bold ml-4 flex gap-3 items-center'>

        {props.type} 
        {
          props.type == "Income"?
          <GiMoneyStack size={25}/> :
          <GiExpense size={25}/>
        }
        
      </p>
      <p className='text-lg font-medium ml-10'>

      &#8377;{total}
      </p>


<div className='w-full flex items-center justify-center'>
<Doughnut data={chartData}  />
</div>
     


    </div>
  )
}

export default Details