"use strict";
var request = require('request');
var cheerio = require('cheerio');
var schedule = require('node-schedule');
var RSVP = require('rsvp');
var config = require('./config');
var express = require('express');
var moment = require('moment');
var app     = express();
moment().format();

// http://stackoverflow.com/questions/31092538/heroku-node-js-error-r10-boot-timeout-web-process-failed-to-bind-to-port-w
app.set('port', (process.env.PORT || 5000));

//To avoid Heroku $PORT error
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
    //constructor(url, image, title, description, location, price) {
    constructor(url, title, description, location, price) {
        this.url = url;

        this.createDate = moment();

        //if(url.indexOf('quebec') > -1)
        //    this.province = 'quebec';
        //else if(url.indexOf('ontario') > -1)
        //    this.province = 'ontario';
        //this.image = image;
        //this.title = title;
        //this.description = description;
        //this.location = location;
        //this.price = price;
    }

    static buildAd($jquerySelector) {
        var ad = new Ad();

        ad.url = 'http://www.kijiji.ca' + $jquerySelector.attr('data-vip-url');

        var adDate = $jquerySelector.find('span.date-posted').text().trim();
        //ad.image = $jquerySelector.find('.image img').attr('src');
        ad.title = $jquerySelector.find('a.title').text().trim();
        //ad.description = $jquerySelector.find('.description').text().trim();
        ad.location = $jquerySelector.find('.location').text().trim();
        //ad.price = $jquerySelector.find('.price').text().trim();

        // keep add only if add date is from 1 hour or less (fr + en)
        if(adDate.indexOf("< 1 hour") !== -1 || adDate.indexOf("1 heure") !== -1 || adDate.indexOf("minutes") !== -1)
            return ad;
    }

    isEqual(ad) {
        return ad.url === this.url;
    }

    isInList(ads) {
        return ads.filter(ad => this.isEqual(ad)).length > 0;
    }

    toHtml() {
        // return `<tr><td><a href="${this.url}">${this.title}</a> Price: ${this.price}</td></tr>` +
        // `<tr><td>${this.location}</td></tr>` +
        // `<tr><td>${this.description}</td></tr>` +
        // `<tr><td><a href="${this.url}"><img src="${this.image}"/></a></td></tr>` +
        // `<tr><td>&nbsp;</td></tr>`;
        return `<tr><td><a href="${this.url}">`
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

    //smsAds(newAds);
    smsAds(newAds);
    processedAds = processedAds.concat(newAds);
}

function smsAds(ads) {
    logAdsBeingSmsed(ads);

    sendAdsFoundSms(ads);
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

    var threashold = 1; // send 5 firsts sms. for test only
    ads.forEach( ad => {
        if(threashold <= config.nbAlertsMax) {
            console.log(`sending sms for ad: ${ad.title} in location: ${ad.location}` );
            //var message = 'ad in:' + ad.location.substring(0,60) + '; Title: ' + ad.title.substring(0,100);
            var message = ad.url;
            console.log('message: ' + message);

            client.messages.create({
              body: message,
              to: +15146229479,
              from: config.twilio.sendingNumber
            }, function(err, data) {
                if (err) {
                    console.error('Error sending sms.');
                    console.error(err);
                } else {
                    console.log('Sms sent to jon');
                }
            });
            client.messages.create({
              body: message,
              to: +15148656882,
              from: config.twilio.sendingNumber
            }, function(err, data) {
                if (err) {
                    console.error('Error sending sms.');
                    console.error(err);
                } else {
                    console.log('Sms sent to mitchell');
                }
            });
            threashold++;
        }
        else
            console.log('nb max sms has been reached, not sending sms.');
    });
}

// not called
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

        int removedItems = 0;
        var nowMinusOneHour = moment().subtract(1, 'hours');
        // remove old items (+ than 1 hour)
        processedAds.forEach(function(ad, index, object) {
            if (moment(ad.dateCreated).isBefore(nowMinusOneHour)) {
                object.splice(index, 1);
                removedItems++;
            }
        });
        console.log('Ads removed, number of ads: ' + removedItems);

    });
});

console.log('Kijiji Scrapper started.');
console.log(`Watching the following page for new ads: ${config.urls}`);
console.log(`Polling for new ads every ${config.minutesBetweenCheck} minutes.`);
console.log();
