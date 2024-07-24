import { useState } from 'react'
import './App.css'
import QandA from './compontents/QandA'
import Button from './compontents/Button'
import quizData from './data'
function App() {
  const [responses,setResponses] = useState([])
  const [markedData,setMarkedData] = useState([])
  const [data,setData] = useState(()=>initialData())

  console.log("This is what you start with",data)

  function initialData(){
    return quizData.results.map((res)=>{      
      const index = Math.floor(Math.random()*3)
      const correctAnswer = res.correct_answer

      const all_answers = [...res.incorrect_answers]
      all_answers.splice(index,0,correctAnswer)

      return {question:res.question,correctAnswer:correctAnswer,allAnswers: all_answers }
    })
  }

  function checkAnswers(){
    // The order of response array is the same order questions were given
    let nailedIt = false
    const correctedResponse = responses.map((response,i)=>{
      if(response.givenAnswer === data[i].correctAnswer){
        nailedIt = true
        return {...response,correct:true}
      }
      return response  
    })
    console.log("These are the responses you provided:",correctedResponse)
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
  const qandAs = data.map((data)=><QandA question= {data.question} answers= {data.allAnswers} updateResponses={updateResponses} />)
  return (
    <div className='flex flex-col w-3/5 p-10 mt-20 m-auto border '>
      {qandAs}
    <button onClick={checkAnswers} className="bg-[#4D5B9E] rounded-lg px-5 py-2 m-auto my-5 text-white font-semibold">Check answers</button>
    </div>
  )
}

export default App
