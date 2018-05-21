import React, { Component } from 'react'
import AnswerOption from './AnswerOption'
import styled from 'styled-components'

export default class Question extends Component {
    render() {
  
      const { disabled, buttonValues, handleAnswer } = this.props
  
      return (
        <QuestionOptionContainer>
          {buttonValues.map(
            value => <AnswerOption key={value} disabled={disabled} value={value} handleAnswer={handleAnswer}/>
          )}
        </QuestionOptionContainer>
      )
    }
}

const QuestionOptionContainer = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
`

