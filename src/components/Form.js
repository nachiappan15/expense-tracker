import React, { useState, useContext, useEffect } from 'react'
import { ExpenseTrackerContext } from '../context/context'
import { v4 as uuidv4 } from "uuid"

import { useSpeechContext } from '@speechly/react-client'


import formatDate from '../utils/formatDate'
import { incomeCategories, expenseCategories } from "../constants/categories"
const initialState = {
    amount: "",
    category: "",
    type: "income",
    date: formatDate(new Date()),

}


const Form = () => {
    const [formData, setFormData] = useState(initialState)
    const { addTransaction } = useContext(ExpenseTrackerContext)
    const { segment } = useSpeechContext();


    //    use effect
    useEffect(() => {
        const textToValue = () =>{
           
            if (segment) {
                if (segment.intent.intent === 'add_expense') {
                    setFormData({ ...formData, type: 'Expense' });
                } else if (segment.intent.intent === 'add_income') {
                    setFormData({ ...formData, type: 'Income' });
                } else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
                    return createTransaction();
                } else if (segment.isFinal && segment.intent.intent === 'cancel_transaction') {
                    return setFormData(initialState);
                }
    
                segment.entities.forEach((s) => {
                    const category = `${s.value.charAt(0)}${s.value.slice(1).toLowerCase()}`;
    
                    switch (s.type) {
                        case 'amount':
                            setFormData({ ...formData, amount: s.value });
                            break;
                        case 'category':
                            if (incomeCategories.map((iC) => iC.type).includes(category)) {
                                setFormData({ ...formData, type: 'Income', category });
                            } else if (expenseCategories.map((iC) => iC.type).includes(category)) {
                                setFormData({ ...formData, type: 'Expense', category });
                            }
                            break;
                        case 'date':
                            setFormData({ ...formData, date: s.value });
                            break;
                        default:
                            break;
                    }
                });
    
                // if (segment.isFinal && formData.amount && formData.category && formData.type && formData.date) {
                //     console.log("Submit");
                //     createTransaction();
                // }
            }
        }
     textToValue()
    }, [segment]);

    const createTransaction = () => {
        if (Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return;

    if (incomeCategories.map((iC) => iC.type).includes(formData.category)) {
      setFormData({ ...formData, type: 'Income' });
    } else if (expenseCategories.map((iC) => iC.type).includes(formData.category)) {
      setFormData({ ...formData, type: 'Expense' });
    }

    addTransaction({ ...formData, amount: Number(formData.amount), id: uuidv4() });
    setFormData(initialState);
    }

    const selectedCategories = formData.type == "Income" ? incomeCategories : expenseCategories


    return (
        <form className='h-auto w-full px-2 flex flex-col gap-2'>
            <span className='text-sm font-medium text-speech'>
                <>
                    {segment ?
                        segment.words.map(w => w.value).join(" ")
                        : null
                    }
                </>
                
            </span>
            <div className='flex flex-col gap-1'>
                <label>
                    Type
                </label>
                <select className='w-full py-1 rounded-md cursor-pointer outline-none ' value={formData.type} onChange={(e) => { setFormData({ ...formData, type: e.target.value }) }}>
                    <option value="default">--choose--</option>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>

                </select>
            </div>
            <div className='flex flex-col gap-1'>
                <label>
                    Category
                </label>
                <select className='w-full py-1 rounded-md cursor-pointer outline-none ' value={formData.category} onChange={(e) => { setFormData({ ...formData, category: e.target.value }) }}>

                    {
                        selectedCategories.map(i => {
                            return <>
                                <option value={i.type}>{i.type}</option>
                            </>
                        })
                    }

                </select>
            </div>
            <div className='flex flex-col gap-1'>
                <label>
                    Amount
                </label>
                <input type="text" name="amount" placeholder='&#8377;0' className='outline-none py-1 px-2 rounded-md' value={formData.amount} onChange={(e) => { setFormData({ ...formData, amount: e.target.value }) }} />
            </div>
            <div className='flex flex-col gap-1'>
                <label>
                    Date
                </label>
                <input type="date" name="descrp" placeholder='What For?' className='outline-none py-1 px-2 rounded-md' value={formData.date} onChange={(e) => { setFormData({ ...formData, date: formatDate(e.target.value) }) }} />
            </div>
            <button className='w-full  py-1 rounded-lg border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white' type='button' onClick={createTransaction} >Submit</button>
        </form>
    )
}

export default Form