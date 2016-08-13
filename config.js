// check for kool configs: https://www.twilio.com/docs/tutorials/walkthrough/server-notifications/node/express
var config = {

    // Urls of the kijiji search pages you want to scrape
    // hint - use the filters as much as you want then copy the resulting url
    urls: [
        'http://www.kijiji.ca/b-autos-camions/quebec/autre+type+de+carrosserie__berline__bicorps__cabriolet__coupe__familiale/c174l9001a138 '
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

    // Check evert X minutes
    minutesBetweenCheck: 1
};

module.exports = config;
