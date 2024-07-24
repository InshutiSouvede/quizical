export default function Answer(props){
    return (
        <div className={`w-max rounded-lg ${props.selected?"bg-[#D6DBF5]":"border border-[#4D5B9E]"}`}>
            <button onClick={props.handleClick} className="min-w-24 text-[#293264] ">{props.value}</button>
        </div>
    )
}