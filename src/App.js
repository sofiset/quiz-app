import React, { Component } from 'react';
import './App.css';
import wasteWizardData from './wasteWizardData.json';

class App extends Component {

  constructor(props) {

    super(props)

    this.handleAnswer = this.handleAnswer.bind(this)
    this.initializeQuestions = this.initializeQuestions.bind(this)
    this.checkIsQuizDone = this.checkIsQuizDone.bind(this)
    this.checkAnswer = this.checkAnswer.bind(this)

    const uniqueAnswerOptions = getAllUniqueAnswerOptions(wasteWizardData)

    this.state = {

      numQuestionsPerRound: 10,
      numOptionsShown: 3,
      questions: [],

      isQuizDone: false,
      currentScore: 0,

      currentAnswer: null,
      currentQuestionIndex: 0,
      currentAnswerStatus: null
      
    } 

    this.initializeQuestions(uniqueAnswerOptions)

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
      currentScore
    } = this.state

    return (
      <div>
        <h1>{currentQuestionIndex+1}) {questions[currentQuestionIndex].title} </h1>
        <p>correct answer: { questions[currentQuestionIndex].correct_answer || null }</p>
        <h2>{currentAnswerStatus}</h2>
        <p>score: {currentScore}</p>
        <p>{isQuizDone ? "Done!" : ""}</p>
        <Question buttonValues={questions[currentQuestionIndex].answer_options} handleAnswer={this.handleAnswer} />
      </div>
    );
  } 

  initializeQuestions(uniqueAnswerOptions) {

    let newQuestions = []
    const keys = Object.keys(wasteWizardData)
    const possibleAnswerOptions = uniqueAnswerOptions

    for (let i = 0; i < this.state.numQuestionsPerRound; i++) {

      let question = wasteWizardData[getRandomIndex(keys)]

      newQuestions.push({
        "title" : question.TITLE,
        "correct_answer" : question.DESC_ID,
        "answer_options" : getAnswerOptionSet(question.DESC_ID, possibleAnswerOptions, this.state.numOptionsShown)

        /*"answer_options" : [
          question.DESC_ID,
          wasteWizardData[getRandomIndex(keys)].DESC_ID,
          wasteWizardData[getRandomIndex(keys)].DESC_ID
        ]*/

      })

    }

    this.state.questions = newQuestions
    // this.setState((state) => ({questions: newQuestions}))

  }

  handleAnswer(answer) {

    if (this.checkIsQuizDone()) {
      this.setState({isQuizDone: true})
      return
    }

    const isAnswerTrue = this.checkAnswer(answer)

    this.setState({ 
      currentAnswer: answer,
      currentAnswerStatus: isAnswerTrue,
      currentScore: isAnswerTrue ? this.state.currentScore+1 : this.state.currentScore,
      currentQuestionIndex: this.state.currentQuestionIndex+1
    })

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

    const { buttonValues, handleAnswer } = this.props // destructuring

    return (
      <div>
        <AnswerOption value={buttonValues[0]} handleAnswer={handleAnswer}/>
        <AnswerOption value={buttonValues[1]} handleAnswer={handleAnswer}/>
        <AnswerOption value={buttonValues[2]} handleAnswer={handleAnswer}/>
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

function getAllUniqueAnswerOptions(data) {

  const items = data
  var lookup = {} 
  var uniqueAnswerOptions = []

  for (var item, i = 0; item = items[i++];) {

    var name = item.DESC_ID

    if (!(name in lookup)) {
      lookup[name] = 1
      uniqueAnswerOptions.push(name)
    }
  }

  return uniqueAnswerOptions

}

function getAnswerOptionSet(correctAnswer, allUniqueOptions, totalNumOptions) {

  const possibleOptions = allUniqueOptions
  let answerOptionSet = [correctAnswer]

  while (answerOptionSet.length < totalNumOptions) {
    let index = getRandomIndex(possibleOptions)
    if (possibleOptions[index] !== correctAnswer) {
      answerOptionSet.push(possibleOptions[index])
    }
  }

  return shuffleOptions(answerOptionSet)

}

function shuffleOptions (originalArray) {

  var array = [].concat(originalArray);
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default App;
