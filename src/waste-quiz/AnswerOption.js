import React from 'react'
import styled from 'styled-components'

export default function AnswerOption(props) {
    return (
      <AnswerOptionButton disabled={props.disabled} type="radio" onClick={() => props.handleAnswer(props.value)}>
        {props.value}
      </AnswerOptionButton>
    )
}

const AnswerOptionButton = styled.button`
  padding: 1vh 1vw;
  display: block;
  border: 1px solid #999ea2;
  margin: 5px auto;
  background-color: #FDFDFD; 
  border-radius: 10px;
  font-size: 1.5em;
  width: 100%;
  max-width: 500px;
  min-width: 250px;
`


