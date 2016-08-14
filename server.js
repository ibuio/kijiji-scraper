"use strict";
var request = require('request');
var cheerio = require('cheerio');
var schedule = require('node-schedule');
var RSVP = require('rsvp');
var config = require('./config');
var express = require('express');
var app     = express();

// http://stackoverflow.com/questions/31092538/heroku-node-js-error-r10-boot-timeout-web-process-failed-to-bind-to-port-w
app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});

//var nodemailer = require('nodemailer');
var client = require('twilio')(config.twilio.account, config.twilio.key);


let processedAds = [];

class Ad {
    constructor(url, image, title, description, location, price) {
        this.url = url;
        //if(url.indexOf('quebec') > -1)
        //    this.province = 'quebec';
        //else if(url.indexOf('ontario') > -1)
        //    this.province = 'ontario';
        this.image = image;
        this.title = title;
        this.description = description;
        this.location = location;
        this.price = price;
    }

    static buildAd($jquerySelector) {
        var ad = new Ad();

        ad.url = 'http://www.kijiji.ca' + $jquerySelector.attr('data-vip-url');
        ad.title = $jquerySelector.
        ad.image = $jquerySelector.find('.image img').attr('src');
        ad.title = $jquerySelector.find('a.title').text().trim();
        ad.description = $jquerySelector.find('.description').text().trim();
        ad.location = $jquerySelector.find('.location').text().trim();
        ad.price = $jquerySelector.find('.price').text().trim();

        // if(ad.url.indexOf('quebec') > -1)
        //     ad.province = 'quebec';
        // else if(ad.url.indexOf('ontario') > -1)
        //     ad.province = 'ontario';

        return ad;
    }

    isEqual(ad) {
        return ad.url === this.url;
    }

    isInList(ads) {
        return ads.filter(ad => this.isEqual(ad)).length > 0;
    }

    toHtml() {
        return `<tr><td><a href="${this.url}">${this.title}</a> Price: ${this.price}</td></tr>` +
        `<tr><td>${this.location}</td></tr>` +
        `<tr><td>${this.description}</td></tr>` +
        `<tr><td><a href="${this.url}"><img src="${this.image}"/></a></td></tr>` +
        `<tr><td>&nbsp;</td></tr>`;
    }
}

function updateItems() {
    const promises = config.urls.map(url => createAdFetchPromise(url));

    return RSVP.Promise.all(promises).then(parsedAdsList => {
        const fetchedAds = parsedAdsList.reduce((adList1, adList2) => adList1.concat(adList2));
        processNewAds(fetchedAds);
    });
}

function createAdFetchPromise(url) {
    return new RSVP.Promise((resolve, reject) => {
        request(url, (error, response, html) => {
            if (error) {
                reject();
                return;
            }

            const $ = cheerio.load(html);
            const $items = $('div.search-item');
            const parsedAds = $items.map(function () {
                return Ad.buildAd($(this));
            }).get();

            resolve(parsedAds);
        });
    });
}

function processNewAds(fetchedAds) {
    const newAds = fetchedAds.filter(ad => !ad.isInList(processedAds));

    if (!newAds.length) {
        return;
    }

    //emailAds(newAds);
    smsAds(newAds);
    processedAds = processedAds.concat(newAds);
}

function smsAds(ads) {
    logAdsBeingSmsed(ads);

    sendAdsFoundSms(ads);
}

function emailAds(ads) {
    logAdsBeingEmailed(ads);

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(
        `smtps://${config.email.gmailUser}%40gmail.com:${config.email.gmailPassword}@smtp.gmail.com`);

    // setup e-mail data with unicode symbols
    let mailOptions = {
        from: 'Kijiji Scraper <noreply@example.com>', // sender address
        to: `${config.email.gmailUser}@gmail.com`, // list of receivers
        subject: createAdsFoundMessage(ads), // Subject line
        text: JSON.stringify(ads), // plaintext body
        html: formatAds(ads) // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, error => {
        if (error) {
            return console.log(`Email failed: ${error}`);
        }

        console.log(`Email sent successfully`);
    });
}

function logAdsBeingEmailed(ads) {
    console.log(createAdsFoundMessage(ads));
    ads.forEach(ad => {
        console.log(`emailing new ad: ${ad.title}`);
    });
    console.log(``);
}

function logAdsBeingSmsed(ads) {
    console.log(createAdsFoundMessage(ads));
    ads.forEach(ad => {
        console.log(`texting new ad: ${ad.title}`);
    });
    console.log(``);
}

function createAdsFoundMessage(ads) {
    return `We found ${ads.length} new ads for you :)`;
}

function sendAdsFoundSms(ads) {
    // var message = `Found ${ads.length} new ads. `;
    console.log(`Found ${ads.length} new ads. `);

    ads.forEach( ad => {
        console.log('sending sms for ad: ' + ad.title + 'in location: ' + ad.location);
        var message = 'ad in:' + ad.location.substring(0,60) + '; Title: ' + ad.title.substring(0,100);
        console.log('message: ' + message);

        //   client.messages.create({
        //       body: message,
        //       to: +15146229479,
        //       from: config.twilio.sendingNumber
        //   }, function(err, data) {
        //   if (err) {
        //     console.error('Error sending sms.');
        //     console.error(err);
        //   } else {
        //     console.log('Sms sent');
        //   }
        // });

    })

    // var locationMap = [];
    // locationMap['quebec'] = 0;
    // locationMap['ontario'] = 0;

    // ads.forEach( ad => {
    //     console.log('location: ' + ad.province);
    //     locationMap[ad.province] = locationMap[ad.province] + 1;
    // });
    // console.log('locationMap[]: ' + locationMap);
    //
    // message = message + locationMap;

    //for(var location in locationMap) {
    //
    //}

  //   client.messages.create({
  //       body: message,
  //       to: +15146229479,
  //       from: config.twilio.sendingNumber
  //   }, function(err, data) {
  //   if (err) {
  //     console.error('Error sending sms.');
  //     console.error(err);
  //   } else {
  //     console.log('Sms sent');
  //   }
  // });
}

function formatAds(ads) {
    const adsFoundMessage = createAdsFoundMessage(ads);
    const adsTableRows = ads.map(ad => ad.toHtml());

    return `<h1>${adsFoundMessage}</h1>` +
    `<table>${adsTableRows}</table>`;
}

const cronRule = `*/${config.minutesBetweenCheck} * * * *`;
schedule.scheduleJob(cronRule, () => {
    updateItems().then(() => {
        console.log(`Ads updated, number of ads: ${processedAds.length}`);
    });
});

console.log('Kijiji Scrapper started.');
console.log(`Watching the following page for new ads: ${config.urls}`);
console.log(`Polling for new ads every ${config.minutesBetweenCheck} minutes.`);
console.log();
