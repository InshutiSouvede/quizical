import Answer from "./Answer";

export default function QandA(props) {
    return (
        <div className="flex flex-col gap-5 border-b-2 border-b-[#DBDEF0]  py-5">
            <h1 className="font-semibold text-2xl text-[#293264]">{props.questionData.question}</h1>
            <div className="flex gap-5 flex-wrap">
                {
                    props.questionData.allAnswers.map((el) => <Answer key={el.id} done={props.done} isCorrect={el.isCorrect} selected={el.isSelected} value={el.value} handleClick={(event) => props.updateQuestionData(props.questionData.id,el.value)} />)
                }
            </div>

        </div>
    )
}