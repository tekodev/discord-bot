require('dotenv').config();

const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const listener = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const https    = require('https');
const parser   = require("xml2js");
const request  = require('request');

const regexp   = /^([\w|\W])(\S+)([\w|\W]*)/g;

listener.on('ready', () => {
  console.log(`Logged in as ${listener.user.tag}!`);
});

listener.login(process.env.CLIENT_TOKEN); 

listener.on('messageCreate', msg => {

    if(msg.content[0] !== "?" || (msg.content[0] === "?" && !(msg.content.length > 1))) {
      return;
    }

    global.me = function me() {
        msg.reply("Merhaba "+`${msg.member}`);
    }

    global.tako = function tako() {
        msg.reply('Merhaba Tarkan Bey');
    }

    global.teko = function teko() {
        msg.reply('Merhaba Burak Bey');
    }

    global.lanteko = function lanteko() {
        msg.reply('Efendim Abi');
    }

    global.currency = function currency() {
        https.get('https://www.tcmb.gov.tr/kurlar/today.xml', (response) => {

            let data = "";
            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', (jsonData) => {
                parser.parseString(data, (err, result) => {
                    jsonData = JSON.stringify(result, null, 4);
                    return jsonData;
                });

                var datam = JSON.parse(jsonData);
                var isim, sell, datams = "";
                for(var i = 0; i < 4; i++) {
                    isim = datam.Tarih_Date.Currency[i].Isim[0];
                    sell = datam.Tarih_Date.Currency[i].ForexSelling[0];
                    datams += isim + " : " + sell + "\n";
                }

                msg.reply(datams);
            });
        }).
        on('error', (error) => {
          console.log(error);
        });
    }

    global.shortlink = function shortlink(longUrl) {
        var options = {
            'method': 'POST',
            'url': 'https://taeko.tech/backend.php',
            'headers': {},
            formData: {
              'link': longUrl
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            const embed = new MessageEmbed()
                .setColor('#000000')
                .setTitle("Link'e Gider")
                .setURL("http://" + response.body)
                .setDescription(response.body);

            msg.reply({ embeds: [embed] });
        });
    }

    global.math = function math(deger) {
        msg.reply("Result = " + String(eval(deger)));
    }

    const matches = [...msg.content.matchAll(regexp)];

    const commandChar = matches[0][1];
    const command = matches[0][2].toString().trim();
    if (!(command in global) && typeof global[command] !== "function") {
        return;
    }

    var parameter = "";
    if(global[command].length > 0) {
        parameter = matches[0][3].toString().trim();
        if(parameter.length === 0) {
            msg.reply(command + " command needs a parameter.");
            return;
        }
    }

    global[command](parameter);
    return;
});