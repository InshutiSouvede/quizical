export default function Answer(props){
    return (
        <div className={`w-max rounded-lg  ${props.done&&props.isCorrect?"bg-green-400":props.done&&props.selected?"bg-red-300":props.selected?"bg-[#D6DBF5]":"border border-[#4D5B9E]"}`}>
            <button onClick={props.handleClick} className="text-[#293264] px-5 ">{props.value}</button>
        </div>
    )
}