import React from 'react'
import StartPage from './components/StartPage'
import Question from './components/Question'
import Answer from './components/Answer'

export default function App() {
    const [started, setStarted] = React.useState(false)
    const [questions, setQuestions] = React.useState([])
    const [userAnswers, setUserAnswers] = React.useState([])
    const [questionElements, setQuestionElements] = React.useState([])

    async function initializeQuestions() {

        const result = await fetch('https://opentdb.com/api.php?amount=5')
        const data = await result.json()
        
       
        //let questionData = []
        const questionData = await data.results.map(input => {
            return ({
                question: (input.question).replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&eacute;/g, 'e').replace(/&pi;/g, 'pi').replace(/&amp;/, '&'),
                incorrect_answers: (input.incorrect_answers.map(answer => answer.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&eacute;/g, 'e').replace(/&pi;/g, 'pi').replace(/&auml;/g, 'a').replace(/&amp;/, '&'))),
                correct_answer: (input.correct_answer).replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&eacute;/g, 'e').replace(/&pi;/g, 'pi').replace(/&auml;/g, 'a')
            }) 
        })
        setQuestions(questionData);
        
        
        setUserAnswers(() => {
            let newUserAnswers = [];
            questionData.map(input => {
                newUserAnswers.push({
                    question: input.question,
                    answer: ''
                })
            })
            return newUserAnswers
        })

        setQuestionElements(() => {
            return questionData.map(question => {
                let answerElements = []
    
                let correctIndex = Math.floor(Math.random() * question.incorrect_answers.length)
    
                let answerArrayCopy = question.incorrect_answers.slice()
    
                answerArrayCopy.splice(correctIndex, 0, question.correct_answer);
                
                
                for (let j = 0; j < answerArrayCopy.length; j++ ) {
                    let correct = (j == correctIndex) ? true : false;
                    answerElements.push(
                        <Answer 
                            className='answer' 
                            value={answerArrayCopy[j]} 
                            key={j} 
                            correct={correct} 
                            name={question.question} 
                            updateAnswer={updateAnswer} 
                        />
                    )
                }

                return (
                    <Question 
                        question={question.question} 
                        key={question.question}
                        answerElements={answerElements}
                    />
                )
            })
        })
    }
    

    function updateAnswer(event, questionAnswered, newUserAnswer) {
        console.log(userAnswers)
        setUserAnswers(prevUserAnswers => {
            prevUserAnswers.map(singleUserAnswer => {
                if (singleUserAnswer.question == questionAnswered) {
                    return {
                        ...singleUserAnswer,
                        answer: newUserAnswer
                    }
                } else {
                    return singleUserAnswer
                }
            })
        })

    }

    function checkAnswers(event) {
        event.preventDefault()
        console.log(event)
    }


    

    function startGame() {
        setStarted(true);
        initializeQuestions();
    }

    return (
        <div className={`main ${(started ? 'quizpage' : 'startpage')}`}>
            <img src='./background.png' className='bg' /> 
            
            
            {
                (started) ? 
                    <form>
                        {questionElements} 
                        <div className="buttondiv"><button className='submit' onClick={checkAnswers}>check answers</button></div>
                    </form>
                    :
                    <StartPage 
                        startGame={startGame} 
                    /> 
            }

        </div>
    )
}