(() => {
  'use strict';

  let assert = require('assert')
  let fs = require('fs');

  describe('Tatort', () => {
    let Tatort = require(__dirname + '/../');
    let t = new Tatort('tvdirekt', fs.readFileSync(__dirname + '/fixtures/example.html'));

    describe('next()', () => {
      it('should return a valid Tatort', () => {
        return t.next().then(
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
        return t.list().then(
          (list) => {
            assert.equal(list.Count(), 10)
          }
        )
      });
    });

    describe('today()', () => {
      it('should return a list of Tatort shows today', () => {
        return t.today().then(
          (list) => {
            assert.equal(list.length, 3)
          }
        )
      });
    });

    describe('tomorrow()', () => {
      it('should return a list of Tatort shows tomorrow', () => {
        return t.tomorrow().then(
          (list) => {
            assert.equal(list.length, 3)
          }
        )
      });
    });
  });
})();
