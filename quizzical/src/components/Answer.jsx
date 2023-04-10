import React from "react";

export default function Answer(props) {
    return(
        <button className="answer">
            {props.value}
        </button>
    )
}