import * as utils from './utils'
import { uniq } from 'ramda'
import fixture from './wasteWizardData.json'

describe('waste-quiz/utils', () => {
	describe('getAllUniqueAnswerOptions', () => {
		test('returns unique string options', () => {
			const uniqueAnswerOptions = utils.getAllUniqueAnswerOptions(fixture)
			expect(uniq(uniqueAnswerOptions).length).toEqual(uniqueAnswerOptions.length)
			expect(uniqueAnswerOptions.every(x => typeof x === 'string')).toBe(true)
		})
	})

	describe('createQuestions', () => {
		test('returns correct number of questions and options', () => {
			const uniqueAnswerOptions = utils.getAllUniqueAnswerOptions(fixture)
			const questions = utils.createQuestions({
				uniqueAnswerOptions,
				wasteWizardData: fixture,
				numQuestionsPerRound: 5,
				numOptionsShown: 4
			})
	
			expect(questions.length).toEqual(5)
			expect(questions.map(x => x.answer_options.length)).toEqual([
				4, 4, 4, 4, 4
			])
		})
	})
})

