const CommandAbstract  = require('./CommandInterface/CommandAbstract.js');

module.exports = class Kral extends CommandAbstract {
    constructor() {
        super();
        console.log(this.constructor.name + " command constructor executed.");
    }
    
    execute(message) {
        return message.reply("Kralımız <@419132270796996610>");
    }
};
