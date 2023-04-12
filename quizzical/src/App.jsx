import React from 'react'
import StartPage from './components/StartPage'
import Question from './components/Question'
import Answer from './components/Answer'
import he from 'he'
import Confetti from 'react-confetti'

export default function App() {
    const [started, setStarted] = React.useState(false)
    const [questions, setQuestions] = React.useState([])
    const [finished, setFinished] = React.useState(false)
    const [correct, setCorrect] = React.useState(0)

    async function initializeQuestions() {

        const result = await fetch('https://opentdb.com/api.php?amount=5')
        const data = await result.json()
        

        //let questionData = []
        const questionData = await data.results.map(input => {

            //create answer array with correct answer here so that on re-renders the order stays the same 
            let correctIndex = Math.floor(Math.random() * input.incorrect_answers.length)
            let answerArrayCopy = input.incorrect_answers.slice()
            answerArrayCopy.splice(correctIndex, 0, input.correct_answer);
            return ({

                //using he package to decode the HTML entities
                question: he.decode(input.question),
                answers: answerArrayCopy.map(answer => he.decode(answer)),
                correct_answer: he.decode(input.correct_answer),
                selected_answer: null
            }) 
        })

        setQuestions(questionData);
    }
   
    const questionElements = questions.map(question => {
        let answerElements = []
        
        for (let j = 0; j < question.answers.length; j++ ) {
            let selected = (question.selected_answer == question.answers[j]) ? true : false;
            let correct = (question.correct_answer == question.answers[j]) ? true : false;
            answerElements.push(
                <Answer 
                    className='answer' 
                    value={question.answers[j]} 
                    key={j}  
                    question={question.question} 
                    updateAnswer={updateAnswer} 
                    selected={selected}
                    correct={correct}
                    finished={finished}
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


    
    function updateAnswer(questionAnswered, newUserAnswer) {
        setQuestions(prevQuestions => {
            return prevQuestions.map(question => {
                if (question.question == questionAnswered) {
                    return {
                        ...question,
                        selected_answer: newUserAnswer
                    }
                } else {
                    return {
                        ...question
                    }
                }
            })
        })
    }

    function checkAnswers(event) {
        event.preventDefault()
        let correctNumber = 0;
        questions.map(question => {
            if (question.correct_answer == question.selected_answer) {
                correctNumber++
            }
        })
        setCorrect(correctNumber);
        setFinished(true);
    }

    function resetGame() {
        initializeQuestions();
        setFinished(false);
        setCorrect(0);
    }

    function startGame() {
        setStarted(true);
        initializeQuestions();
    }

    return (
        <div className={`main ${(started ? 'quizpage' : 'startpage')}`}>
            <img src='./background.png' className='bg' /> 
            {(correct == 5) && <Confetti />}
            
            {
                (started) ? 
                    <form>
                        {questionElements} 
                        <div className="buttondiv">
                            {
                                (finished) ? 
                                <div className='buttondiv'>
                                    <p>You scored {correct}/5 correct answers</p> 
                                    <button onClick={resetGame} className='submit'>
                                        Play Again
                                    </button>
                                </div>
                                :
                                <button className='submit' onClick={checkAnswers}>
                                    Check Answers
                                </button>
                            }
                        </div>
                    </form>
                    :
                    <StartPage 
                        startGame={startGame} 
                    /> 
            }

        </div>
    )
}