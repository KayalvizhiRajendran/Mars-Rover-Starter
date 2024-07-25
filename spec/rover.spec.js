const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  it("Rover Class - default position set", function() {
  let rover = new Rover(983);
  let output = rover.position;
  expect(output).toEqual(983);
});

it("Rover Class - default MODE set", function() {
  let rover = new Rover(983);
  let output = rover.mode;
  expect(output).toEqual("NORMAL");
});

it("Rover Class - default Watts set", function() {
  let rover = new Rover(983);
  let output = rover.generatorWatts;
  expect(output).toEqual(110);
});

it("Rover Class - response returned by receiveMessage contains the name of the message", function() {
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(98382);    // Passes 98382 as the rover's position.
  let response = rover.receiveMessage(message);

  expect(response.message).toEqual("Test message with two commands");
});

it("Rover Class - response returned by receiveMessage includes two results if two commands are sent in the message", function() {
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(98382);    // Passes 98382 as the rover's position.
  let response = rover.receiveMessage(message);

  expect(response.results.length).toEqual(2);
});

it("Rover Class - responds correctly to the status check command", function() {
  let commands = [new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(98382);    // Passes 98382 as the rover's position.
  let response = rover.receiveMessage(message);

  expect(response.results[0].roverStatus.mode).toEqual("NORMAL");
  expect(response.results[0].roverStatus.position).toEqual(98382);
  expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
});

it("Rover Class - responds correctly to the mode change to 'LOW_POWER' command", function() {
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 56789)];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(98382);    // Passes 98382 as the rover's position.
  let response = rover.receiveMessage(message);
  console.log(response);
  expect(response.results[0].completed).toEqual(true);
  expect(rover.mode).toEqual("LOW_POWER");
  expect(rover.position).toEqual(98382);
  expect(response.results[1].completed).toEqual(false);
});

it("Rover Class - responds correctly to the mode change to 'NORMAL' command", function() {
  let commands = [new Command('MODE_CHANGE', 'NORMAL'), new Command('MOVE', 56789)];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(98382);    // Passes 98382 as the rover's position.
  let response = rover.receiveMessage(message);
  console.log(response);
  expect(response.results[0].completed).toEqual(true);
  expect(rover.mode).toEqual("NORMAL");
  expect(rover.position).toEqual(56789);
  expect(response.results[1].completed).toEqual(true);
});

});



