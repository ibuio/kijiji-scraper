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
        key: 'd1ac40a099692f0cf407e824d7df8069',
        account: 'AC61d7e463d71d375ccd3830c88221f5d6'
    }

    // Check evert X minutes
    minutesBetweenCheck: 1
};

module.exports = config;
