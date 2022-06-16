const CommandAbstract  = require('./CommandInterface/CommandAbstract.js');

module.exports = class Lanteko extends CommandAbstract {
    constructor() {
        super();
        console.log(this.constructor.name + " command constructor executed.");
    }
    
    execute(message) {
        return message.reply('Efendim Abi');
    }
};
