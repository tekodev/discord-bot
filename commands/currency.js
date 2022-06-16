const CommandAbstract  = require('./CommandInterface/CommandAbstract.js');

module.exports = class Currency extends CommandAbstract {
    constructor() {
        super();
        console.log(this.constructor.name + " command constructor executed.");
    }
    
    execute(message) {
        const https    = require('https');
        const parser   = require('xml2js');
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
                    isim    = datam.Tarih_Date.Currency[i].Isim[0];
                    sell    = "**" + datam.Tarih_Date.Currency[i].ForexSelling[0] + "**";
                    datams += isim + " : " + sell + "\n";
                }

                message.reply(datams);
            });
        }).
        on('error', (error) => {
            console.log(error);
        });
    }
};
