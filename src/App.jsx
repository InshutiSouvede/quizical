import { useEffect, useState } from 'react'
import './App.css'
import QandA from './compontents/QandA'
import { nanoid } from 'nanoid'
function App() {
  const [done, setDone] = useState(false)
  const [quizData, setQuizData] = useState([])
  const [loading, setLoading] = useState(true)
  const [started, setStarted] = useState(false)
  const [getNewQuiz, setGetNewQuiz] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [answersCount, setAnswersCount] = useState(0)

  const [answeredQuestions, setAnsweredQuestions] = useState({})

  function initialData(data) {
    return data.results.map((res) => {
      const index = Math.floor(Math.random() * 3)
      const correctAnswer = res.correct_answer

      const all_answers = [...res.incorrect_answers]
      all_answers.splice(index, 0, correctAnswer)
      const formatedAnswers = all_answers.map((el)=>{
        if(el==correctAnswer){
          return { value: el, isSelected: false, isCorrect:true, id: nanoid() }
        }            
        return { value: el, isSelected: false, isCorrect:false, id: nanoid() }
      })
      return {id:nanoid(), question: res.question, correctAnswer: correctAnswer, allAnswers: formatedAnswers,questionAnswered:false }
    })
  }
  
  function checkAnswers() {
    setDone(prev => !prev)
  }
  function startQuiz() {
    setDone(false)
    setStarted(true)
    setAnswersCount(0)
    setAnsweredQuestions({})
    setButtonDisabled(true)
    setLoading(true)
  }
  function exitQuiz() {
    setDone(false)
    setStarted(false)
  }
  function newQuiz() {
    setGetNewQuiz(prev=>!prev)
    setDone(false)
    setStarted(true)
    setAnswersCount(0)
    setAnsweredQuestions({})
    setButtonDisabled(true)
    setLoading(true)
  }
  function updateQuestionData(id,givenAns){
    if(!answeredQuestions[id]){
      setAnswersCount(prev=>prev+1)
      setAnsweredQuestions(prev=>({...prev,[id]:1}))
      if(answersCount===4){
        setButtonDisabled(false)
      }
    }
    setQuizData(prev=>{
      
      return prev.map((el)=>{
        
        if(el.id==id){
          
          if(!el.questionAnswered){
            el.questionAnswered = true            
          }
          el.allAnswers = el.allAnswers.map((ans) => {
            if (ans.value !== givenAns) {
                ans.isSelected = false
            } else {
                ans.isSelected = true
            }
            return ans
        })
        }
        return el
      })
    })
  }
  useEffect(() => {
    const controller = new AbortController();
    async function getData() {
      try {
        const res = await fetch("https://opentdb.com/api.php?amount=5&category=18",{signal:controller.signal})
        const data = await res.json()
        const results = initialData(data)
        console.log("initial data", initialData(data))
        setQuizData(results)
        setLoading(false)
      } catch (error) {
        console.log(error.message)
        setLoading(false)
      }

    }
    if (started) {
      getData()
    }
    return () => {
      controller.abort()
      setQuizData([])
    }
  }, [started, getNewQuiz])

  const qandAs = quizData.map((data) => <QandA key = {data.id}  setAnswersCount={setAnswersCount} done={done} questionData={data} updateQuestionData={updateQuestionData} />)

  return (
    <>
      {!started ? (<div className='w-3/5 text-[#293264] gap-5 p-10 m-auto flex flex-col mt-60 items-center'>
        <h1 className=' font-semibold text-3xl'>Quizzical</h1>
        <p>You will be given 5 multiple questions related to computer science</p>
        <button onClick={startQuiz} className="bg-[#4D5B9E] rounded-lg px-5 py-2 m-auto my-5 text-white font-semibold">Start quiz</button>
      </div>) :
        <div className='flex flex-col w-3/5 p-10 mt-20 m-auto border '>
          {loading&&<h3 className='text-3xl font-semibold text-[#293264]'>Loading ...</h3>}
          {qandAs}
          <div className="flex justify-between">



            <button disabled={buttonDisabled} onClick={checkAnswers}
              className={`${buttonDisabled ? "bg-slate-300" : "bg-[#4D5B9E]"} rounded-lg px-5 py-2 m-auto my-5 text-white font-semibold`}
            >{done ? "Repeat Quiz" : "Check answers"}</button>

            {done && <button onClick={newQuiz}
              className="border-2 rounded-lg px-5 py-2 m-auto my-5 text-[#4D5B9E] font-semibold"
            >NewQuiz</button>}

            <button onClick={exitQuiz} className="border-2 rounded-lg px-5 py-2 m-auto my-5 text-[#4D5B9E] font-semibold">Exit</button>

          </div>
        </div>}
    </>

  )
}

export default App
