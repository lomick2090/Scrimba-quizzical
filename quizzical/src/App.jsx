import React from 'react'
import StartPage from './components/StartPage'
import Question from './components/Question'

export default function App() {
    const [started, setStarted] = React.useState(false)
    const [questions, setQuestions] = React.useState([])

    function initializeQuestions() {
        fetch('https://opentdb.com/api.php?amount=5')
            .then(result => result.json())
            .then(data => {
                let questionData = []
                data.results.forEach(input => {
                    questionData.push({
                        question: (input.question).replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&eacute;/g, 'e').replace(/&pi;/g, 'pi'),
                        incorrect_answers: (input.incorrect_answers.map(answer => answer.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&eacute;/g, 'e').replace(/&pi;/g, 'pi'))),
                        correct_answer: (input.correct_answer).replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&eacute;/g, 'e').replace(/&pi;/g, 'pi')
                    }) 
                })
                setQuestions(questionData);
            })
    }


    const questionElements = questions.map(question => {
        return (
            <Question question={question.question} incorrect_answers={question.incorrect_answers} correct_answer={question.correct_answer} key={question.question}/>
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
                    questionElements 
                    :
                    <StartPage 
                        startGame={startGame} 
                    /> 
            }

        </div>
    )
}