const CommandAbstract  = require('./CommandInterface/CommandAbstract.js');

module.exports = class Tako extends CommandAbstract {
    constructor() {
        super();
        console.log(this.constructor.name + " command constructor executed.");
    }
    
    execute(message) {
        message.reply('Merhaba Tarkan Bey');
    }
};
