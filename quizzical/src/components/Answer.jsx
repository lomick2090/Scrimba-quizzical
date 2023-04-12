import React from "react";

export default function Answer(props) {
    return(
         <div 
            onClick={() => props.updateAnswer(props.question, props.value)} 
        >
            <input 
                type="radio"
                id={props.question + props.value}  
                value={props.value} 
                name={props.question} 
            />

            <label 
                className={
                    `answer 
                    ${(props.selected && !props.finished) ? 'selected' : ''} 
                    ${(props.finished && props.correct) ? 'finishedcorrect' : ''}
                    ${(props.finished && props.selected) ? 'finishedselected' : ''}`
                } 
                htmlFor={props.question + props.value}
            >
                {props.value}
            </label>
        </div>
    )
}