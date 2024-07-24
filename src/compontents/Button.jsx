import { Children } from "react";

export default function Button(props){
    console.log(Children)
    return <button className="bg-[#4D5B9E] rounded-lg px-5 py-2 m-auto my-5 text-white font-semibold">{props.value}</button>
}