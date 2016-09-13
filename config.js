// check for kool configs: https://www.twilio.com/docs/tutorials/walkthrough/server-notifications/node/express
var config = {

    // Urls of the kijiji search pages you want to scrape
    // hint - use the filters as much as you want then copy the resulting url
    //'http://www.kijiji.ca/b-autos-camions/quebec/autre+type+de+carrosserie__berline__bicorps__cabriolet__coupe__familiale/c174l9001a138 ',
    // 'http://www.kijiji.ca/b-autos-camions/quebec/ferrari__lamborghini__porsche-1968__1995/c174l9001a54a68?ad=offering',
    // 'http://www.kijiji.ca/b-cars-trucks/ontario/ferrari__lamborghini__porsche-1968__1995/c174l9004a54a68?ad=offering',
    // 'http://www.kijiji.ca/b-cars-trucks/alberta/ferrari__lamborghini__porsche-1968__1995/c174l9003a54a68?ad=offering',
    // 'http://www.kijiji.ca/b-cars-trucks/british-columbia/ferrari__lamborghini__porsche-1968__1995/c174l9007a54a68?ad=offering'
    urls: [
        'http://www.kijiji.ca/b-classic-cars/canada/bmw__ferrari__lamborghini__porsche-308__328__348__355__356__360__430__456__535+gran+turismo__550__575__911__912__914__928__930__944__968__gallardo__m3__mondial__murcielago__testarossa-1968__1991/c122l0a142a1000142a95?ad=offering&siteLocale=fr_CA'
    ],

    email: {
        // Just the username of the gmail address Eg. `myAccount` from `myAccount@gmail.com`
        gmailUser: '',

        // The password of the gmail address
        gmailPassword: ''
    },

    twilio: {
        account: process.env.TWILIO_ACCOUNT_SID,
        key: process.env.TWILIO_AUTH_TOKEN,
        sendingNumber: process.env.TWILIO_NUMBER
    },

    // nb of alerts that can be sent in one batch
    nbAlertsMax: 10,

    // Check evert X minutes
    minutesBetweenCheck: 3
};

module.exports = config;
