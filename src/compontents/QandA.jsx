import Answer from "./Answer";

export default function QandA(props){
    return (
        <>
        <h1>{props.question}</h1>
        {
            props.answers.map((el)=><Answer value={el}/>)
        }
        </>
    )
}