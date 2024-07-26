import { nanoid } from "nanoid";
import Answer from "./Answer";
import { useEffect, useState } from "react";

export default function QandA(props) {
    const [answers, setAnswers] = useState(() => allAnswerOptions())
    const [isAnswered, setIsAnswered] = useState(false)
    //see if you can handle this in App.jsx
    function allAnswerOptions() {
        return props.questionData.allAnswers.map((el) => {
            if(el==props.questionData.correctAnswer){
                return { value: el, isSelected: false, isCorrect:true, id: nanoid() }
            }            
            return { value: el, isSelected: false, isCorrect:false, id: nanoid() }
        })
    }
    function select(event) {
        setIsAnswered(true)
        const givenAns = event.target.textContent
        setAnswers(prevAnswers => {
            return prevAnswers.map((ans) => {
                if (ans.value !== givenAns) {
                    ans.isSelected = false
                } else {
                    ans.isSelected = true
                }
                return ans
            })
        })
    }
    useEffect(()=>{
        console.log("Answered a new question",isAnswered);
        if(isAnswered){
            props.setAnswersCount(prev=>{
                console.log("previous answers count ",prev)
                return prev+1
            })
        }        
    },[isAnswered])
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