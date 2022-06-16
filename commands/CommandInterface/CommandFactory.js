module.exports = class CommandFactory {
    static handle(commandName) {
        try {
            var commandModule = './../' + commandName;
            require.resolve(commandModule);

            var commandPath = commandModule + '.js';
            const command = require(commandPath);
            return new command();
        } catch(e) {
            return console.log("error: " + e);
        }
    }
};