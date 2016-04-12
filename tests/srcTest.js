// import {expect, assert} from 'chai'
import chai from 'chai'
import circulator from '../../src/itemCirculator'

// chai.use(crap)
chai.should() // Needs to call should() to install the object prototype method (or something)

describe('DoACalculation', () => {
	let list = ['one', 'two', 'three']

	it('should pass start of list', () => {
		// console.log(circulator)
		circulator('one', list).should.equal('two')
	})

	it('should pass end of list', () => {
		// console.log(circulator)
		circulator('three', list).should.equal('one')
	})

	it('should pass middle of list', () => {
		// console.log(circulator)
		circulator('two', list).should.equal('three')
	})

	it('should work with small lists', () => {
		// console.log(circulator)
		circulator('two', ['two']).should.equal('two')
	})


})