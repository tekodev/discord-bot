require('dotenv').config();
var request = require('request');

const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.CLIENT_TOKEN); 


client.on('messageCreate', msg => {
  if (msg.content === '?tako') {
    msg.reply('Merhaba Tarkan Bey');
  }else if (msg.content === '?teko'){
    msg.reply('Merhaba Burak Bey');
  }else if (msg.content === '?lanteko') {
    msg.reply('Efendim Abi');
  }else if (msg.content === '?server') {
	  msg.reply(`Sunucu Adı: ${msg.guild.name}\nKullanıcı Sayısı: ${msg.guild.memberCount}`);
	}else if (msg.content === '?doviz') {
    const https=require('https');
    const parser = require("xml2js");
    https.get('https://www.tcmb.gov.tr/kurlar/today.xml',(response)=>{
    let data='';
    response.on('data',(chunk)=>{
        data += chunk;
    });        
        response.on('end',(jsonData)=>{
            parser.parseString(data,(err,result)=>{
                jsonData = JSON.stringify(result,null,4);
                return jsonData;
            })
            datam =JSON.parse(jsonData)
            var datams = "";
            for(var i=0; i < 4 ;i++){
              var isim = datam.Tarih_Date.Currency[i].Isim[0];
              var sell = datam.Tarih_Date.Currency[i].ForexSelling[0];
              datams += isim+" : "+sell+"\n";
            }
            msg.reply(datams);
          })
        })
      .on('error',(error)=>{
      console.log(error);
    });
  }else if (msg.content === '?link') {

    var options = {
      'method': 'POST',
      'url': 'http://localhost:8000/backend.php',
      'headers': {
      },
      formData: {
        'link': 'www.tako.com'
      }
      };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      msg.reply(response.body);
    });
  }else if (msg.content.toLowerCase() === '?me'){
    msg.reply("Merhaba"+`${msg.member}`);
  }else if(msg.content.toLowerCase() ==='?listen'){

      msg.createReactionCollector


    msg.channel.send("Enter your name");
    let filter = m =>m.author.id === msg.author.id;
    try{
      console.log(msg.channel);
      /*
        let msga = await msg.channel.awaitMessages(filter,{maxMatches:1,time:10000,errors:
        ['time']});
        msg.channel.send("Your name"+msga.first().content);
        */}
      catch(ex) {
          msg.channel.send("You did not specifyaname on time.");

  }}

});








   