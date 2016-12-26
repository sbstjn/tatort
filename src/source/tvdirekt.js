(() => {
  'use strict'

  let fetch = require('node-fetch');
  let cheerio = require('cheerio')

  let Tatort = require(__dirname + '/../data/show.js');

  let fromParent = function(parent) {
    let now = new Date();

    let date = parent.find('.date').text().substr(0, 5).split('.').map((el) => parseInt(el, 10));
    let time = parent.find('.time .time').text().split(':').map((el) => parseInt(el, 10));

    let channel = parent.find('.station a').attr('title')

    return new Tatort(
      parent.find('h3 a').text().replace('Tatort: ', ''),
      new Date(Date.UTC(now.getUTCFullYear(), date[1]-1, date[0], time[0], time[1], 0)),
      channel
    )
  }

  class Source {
    constructor(fake) {
      this.fake = fake;
    }

    data() {
      if (this.fake) {
        return Promise.resolve(this.fake);
      }

      return fetch(
        "http://www.tvdirekt.de/tatort-heute-abend.html"
      ).then(
        (res) => {
          if (res.status === 200) {
            return res.text();
          }

          throw new Error("Failed to fetch data; Status: " + res.status)
        }
      )
    }

    list() {
      return this.data().then(
        (data) => {
          let doc = cheerio.load(data);
          let list = doc('h3 a[href*="/tv-programm/sendungsdetails/"]')

          if (list.length == 0) {
            throw new Error("Unable to parse HTML structure");
          }

          let items = [];

          for (let i = 0, len = list.length; i < len; i++) {
            items.push(fromParent(doc(list[i]).parent().parent().parent().parent()))
          }

          return items;
        }
      )
    }

    onDate(date) {
      return this.list().then(
        (list) => {
          return list.filter(
            (item) => {
              return date.getUTCFullYear() == item.date.getUTCFullYear()
                && date.getUTCMonth() == item.date.getUTCMonth()
                && date.getUTCDate() == item.date.getUTCDate()
            }
          )
        }
      )
    }

    today() {
      return this.onDate(new Date());
    }

    tomorrow() {
      let check = new Date();
      check.setDate(check.getDate() + 1);

      return this.onDate(check);
    }

    next() {
      return this.data().then(
        (data) => {
          let doc = cheerio.load(data);
          let list = doc('h3 a[href*="/tv-programm/sendungsdetails/"]')

          if (list.length == 0) {
            return null;
          }

          return fromParent(list.first().parent().parent().parent().parent())
        }
      )
    }
  }

  exports = module.exports = Source
})()
