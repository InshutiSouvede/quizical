import { useState } from 'react'
import './App.css'
import QandA from './compontents/QandA'
import quizData from './data'
function App() {
  const [done,setDone] = useState(false)
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
    setDone(true)
  }
  const qandAs = data.map((data)=><QandA done={done} questionData= {data} />)
  return (
    <div className='flex flex-col w-3/5 p-10 mt-20 m-auto border '>
      {qandAs}
    <button onClick={checkAnswers} className="bg-[#4D5B9E] rounded-lg px-5 py-2 m-auto my-5 text-white font-semibold">Check answers</button>
    </div>
  )
}

export default App
