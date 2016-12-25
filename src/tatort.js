(() => {
  'use strict';

  let TVDirekt = require('./source/tvdirekt.js');

  class Tatort {
    constructor() {
      this.source = new TVDirekt();
    }

    today() {
      return this.source.today();
    }

    next() {
      return this.source.next();
    }

    list() {
      return this.source.list();
    }

    today() {
      return this.source.today();
    }
  }

  exports = module.exports = new Tatort();
})();
