// spread operator => use in arrays and objects
// rest operator => use in function parameters

// default parameters => use in function parameters

// ternary operator => use in conditional statements
// syntax: condition ? valueIfTrue : valueIfFalse

// optional chaining => use in objects and arrays. it allows you to access properties of an object that may be null or undefined without throwing an error
// syntax: object?.property
// syntax: array?.[index]

// nullish coalescing operator => use in conditional statements. it checks for null or undefined values and returns a default value if the value is null or undefined
// syntax: value ?? defaultValue

// array methods
// forEach => use to iterate over an array and perform a function on each element
// syntax: array.forEach((element) => { /* code */ });
// map => use to create a new array by performing a function on each element of an existing array
// syntax: array.map((element) => { /* code */ });
// filter => use to create a new array with all elements that pass a test implemented by the provided function
// syntax: array.filter((element) => { /* code */ });
// find => use to return the first element in an array that satisfies a provided testing function
// syntax: array.find((element) => { /* code */ });
// findIndex => use to return the index of the first element in an array that satisfies a provided testing function
// syntax: array.findIndex((element) => { /* code */ });
// some => use to test whether at least one element in the array passes the test implemented by the provided function
// syntax: array.some((element) => { /* code */ });
// every => use to test whether all elements in the array pass the test implemented by the provided function
// syntax: array.every((element) => { /* code */ });
// reduce => use to reduce an array to a single value by performing a function on each element of the array
// syntax: array.reduce((accumulator, currentValue) => { /* code */ }, initialValue);

// modules => use to organize code into separate files and import/export functions, objects, or variables between them
// export => use to export functions, objects, or variables from a module
// syntax: export { functionName, objectName, variableName };
// import => use to import functions, objects, or variables from a module
// syntax: import { functionName, objectName, variableName } from './module.js';