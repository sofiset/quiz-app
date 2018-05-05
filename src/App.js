import React, { Component } from 'react';
import './App.css';
import wasteWizardData from './swm_waste_wizard_APR.json';

class App extends Component {

  constructor(props) {

    super(props)

    this.handleAnswer = this.handleAnswer.bind(this)
    this.initializeQuestions = this.initializeQuestions.bind(this)
    this.checkIsQuizDone = this.checkIsQuizDone.bind(this)

    this.state = {
      numberOfQuestions: 10,
      currentAnswer: null,
      questions: Array(10).fill(null),
      values: [1, 2, 3],
      currentAnswerStatus: null,
      correctAnswer: 2,
      currentQuestionIndex: 0,
      isQuizDone: "false"
    } 

    this.initializeQuestions()

  }

  componentWillMount() {
    // fetch('....')
      // .then(response => response.json())
      // .then(data => this.setState({ data }))
  }

  render() {
    return (
      <div>
        <h1>{this.state.questions[this.state.currentQuestionIndex]}</h1>
        <h2>{this.state.currentAnswerStatus}</h2>
        <p>Done ? {this.state.isQuizDone}</p>
        <Question buttonValues={this.state.values} handleAnswer={this.handleAnswer}/>
      </div>
    );
  } 

  initializeQuestions() {

    var newQuestions = this.state.questions

    const keys = Object.keys(wasteWizardData)

    newQuestions = newQuestions
      .map(() => {
        return wasteWizardData[getRandomIndex(keys)]
      })
      .map(x => x.title)

    this.state.questions = newQuestions

  }

  handleAnswer(answer) {

    this.setState({ currentAnswer: answer})
    this.setState({ currentAnswerStatus: (answer == this.state.correctAnswer) ? "true" : "false" })
    this.setState({ currentQuestionIndex: this.state.currentQuestionIndex+1 })
    this.setState({ isQuizDone: this.checkIsQuizDone()})
  }

  checkIsQuizDone() {
    return this.state.currentQuestionIndex == this.state.numberOfQuestions -1? "true" : "false"
  }

}

class Question extends Component {

  render() {
    const { buttonValues, handleAnswer, ...rest } = this.props // destructuring
    const newButtonValues = [...buttonValues, {}] // spreading
    return (
      <div>
        <AnswerOption value={this.props.buttonValues[0]} handleAnswer={this.props.handleAnswer}/>
        <AnswerOption value={this.props.buttonValues[1]} handleAnswer={this.props.handleAnswer}/>
        <AnswerOption value={this.props.buttonValues[2]} handleAnswer={this.props.handleAnswer}/>
      </div>
    );
  }

}

class AnswerOption extends Component {
  render() {
    return (
      <button type="radio" onClick={() => this.props.handleAnswer(this.props.value)}>
        {this.props.value}
      </button>
    );
  };
}

function getRandomIndex(arr) {
  // wasteWizardData
  return Math.floor(Math.random() * arr.length)
}

export default App;
