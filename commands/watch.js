const CommandAbstract  = require('./CommandInterface/CommandAbstract.js');

module.exports = class Watch extends CommandAbstract {
    constructor() {
        super();
        console.log(this.constructor.name + " command constructor executed.");
    }
    
    execute(message, query, listener) {
        
    }
};
