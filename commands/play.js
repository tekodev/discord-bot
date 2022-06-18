require('dotenv').config();
const CommandAbstract  = require('./CommandInterface/CommandAbstract.js');
const { MessageEmbed } = require('discord.js');
const { Player }       = require("discord-player");
var queue, track;

module.exports = class Play extends CommandAbstract {
    constructor() {
        super();
        console.log(this.constructor.name + " command constructor executed.");
    }
    
    execute(message, query, listener) {
        const player = new Player(listener);
        if (!message.member.voice.channelId) {
            return message.reply({ content: "You are not in a voice channel!", ephemeral: true });
        } 
        if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId) {
            return message.reply({ content: "You are not in my voice channel!", ephemeral: true });
        }

        queue = player.createQueue(message.guild, {
            metadata: {
                channel: message.channel
            }
        });

        try {
            if (!queue.connection) {
                queue.connect(message.member.voice.channel);
            }
        } catch {
            queue.destroy();
            return message.reply({ content: "Could not join your voice channel!", ephemeral: true });
        }

        track = player.search(query, {
            requestedBy: message.user
        }).then(x => x.tracks[0]);

        if (!track || track === "undefined") {
            return message.reply({ content: `❌ | Track **${query}** not found!` });
        }

        const userAvatar = `${message.author.displayAvatarURL({format : 'png'})}`;
        const userName   = `${message.author.username}`;
        const botAvatar  = process.env.BOT_AVATAR;
        const botName    = process.env.BOT_NAME;

        track.then(function (song){
            track = song;
            queue.play(track);

            const embed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('*🎶 Playing ↴*')
                .setAuthor({ name: userName, iconURL: userAvatar })
                .setDescription(`**╠  ${track.title}  ╣**`)
                .setThumbnail(botAvatar)
                .setTimestamp()
                .setFooter({ text: botName, iconURL: "" });

            message.reply({ embeds: [embed] }).then(function(response){
                process.env['PLAY_MESSAGE'] = JSON.stringify(response);
            });

            process.env['TRACK'] = JSON.stringify(track);
        });
        return queue;
    }
};
