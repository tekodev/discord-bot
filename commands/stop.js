require('dotenv').config();
const CommandAbstract  = require('./CommandInterface/CommandAbstract.js');
const { MessageEmbed } = require('discord.js');
const { Player }       = require("discord-player");

module.exports = class Stop extends CommandAbstract {
    constructor() {
        super();
        console.log(this.constructor.name + " command constructor executed.");
    }
    
    execute(message, parameter, listener, queue) {
        if(queue === undefined) {
            return message.reply({ content: "The track is not playing right now.", ephemeral: true });
        }

        queue.destroy(true);
        const userAvatar = `${message.author.displayAvatarURL({format : 'png'})}`;
        const botAvatar  = process.env.BOT_AVATAR;
        const userName   = `${message.author.username}`;
        const botName    = process.env.BOT_NAME;

        var track = JSON.parse(process.env.TRACK);
        var playMessage = JSON.parse(process.env.PLAY_MESSAGE);

        const embed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('*🚫  Stopped ↴*')
            .setAuthor({ name: userName, iconURL: userAvatar })
            .setDescription(`**╠  ${track.title}  ╣**`)
            .setThumbnail(botAvatar)
            .setTimestamp()
            .setFooter({ text: botName, iconURL: "" });
            
        return message.reply({ embeds: [embed] }).then(function(response){
            message.fetch(playMessage.id).then(msg => msg.delete());
        });
    }
};
