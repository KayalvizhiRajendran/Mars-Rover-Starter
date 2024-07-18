const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {
    it("throws error if Name is NOT passed into constructor as the first parameter", function() {
        expect( function() { new Message();}).toThrow(new Error('Name required.'));
      });

      it("constructor sets Name", function() {
        let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
        let message1 = new Message("Test message with two commands", commands);
        let output = message1.name;
        expect(output).toEqual("Test message with two commands");
    
    });

    it("constructor sets commands", function() {
        let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
        let message1 = new Message("Test message with two commands", commands);
        let output = message1.commands;
        expect(output).toEqual(commands);
    
    });
     
});
      

