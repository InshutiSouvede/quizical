import { useEffect, useState } from 'react'
import './App.css'
import QandA from './compontents/QandA'
import quizData from './data'
function App() {
  const [done,setDone] = useState(false)
  const [data,setData] = useState([])
  const [started,setStarted] = useState(false)

  function initialData(data){
    return data.results.map((res)=>{      
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
  function startQuiz(){
    setDone(false)
    setStarted(prev=>!prev)
  }
  const qandAs = data.map((data)=><QandA done={done} questionData= {data} />)
  useEffect(()=>{
    async function getData(){
      try {
        const res = await fetch("https://opentdb.com/api.php?amount=5&category=18")
        const data = await res.json()
        console.log("Data from API",data)
        const results = initialData(data)
        console.log("initial data",initialData(data))
        setData(results)
      } catch (error) {
        console.log(error.message)
      }
      
    }
    getData()
  },[])
  return (
    <>
    {!started?(<div className='w-3/5 text-[#293264] gap-5 p-10 m-auto flex flex-col mt-60 items-center'>
      <h1 className=' font-semibold text-3xl'>Quizzical</h1>
      <p>You will be given 5 multiple questions related to computer science</p>
      <button onClick={startQuiz} className="bg-[#4D5B9E] rounded-lg px-5 py-2 m-auto my-5 text-white font-semibold">Start quiz</button>
    </div>):
    <div className='flex flex-col w-3/5 p-10 mt-20 m-auto border '>
      {qandAs}
      <div className="flex justify-between">
      <button onClick={checkAnswers} className="bg-[#4D5B9E] rounded-lg px-5 py-2 m-auto my-5 text-white font-semibold">Check answers</button>
      <button onClick={startQuiz} className="bg-[#a4a5a9] rounded-lg px-5 py-2 m-auto my-5 text-[#4D5B9E] font-semibold">Exit</button>
    
      </div>
    </div>}
    </>
    
  )
}

export default App
