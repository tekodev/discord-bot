const CommandAbstract  = require('./CommandInterface/CommandAbstract.js');

module.exports = class Math extends CommandAbstract {
    constructor() {
        super();
        console.log(this.constructor.name + " command constructor executed.");
    }
    
    execute(process) {
        return message.reply("Result = " + String(eval(process)));
    }
};
