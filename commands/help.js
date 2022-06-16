const CommandAbstract  = require('./CommandInterface/CommandAbstract.js');
const CommandUsages    = require('./Params/CommandUsages.js');
const { MessageEmbed } = require('discord.js');
const usages = new CommandUsages();

module.exports = class Help extends CommandAbstract {
    constructor() {
        super();
        console.log(this.constructor.name + " command constructor executed.");
    }

    execute(message) {
        var listUsages = "";

        usages.forEach(function(commandObj) {
            if(commandObj.example.length > 0) {
                listUsages += "**" + commandObj.command + " : **" + commandObj.description + "\n___Örnek Kullanım___ ** : ** " + commandObj.example + "\n\n";
                return;
            }
            listUsages += "**" + commandObj.command + " : ** " + commandObj.description + "\n\n";
        });
        const embed = new MessageEmbed()
            .setColor('#ffffff')
            .setTitle("Commands Helper ✓")
            .setDescription(listUsages);

        message.reply({ embeds: [embed] });
    }
};
