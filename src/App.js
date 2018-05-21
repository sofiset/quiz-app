import React, { Component } from 'react'
import * as utils  from './waste-quiz/utils'
import Quiz from './waste-quiz/Quiz'
import wasteWizardData from './waste-quiz/wasteWizardData.json'
import dataCoding from './waste-quiz/dataCoding.json'
import styled from 'styled-components';

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
      <AppContainer>

        <Title>wastewizquiz</Title>

        <Quiz
          ref={r => {
            // Keep a reference to <Quiz> component instance so I can call its methods later on.
            this._quiz = r
          }}
          started={quizStarted}
          questions={questions}
          numQuestionsPerRound={this.state.numQuestionsPerRound}
          onDone={this.handleQuizDone}
          roundNumber={roundNumber}
          totalScore={totalScore}
        />

        { quizStarted ? null : <NewRoundButton onClick={this.startNewGame}>Start new round</NewRoundButton> }

      </AppContainer>
    );
  }

  
}

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  color: rgb(52, 61, 70);
  height: 100%;
`

const Title = styled.h1`
  text-decoration: underline;
  text-decoration-color: rgb(52,61,70);;
  font-size: 1.5em;
  color: #ff1919;
  position: fixed;
  top: 0px;
  left: 0px;
  margin: 1%;
`
const NewRoundButton = styled.button`
  margin: 2%;
  padding: 1%;
  background-color: white;
`

export default App;
