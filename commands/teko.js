const CommandAbstract  = require('./CommandInterface/CommandAbstract.js');

module.exports = class Teko extends CommandAbstract {
    constructor() {
        super();
        console.log(this.constructor.name + " command constructor executed.");
    }
    
    execute(message) {
        message.reply('Merhaba Burak Bey');
    }
};
