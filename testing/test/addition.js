import test from 'ava'
import { sum } from '../library.js'

test('Sum of 1 and 2 should return 3', t=>{
	const actualResult = sum(1, 2)
	const expectedResult = 3
	t.is(actualResult, expectedResult)
})

test('Sum of 2 and 2 should return 4', t=>{
	const actualResult = sum(2, 2)
	const expectedResult = 4
	t.is(actualResult, expectedResult)
})