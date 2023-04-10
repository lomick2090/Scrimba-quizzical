import React from "react";

export default function Answer(props) {
    return(
        <div>
            <input type="radio" id={props.value}  value={props.value} name={props.name} />
            <label className='answer' htmlFor={props.value}>{props.value}</label>
        </div>
    )
}