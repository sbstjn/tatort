(() => {
  'use strict';

  let TVDirekt = require('./source/tvdirekt.js');

  class Tatort {
    constructor(source, fixture) {
      let Source = require('./source/' + source + '.js')
      this.source = new Source(fixture);
    }

    today() {
      let check = new Date();

      return this.source.onDate(check);
    }

    tomorrow() {
      let check = new Date();
      check.setDate(check.getDate() + 1);

      return this.source.onDate(check);
    }

    next() {
      return this.source.list().then(
        list => list.First()
      )
    }

    list() {
      return this.source.list();
    }
  }

  exports = module.exports = Tatort;
})();
