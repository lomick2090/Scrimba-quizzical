import React from 'react'
import StartPage from './components/StartPage'
import Question from './components/Question'

export default function App() {
    const [started, setStarted] = React.useState(false)
    const [questions, setQuestions] = React.useState([])
    const [userAnswers, setUserAnswers] = React.useState([])

    function initializeQuestions() {
        fetch('https://opentdb.com/api.php?amount=5')
            .then(result => result.json())
            .then(data => {
                let questionData = []
                data.results.forEach(input => {
                    questionData.push({
                        question: (input.question).replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&eacute;/g, 'e').replace(/&pi;/g, 'pi'),
                        incorrect_answers: (input.incorrect_answers.map(answer => answer.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&eacute;/g, 'e').replace(/&pi;/g, 'pi').replace(/&auml;/g, 'a'))),
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
                    
                //     questions.map(input => {
                //         return {
                //             question: input.question,
                //             answer: ''
                //         }
                //     })
                // )
            })
    }

    function updateAnswer(questionAnswered, newUserAnswer) {
        console.log(userAnswers)
        setUserAnswers(prevUserAnswers => {
            console.log(prevUserAnswers)
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


    const questionElements = questions.map(question => {
        return (
            <Question 
                question={question.question} 
                incorrect_answers={question.incorrect_answers} 
                correct_answer={question.correct_answer} 
                key={question.question}
                for={question.question}
                updateAnswer={updateAnswer}
            />
        )

    })

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