const CommandAbstract  = require('./CommandInterface/CommandAbstract.js');
const { MessageEmbed } = require('discord.js');
const request  = require('request');

module.exports = class Shortlink extends CommandAbstract {
    constructor() {
        super();
        console.log(this.constructor.name + " command constructor executed.");
    }
    
    execute(message, longUrl) {
        var options = {
            'method': 'POST',
            'url': 'https://taeko.tech/backend.php',
            'headers': {},
            formData: {
              'link': longUrl
            }
        };

        request(options, function (error, response) {
            if (error) {
                return console.log(error);
            }
            const embed = new MessageEmbed()
                .setColor('#000000')
                .setTitle("Link'e Gider ✓")
                .setURL("http://" + response.body)
                .setDescription(response.body);
            return message.reply({ embeds: [embed] });
        });
    }
};
