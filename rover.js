class Rover {
   constructor(position){
      this.position = position;
      this.MODE = "NORMAL";
      this.generatorWatts = 110;
   }

   receiveMessage(message){
      let results = [];
      let response = {};
      response['message']= message.name;
      for (let index = 0; index < message.commands.length; index++) {
         const element = message.commands[index];
         const res = {};
         if(element.commandType === "MODE_CHANGE"){
            if(this.MODE === "LOW_POWER"){
               res.completed= false;
            }else {
            res.completed= true;
            this.MODE = element.value;
            }
         } else if (element.commandType === "MOVE"){
            if(this.MODE === "LOW_POWER"){
               res.completed= false;
            }else {
            this.position = element.value;
            res.completed= true;
            }
         } else if(element.commandType === "STATUS_CHECK"){
            res.completed= true;
            res.roverStatus = this;//`{mode: ${this.MODE}, generatorWatts:${this.generatorWatts}, position: ${this.position}}`;
         }
         results.push(res);
      }
      response['results'] = results;
      return response;
   }
}

module.exports = Rover;