import React, { Component } from 'react';
import './App.css';
import * as utils  from './waste-quiz/utils'
import wasteWizardData from './waste-quiz/wasteWizardData.json';

const DEFAULT_STATE = {

      numQuestionsPerRound: 10,
      numOptionsShown: 3,
      roundNumber: 1,

      isQuizDone: false,
      currentScore: 0,
      currentAnswer: null,
      currentQuestionIndex: 0,
      currentAnswerStatus: null,

      shouldShowQuestion: true
}

class App extends Component {

  constructor(props) {

    super(props)

    this.checkIsQuizDone = this.checkIsQuizDone.bind(this)
    this.checkAnswer = this.checkAnswer.bind(this)
    this.startNewGame = this.startNewGame.bind(this)

    const uniqueAnswerOptions = utils.getAllUniqueAnswerOptions(wasteWizardData)

    this.state = {
      ...DEFAULT_STATE,
      uniqueAnswerOptions,
      questions: utils.createQuestions({
        uniqueAnswerOptions,
        wasteWizardData,
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

  render() {

    const {
      currentQuestionIndex,
      questions,
      isQuizDone,
      currentAnswerStatus,
      currentScore,
      shouldShowQuestion,
      roundNumber
    } = this.state

    return (
      <div>

        <p>round number: {roundNumber}</p>
        <p>score: {currentScore}</p>

        <h1>{currentQuestionIndex+1}) {questions[currentQuestionIndex].title} </h1>
        <h2>{currentAnswerStatus}</h2>
        
        <p>{isQuizDone ? "Done!" : ""}</p>

        {shouldShowQuestion ? 
          <Question buttonValues={questions[currentQuestionIndex].answer_options}
            handleAnswer={this.handleAnswer} /> : null
        }

        {isQuizDone ?
          <button onClick={this.startNewGame}>Start New Game</button> : null
        }

        <p>correct answer: { questions[currentQuestionIndex].correct_answer}</p>

      </div>
    );
  } 

  startNewGame() {
    const uniqueAnswerOptions = utils.getAllUniqueAnswerOptions(wasteWizardData)
    this.setState({
      ...DEFAULT_STATE,
      uniqueAnswerOptions,
      questions: utils.createQuestions({
        uniqueAnswerOptions,
        wasteWizardData,
        numOptionsShown: DEFAULT_STATE.numOptionsShown,
        numQuestionsPerRound: DEFAULT_STATE.numQuestionsPerRound
      })
    });

  }

  handleAnswer = (answer) => {

    const {
      isQuizDone,
      currentScore,
      currentQuestionIndex,
      numQuestionsPerRound,
      shouldShowQuestion
    } = this.state

    if (isQuizDone) {
      return
    }

    const f = () => {
      console.log(this)
    }

    const isAnswerTrue = this.checkAnswer(answer)

    this.setState({ 
      currentAnswer: answer,
      currentAnswerStatus: isAnswerTrue,
      currentScore: isAnswerTrue ? currentScore+1 : currentScore,
      currentQuestionIndex: currentQuestionIndex !== numQuestionsPerRound-1? currentQuestionIndex+1 : currentQuestionIndex,
      
    })

    if (this.checkIsQuizDone()) {
      this.setState({
        isQuizDone: true,
        shouldShowQuestion: false
      }) 
    }

  }

  checkIsQuizDone() {
    return this.state.currentQuestionIndex === this.state.numQuestionsPerRound-1
  }

  checkAnswer(answer) {
     return answer === this.state.questions[this.state.currentQuestionIndex].correct_answer
  }

}

class Question extends Component {

  render() {

    const { buttonValues, handleAnswer } = this.props

    return (
      <div>
        <AnswerOption value={buttonValues[0]} handleAnswer={handleAnswer}/>
        <AnswerOption value={buttonValues[1]} handleAnswer={handleAnswer}/>
        <AnswerOption value={buttonValues[2]} handleAnswer={handleAnswer}/>
      </div>
    );
  }
}

function AnswerOption(props){
  return (
    <button type="radio" onClick={() => props.handleAnswer(props.value)}>
      {props.value}
    </button>
  );
}


export default App;
