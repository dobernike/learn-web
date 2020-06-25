const { add, divide, multiply, subtract } = require('./calculator')

/**
 * @file index.js is the root file for this example app
 * @author Paul Fedyshin
 * @see <a href="https://github.com/dobernike">Github</a>
 */

/**
 * Student Name
 * @type {string}
 */
const studentName = 'John Doe'

/**
 * Array of grades
 * @type {Array<number>}
 */
const grades = [98, 96.4, 14, 2]

/**
 * Todo object
 * @type {{id: number|string, text: string}}
 */
const todo = {
    id: '1',
    text: 'Hello'
}

/**
 * Calculate tax
 * @param {number} amount - Total amount
 * @param {number} tax - Tax percentage
 * @returns {string} - Total with a dollar sign
 */
const calculateTax = (amount, tax) => {
    return `$${amount + tax * amount}`
}

/**
 * A student
 * @typedef {Object} Student
 * @property {number} id - Student ID
 * @property {string} name - Student name
 * @property {string|number} [age] - Student age (optional)
 * @property {boolean} isActive - Student is active
 */

/**
 * @type {Student}
 */
const student = {
    id: 1,
    name: 'John Doe',
    age: 20,
    isActive: true
}

/**
 * Class to create a person object
 */
class Person {
    /**
     * 
     * @param {Object} personInfo Information about the person 
     */
    constructor(personInfo) {
        /**
         * @property {string} name Persons name
         */
        this.name = personInfo.name;
        /**
         * @property {string} age Persons age
         */
        this.age = personInfo.age;
    }

    /**
     * @property {Function} greet A greeting with the name and age
     * @returns void
     */
    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age}`)
    }
}

/**
 * See {@link Person}
 */
const person1 = new Person({
    name: 'John Doe',
    age: 30
});

console.log(add(20, 30));
