import React from 'react';

export default function Question(props) {
    return (
        <div className='question'>
            <h1>{props.question}</h1>
            <div className="answerdiv">
                {props.answerElements}
            </div>
        </div>
    )
}