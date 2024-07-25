import { nanoid } from "nanoid";
import Answer from "./Answer";
import { useEffect, useState } from "react";

export default function QandA(props) {
    const [selectedAnswer, setSelectedAnswer] = useState({id:nanoid(),question:props.questionData.question, givenAnswer:'',correct:false})
    const [answers, setAnswers] = useState(() => allOptions())
    //see if you can handle this in App.jsx
    function allOptions() {
        return props.questionData.allAnswers.map((el) => {
            if(el==props.questionData.correctAnswer){
                return { value: el, isSelected: false, isCorrect:true, id: nanoid() }
            }            
            return { value: el, isSelected: false, isCorrect:false, id: nanoid() }
        })
    }
    function select(event) {
        const ans = event.target.textContent
        setSelectedAnswer(prev=>({...prev,givenAnswer:ans}))
    }
    useEffect(() => {
        console.log("Your answer",selectedAnswer)
        setAnswers(prevAnswers => {
            return prevAnswers.map((ans) => {
                if (ans.value !== selectedAnswer.givenAnswer) {
                    ans.isSelected = false
                } else {
                    ans.isSelected = true
                }
                return ans
            })
        })
        // props.updateResponses(selectedAnswer)
    }, [selectedAnswer])
    return (
        <div className="flex flex-col gap-5 border-b-2 border-b-[#DBDEF0]  py-5">
            <h1 className="font-semibold text-2xl text-[#293264]">{props.questionData.question}</h1>
            <div className="flex gap-5 flex-wrap">
                {
                    answers.map((el) => <Answer key={el.id} done={props.done} isCorrect={el.isCorrect} selected={el.isSelected} value={el.value} handleClick={(event) => select(event)} />)
                }
            </div>

        </div>
    )
}