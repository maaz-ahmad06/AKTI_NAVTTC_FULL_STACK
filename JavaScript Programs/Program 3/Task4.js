// Bus Queue Simulation

let busQueue = ["Alice", "Bob", "Charlie"];
console.log(busQueue);

// adding a new passenger "David" to the end of the queue
busQueue.push("David");
console.log(busQueue);
// new passenger "David" has been added to the end of the queue

// another passenger "Eve" joins at the front of the queue
busQueue.unshift("Eve");
console.log(busQueue);
// new passenger "Eve" has been added to the front of the queue

// the first person boards the bus
busQueue.shift();
console.log(busQueue);
// the first person has boarded the bus and the final queue is printed