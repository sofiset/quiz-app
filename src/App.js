import React, { Component } from 'react'
import './App.css'
import * as utils  from './waste-quiz/utils'
import Quiz from './waste-quiz/Quiz'
import wasteWizardData from './waste-quiz/wasteWizardData.json'
import dataCoding from './waste-quiz/dataCoding.json'

const DEFAULT_STATE = {
  numQuestionsPerRound: 10,
  numOptionsShown: 3,
  roundNumber: 1,
  totalScore: 0,
  quizStarted: true,
  shouldShowQuestion: true
}

class App extends Component {
  _quiz = null

  constructor(props) {
    super(props)
    const uniqueAnswerOptions = utils.getAllUniqueAnswerOptions(dataCoding)
    this.state = {
      ...DEFAULT_STATE,
      uniqueAnswerOptions,
      questions: utils.createQuestions({
        uniqueAnswerOptions,
        wasteWizardData,
        dataCoding,
        numOptionsShown: DEFAULT_STATE.numOptionsShown,
        numQuestionsPerRound: DEFAULT_STATE.numQuestionsPerRound
      })
    } 
  }

  componentWillMount() {
    // fetch('....')
      // .then(response => response.json())
      // .then(data => this.setState({ data }))
  }

  handleQuizDone = ({ score }) => {
    this.setState({
      quizStarted: false,
      totalScore: this.state.totalScore + score
    })
  }

  startNewGame = () => {
    const uniqueAnswerOptions = utils.getAllUniqueAnswerOptions(dataCoding)
    this.setState({
      ...DEFAULT_STATE,
      uniqueAnswerOptions,
      questions: utils.createQuestions({
        uniqueAnswerOptions,
        wasteWizardData,
        dataCoding,
        numOptionsShown: DEFAULT_STATE.numOptionsShown,
        numQuestionsPerRound: DEFAULT_STATE.numQuestionsPerRound
      }),
      roundNumber: this.state.roundNumber + 1,
      totalScore: this.state.totalScore
    })
    // Another option to reset, is to programmaticaly call instance method on <Quiz/>
    // This is more dirty.
    if (this._quiz !== null) {
      // this._quiz.reset()
    }
  }

  render() {
    const {
      questions,
      totalScore,
      roundNumber,
      quizStarted
    } = this.state

    return (
      <div className="flex-container">
        <p>round number: {roundNumber}</p>
        <p>total score: {totalScore}</p>
        <hr/>
        <Quiz
          ref={r => {
            // Keep a reference to <Quiz> component instance so I can call its methods later on.
            this._quiz = r
          }}
          started={quizStarted}
          questions={questions}
          numQuestionsPerRound={this.state.numQuestionsPerRound}
          onDone={this.handleQuizDone}
        />

        { quizStarted ? null : <button onClick={this.startNewGame}>Start new round</button> }
      </div>
    );
  }
}


export default App;
