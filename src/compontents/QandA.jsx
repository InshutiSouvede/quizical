import { nanoid } from "nanoid";
import Answer from "./Answer";

export default function QandA(props){
    return (
        <div className="flex flex-col gap-5 border-b-2 border-b-[#DBDEF0] py-5">
        <h1 className="font-semibold text-2xl text-[#293264]">{props.question}</h1>
        <div className="flex gap-5">
        {
            props.answers.map((el)=><Answer key={nanoid()} value={el}/>)
        }
        </div>
        
        </div>
    )
}