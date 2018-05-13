import React from 'react'

export default function AnswerOption(props) {
    return (
      <button className="answer-button" disabled={props.disabled} type="radio" onClick={() => props.handleAnswer(props.value)}>
        {props.value}
      </button>
    )
}


