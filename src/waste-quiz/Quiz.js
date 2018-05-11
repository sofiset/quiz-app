import React, { Component } from 'react'
import Question from './Question'

const DEFAULT_STATE = {
    currentQuestionIndex: 0,
    currentAnswerStatus: null,
    numCorrectAnswers: 0
}
  
export default class Quiz extends Component {
    // class properties
    state = {
        ...DEFAULT_STATE
    }

    componentWillReceiveProps(nextProps) {
        const didGameJustStart = nextProps.started && !this.props.started
        if (didGameJustStart) {
            this.reset()
        }
    }

    // Alternate way to reset state, maybe from a ref="...".
    reset = () => {
        this.setState({ ...DEFAULT_STATE })
    }

    handleAnswer = (answer) => {
        const {
            numQuestionsPerRound
        } = this.props
        const {
          currentQuestionIndex,
          numCorrectAnswers
        } = this.state
    
        const isAnswerTrue = this.checkAnswer(answer)
        const newNumCorrectAnswers = isAnswerTrue ? numCorrectAnswers + 1 : numCorrectAnswers
    
        this.setState({ 
          currentAnswer: answer,
          currentAnswerStatus: isAnswerTrue,
          numCorrectAnswers: newNumCorrectAnswers,
          currentQuestionIndex: currentQuestionIndex !== numQuestionsPerRound-1? currentQuestionIndex+1 : currentQuestionIndex,
        })
    
        if (this.checkIsQuizDone()) {
          this.props.onDone({
            score: newNumCorrectAnswers
          })
        }
    }


    checkIsQuizDone() {
        return this.state.currentQuestionIndex === this.props.numQuestionsPerRound - 1
    }

    checkAnswer(answer) {
        return answer === this.props.questions[this.state.currentQuestionIndex].correct_answer
    }


    render() {
        const { questions, started } = this.props
        const {
            currentQuestionIndex,
            currentAnswerStatus,
            numCorrectAnswers,
        } = this.state
        return (
            <div>
                <h1>{currentQuestionIndex+1}) {questions[currentQuestionIndex].title} </h1>
                <h2>{currentAnswerStatus}</h2>
                
                <Question
                    disabled={!started} 
                    buttonValues={questions[currentQuestionIndex].answer_options}
                    handleAnswer={this.handleAnswer}
                /> 

                <p>current score: {numCorrectAnswers}</p>
                <p>correct answer: { questions[currentQuestionIndex].correct_answer}</p>
            </div>
        )
    }
}

