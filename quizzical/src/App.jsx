import React from 'react'
import StartPage from './components/StartPage'
import Question from './components/Question'
import Answer from './components/Answer'
import he from 'he'

export default function App() {
    const [started, setStarted] = React.useState(false)
    const [questions, setQuestions] = React.useState([])

    async function initializeQuestions() {

        const result = await fetch('https://opentdb.com/api.php?amount=5')
        const data = await result.json()
        

        //let questionData = []
        const questionData = await data.results.map(input => {
            let correctIndex = Math.floor(Math.random() * input.incorrect_answers.length)
            let answerArrayCopy = input.incorrect_answers.slice()
            answerArrayCopy.splice(correctIndex, 0, input.correct_answer);
            return ({
                question: he.decode(input.question),
                answers: answerArrayCopy.map(answer => he.decode(answer)),
                correct_answer: he.decode(input.correct_answer),
                selected_answer: null
                // question: (input.question).replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&eacute;/g, 'e').replace(/&pi;/g, 'pi').replace(/&amp;/, '&'),
                // answers: (answerArrayCopy.map(answer => answer.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&eacute;/g, 'e').replace(/&pi;/g, 'pi').replace(/&auml;/g, 'a').replace(/&amp;/, '&'))),
                // correct_answer: (input.correct_answer).replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&eacute;/g, 'e').replace(/&pi;/g, 'pi').replace(/&auml;/g, 'a').replace(/&amp;/, '&'),replace,
                // selected_answer: false
            }) 
        })

        setQuestions(questionData);
    }

    function checkAnswers(event) {
        event.preventDefault()
        console.log(questions)
        let correctNumber = 0;
        questions.map(question => {
            if (question.correct_answer == question.selected_answer) {
                correctNumber++
            }
        })
        console.log(correctNumber)
    }

     
    const questionElements = questions.map(question => {
        let answerElements = []
        
        for (let j = 0; j < question.answers.length; j++ ) {
            let selected = (question.selected_answer == question.answers[j]) ? true : false;
            answerElements.push(
                <Answer 
                    className='answer' 
                    value={question.answers[j]} 
                    key={j}  
                    question={question.question} 
                    updateAnswer={updateAnswer} 
                    selected={selected}
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
        console.log(questions)
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