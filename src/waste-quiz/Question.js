import React, { Component } from 'react'
import AnswerOption from './AnswerOption'

export default class Question extends Component {
    render() {
  
      const { disabled, buttonValues, handleAnswer } = this.props
  
      return (
        <div>
          {buttonValues.map(
            value => <AnswerOption key={value} disabled={disabled} value={value} handleAnswer={handleAnswer}/>
          )}
        </div>
      )
    }
}
