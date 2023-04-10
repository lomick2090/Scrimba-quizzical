import React from 'react';
import Answer from './Answer'

export default function Question(props) {

    function answerElements() {
        let correctIndex = Math.floor(Math.random() * props.incorrect_answers.length)
        let answerArray = props.incorrect_answers

        answerArray.splice(correctIndex, 0, props.correct_answer)
        let answerElements = []
        for (let i = 0; i < answerArray.length; i++ ) {
            let correct = (i == correctIndex) ? true : false;
            answerElements.push(<Answer className='answer' value={answerArray[i]} key={i} correct={correct} name={props.for} updateAnswer={props.updateAnswer} />)
        }  
        

        return answerElements
    } 
    return (
        <div className='question'>
            <h1>{props.question}</h1>
            <div className="answerdiv">
                {answerElements()}
            </div>
        </div>
    )
}