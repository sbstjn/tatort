(() => {
  'use strict';

  var assert = require('assert')

  describe('Tatort', () => {
    let Tatort = require(__dirname + '/../');

    describe('next()', () => {
      it('should return a valid Tatort', () => {
        return Tatort.next().then(
          (item) => {
            assert.ok(item.name)
            assert.ok(item.date)
            assert.ok(item.channel)
          }
        )
      });
    });

    describe('list()', () => {
      it('should return a list of upcoming Tatort shows today', () => {
        return Tatort.list().then(
          (list) => {
            assert.ok(list)
            assert.ok(list.length > 0)
          }
        )
      });
    });

    describe('today()', () => {
      it('should return a list of Tatort shows today', () => {
        return Tatort.today().then(
          (list) => {
            assert.ok(list)
          }
        )
      });
    });
  });
})();
