require('dotenv').config();
const { Client, Intents } = require('discord.js');
const CommandFactory      = require('./commands/CommandInterface/CommandFactory.js');
const Play                = require('./commands/play.js');
const Stop                = require('./commands/stop.js');
const listener            = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });

const regexp   = /^([\w|\W])(\S+)([\w|\W]*)/g;

var commandInterface, response, queue;
listener.on('ready', () => {
    console.log(`Logged in as ${listener.user.tag}!`);
  });
  
  listener.login(process.env.CLIENT_TOKEN); 
  
  listener.on('messageCreate', msg => {
    if(msg.content[0] !== "?" || (msg.content[0] === "?" && !(msg.content.length > 1))) {
        return;
    }

    const matches = [...msg.content.matchAll(regexp)];
    var command = matches[0][2].toString().trim();
    var parameter;
    try {
        parameter = matches[0][3].toString().trim();
    }catch(e) {
        parameter = "";
    }
    
    if(commandInterface !== "undefined" && command === "stop") {
        commandInterface = new Stop();
        return commandInterface.execute(msg, parameter, listener, queue);
    }
    
    commandInterface = CommandFactory.handle(command);
    if(commandInterface.execute.length > 1 && parameter.length === 0 && command !== "stop") {
        return msg.reply(commandInterface.constructor.name + " command needs a parameter.");
    }

    response = commandInterface.execute(msg, parameter, listener);
    if(command === "play") {
        queue = response;
    }
  });