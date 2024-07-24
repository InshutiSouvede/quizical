import { useState } from 'react'
import './App.css'
import QandA from './compontents/QandA'
import Button from './compontents/Button'

function App() {
  const [responses,setResponses] = useState([])
  const question ="How would one say goodbye in Spanish?"
  const answers = ['Adiós','Hola','Au Revoir','Salir'] 
  
  function checkAnswers(){
    console.log("These are the responses you provided:",responses)
    // console.log("You are checking the answers")
  }
  function updateResponses(newResponse){
    setResponses(prevResponses=>{
      let found = false
      const updatedResponse = prevResponses.map((response)=>{
        if(response.id === newResponse.id){
          found = true
          return newResponse
        }
        return response        
      })
        return !found?[...prevResponses,newResponse]:updatedResponse
    })
  }
  return (
    <div className='flex flex-col items-center w-3/5 p-10 mt-20 m-auto border '>
     <QandA question= {question} answers= {answers} updateResponses={updateResponses} />           
     <QandA question= {question} answers= {answers} updateResponses={updateResponses} />           
     <QandA question= {question} answers= {answers} updateResponses={updateResponses} />           
     <button onClick={checkAnswers} className="bg-[#4D5B9E] rounded-lg px-5 py-2 m-auto my-5 text-white font-semibold">Check answers</button>
    </div>
  )
}

export default App
