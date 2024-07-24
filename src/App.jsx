import { useState } from 'react'
import './App.css'
import QandA from './compontents/QandA'
import Button from './compontents/Button'

function App() {

  const question ="How would one say goodbye in Spanish?"
  const answers = ['Adiós','Hola','Au Revoir','Salir'] 
  return (
    <div className='flex flex-col items-center w-3/5 p-10 mt-20 m-auto border '>
     <QandA question= {question} answers= {answers} />      
     <QandA question= {question} answers= {answers} />      
     <QandA question= {question} answers= {answers} />      
      <Button value ="Check answers" />  
    </div>
  )
}

export default App
