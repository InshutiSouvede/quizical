import { useState } from 'react'
import './App.css'
import QandA from './compontents/QandA'
import Button from './compontents/Button'

function App() {
  const [responses,setResponses] = useState([])
  const question ="How would one say goodbye in Spanish?"
  const answers = ['Adiós','Hola','Au Revoir','Salir'] 
  
  function checkAnswers(){
    console.log("You are checking the answers")
  }
  function updateResponses(question,ans){
    setResponses(prevResponses=>{
      return prevResponses.map((response)=>{
        if(response){}
      })
    })
    
    console.log("You are trying to update responses",question,ans)
  }
  return (
    <div className='flex flex-col items-center w-3/5 p-10 mt-20 m-auto border '>
     <QandA question= {question} answers= {answers} updateResponses={updateResponses} />           
     <button onClick={checkAnswers} className="bg-[#4D5B9E] rounded-lg px-5 py-2 m-auto my-5 text-white font-semibold">Check answers</button>
    </div>
  )
}

export default App
