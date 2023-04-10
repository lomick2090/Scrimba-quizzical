import React from 'react'

export default function StartPage(props) {
    return (
        <div className="startpage">
            <h1>
                Quizzical
            </h1>
            <button onClick={props.startGame}>
                Start Game!
            </button>
        </div>
    )
}