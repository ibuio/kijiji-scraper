// check for kool configs: https://www.twilio.com/docs/tutorials/walkthrough/server-notifications/node/express
var config = {

    // Urls of the kijiji search pages you want to scrape
    // hint - use the filters as much as you want then copy the resulting url
    //'http://www.kijiji.ca/b-autos-camions/quebec/autre+type+de+carrosserie__berline__bicorps__cabriolet__coupe__familiale/c174l9001a138 ',
    urls: [
        //'http://www.kijiji.ca/b-autos-camions/quebec/mercedes+benz-1980__1995/c174l9001a54a68?ad=offering',
        //'http://www.kijiji.ca/b-cars-trucks/alberta/mercedes+benz-1980__1995/c174l9003a54a68?ad=offering',
        //'http://www.kijiji.ca/b-cars-trucks/british-columbia/mercedes+benz-1980__1995/c174l9007a54a68?ad=offering'
        //
        //'http://www.kijiji.ca/b-cars-trucks/british-columbia/mercedes+benz-1980__2015/c174l9007a54a68?ad=offering',
        //'http://www.kijiji.ca/b-cars-trucks/alberta/mercedes+benz-1980__2015/c174l9003a54a68?ad=offering',
        //'http://www.kijiji.ca/b-cars-trucks/prince-edward-island/mercedes+benz-1980__2015/c174l9011a54a68?ad=offering',
        //'http://www.kijiji.ca/b-cars-trucks/manitoba/mercedes+benz-1980__2015/c174l9006a54a68?ad=offering',
        //'http://www.kijiji.ca/b-cars-trucks/new-brunswick/mercedes+benz-1980__2015/c174l9005a54a68?ad=offering',
        //
        //'http://www.kijiji.ca/b-autos-camions/quebec/mercedes+benz-1980__2015/c174l9001a54a68?ad=offering',
        //'http://www.kijiji.ca/b-cars-trucks/ontario/mercedes+benz-1980__2015/c174l9004a54a68?ad=offering',
        //'http://www.kijiji.ca/b-cars-trucks/ontario/mercedes+benz-1980__2015/c174l9004a54a68?ad=offering'
        'http://www.kijiji.ca/b-autos-camions/quebec/ferrari__lamborghini__porsche-1968__1999/c174l9001a54a68?ad=offering',
        'http://www.kijiji.ca/b-cars-trucks/alberta/ferrari__lamborghini__porsche-1968__1999/c174l9003a54a68?ad=offering',
        'http://www.kijiji.ca/b-cars-trucks/british-columbia/ferrari__lamborghini__porsche-1968__1999/c174l9007a54a68?ad=offering',
        'http://www.kijiji.ca/b-cars-trucks/ontario/ferrari__lamborghini__porsche-1968__1999/c174l9004a54a68?ad=offering'

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
