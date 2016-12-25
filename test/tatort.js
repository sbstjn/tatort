(() => {
  'use strict';

  let assert = require('assert')
  let fs = require('fs');

  describe('Tatort', () => {
    let Source = require(__dirname + '/../src/source/tvdirekt.js');
    let TVDirekt = new Source(fs.readFileSync(__dirname + '/fixtures/example.html'));

    describe('next()', () => {
      it('should return a valid Tatort', () => {
        return TVDirekt.next().then(
          (item) => {
            assert.equal(item.name, 'Im Namen des Vaters')
            assert.equal(item.channel, 'HR')

            assert.ok(item.date instanceof Date)
          }
        )
      });
    });

    describe('list()', () => {
      it('should return a list of upcoming Tatort shows', () => {
        return TVDirekt.list().then(
          (list) => {
            assert.equal(list.length, 10)
          }
        )
      });
    });

    describe('today()', () => {
      it('should return a list of Tatort shows today', () => {
        return TVDirekt.today().then(
          (list) => {
            assert.equal(list.length, 1)
          }
        )
      });
    });
  });
})();
