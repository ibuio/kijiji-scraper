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
        'http://www.kijiji.ca/b-autos-camions/quebec/autre+type+de+carrosserie__berline__bicorps__cabriolet__coupe__familiale-porsche-356__911__912__914__924__928__930__944__968__carrera-1968__1998/c174l9001a138a54a1000054a68?ad=offering',
        'http://www.kijiji.ca/b-cars-trucks/alberta/convertible__coupe__hatchback__other+body+type__sedan__wagon-porsche-356__911__912__914__924__928__930__944__968__carrera-1968__1998/c174l9003a138a54a1000054a68?ad=offering',
        'http://www.kijiji.ca/b-cars-trucks/british-columbia/convertible__coupe__hatchback__other+body+type__sedan__wagon-porsche-356__911__912__914__924__928__930__944__968__carrera-1968__1998/c174l9007a138a54a1000054a68?ad=offering',
        'http://www.kijiji.ca/b-cars-trucks/manitoba/convertible__coupe__hatchback__other+body+type__sedan__wagon-porsche-356__911__912__914__924__928__930__944__968__carrera-1968__1998/c174l9006a138a54a1000054a68?ad=offering',
        'http://www.kijiji.ca/b-cars-trucks/new-brunswick/convertible__coupe__hatchback__other+body+type__sedan__wagon-porsche-356__911__912__914__924__928__930__944__968__carrera-1968__1998/c174l9005a138a54a1000054a68?ad=offering',
        'http://www.kijiji.ca/b-cars-trucks/nova-scotia/convertible__coupe__hatchback__other+body+type__sedan__wagon-porsche-356__911__912__914__924__928__930__944__968__carrera-1968__1998/c174l9002a138a54a1000054a68?ad=offering',
        'http://www.kijiji.ca/b-cars-trucks/ontario/convertible__coupe__hatchback__other+body+type__sedan__wagon-porsche-356__911__912__914__924__928__930__944__968__carrera-1968__1998/c174l9004a138a54a1000054a68?ad=offering',
        'http://www.kijiji.ca/b-autos-camions/quebec/ferrari__lamborghini-1968__1998/c174l9001a54a68?ad=offering',
        'http://www.kijiji.ca/b-cars-trucks/alberta/ferrari__lamborghini-1968__1998/c174l9003a54a68?ad=offering',
        'http://www.kijiji.ca/b-cars-trucks/british-columbia/ferrari__lamborghini-1968__1998/c174l9007a54a68?ad=offering',
        'http://www.kijiji.ca/b-cars-trucks/manitoba/ferrari__lamborghini-1968__1998/c174l9006a54a68?ad=offering',
        'http://www.kijiji.ca/b-cars-trucks/new-brunswick/ferrari__lamborghini-1968__1998/c174l9005a54a68?ad=offering',
        'http://www.kijiji.ca/b-cars-trucks/nova-scotia/ferrari__lamborghini-1968__1998/c174l9002a54a68?ad=offering',
        'http://www.kijiji.ca/b-cars-trucks/ontario/ferrari__lamborghini-1968__1998/c174l9004a54a68?ad=offering',
        'http://www.kijiji.ca/b-classic-cars/canada/bmw-m3-1982__1991/c122l0a142a1000142a95?ad=offering',
        'http://www.kijiji.ca/b-classic-cars/canada/porsche-356__911__912__914__924__928__930__944__968__carrera__cayman__other+model-1968__1998/c122l0a142a1000142a95?ad=offering',
        'http://www.kijiji.ca/b-classic-cars/canada/ferrari__lamborghini/c122l0a142?ad=offering'
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
    minutesBetweenCheck: 7
};

module.exports = config;
