// { wasteWizardData: {}, numOptionsShown: number, uniqueAnswerOptions: Array<{}>, numQuestionsPerRound: number, dataCoding: {} }

export function createQuestions(options) {
    
    const { wasteWizardData, uniqueAnswerOptions, numOptionsShown, numQuestionsPerRound, dataCoding } = options
    let newQuestions = []
    const keys = Object.keys(wasteWizardData)
    const possibleAnswerOptions = uniqueAnswerOptions

    for (let i = 0; i < numQuestionsPerRound; i++) {

        const selectedFeature = wasteWizardData[getRandomIndex(keys)]
        const selectedFeatureAnsId = selectedFeature.DESC_ID
        const selectedFeatureAnsLabel = getLabelFromId(selectedFeatureAnsId, dataCoding)

        newQuestions.push({
          "title" : selectedFeature.TITLE,
          "correct_answer" : selectedFeatureAnsLabel,
          "answer_options" : getAnswerOptionSet(selectedFeatureAnsLabel, possibleAnswerOptions, numOptionsShown)
        })

    }

    return newQuestions
}

export function getLabelFromId(id, labelsByKey) {

  for (let item in labelsByKey) {
    if (labelsByKey[item].id === id) {
      return labelsByKey[item].desc
    }
  }

}


export function getRandomIndex(arr) {
    // wasteWizardData
    return Math.floor(Math.random() * arr.length)
}
  
export function getAllUniqueAnswerOptions(data) {
  
    const options = data
    var lookup = {} 
    var uniqueAnswerOptions = []
  
    for (var option, i = 0; option = options[i++];) {
  
      option = option.desc
  
      // If name isn't in lookup object, add as key
      if (!(option in lookup)) {
        lookup[option] = 1
        // Add to array of unique values
        uniqueAnswerOptions.push(option)
      }
    }
  
    return uniqueAnswerOptions
  
  }
  
export function getAnswerOptionSet(correctAnswer, allUniqueOptions, totalNumOptions) {
  
    const possibleOptions = allUniqueOptions
    let answerOptionSet = [correctAnswer]
    const numUniqueOptions = allUniqueOptions.length

    const newTotalNumOptions = totalNumOptions <= numUniqueOptions ? totalNumOptions : numUniqueOptions
  
    // While we still need other answer options...
    while (answerOptionSet.length < newTotalNumOptions) {
      // Grab random unique description ID
      let index = getRandomIndex(possibleOptions)
      const possibleOption = possibleOptions[index]

      // If not a match, use as incorrect answer options
      if (answerOptionSet.indexOf(possibleOption) === -1) {
        answerOptionSet.push(possibleOption)
      }
    }
  
    // Shuffle answer options and return to initializeQuestions()
    return shuffleOptions(answerOptionSet)
  
  }
  
export function shuffleOptions (originalArray) {
  
    let array = [].concat(originalArray);
    let currentIndex = array.length, temporaryValue, randomIndex;
  
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
