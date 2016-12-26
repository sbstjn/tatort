(() => {
  'use strict';

  let assert = require('assert')
  let fs = require('fs');

  describe('Tatort', () => {
    let Tatort = require(__dirname + '/../');
    let t = new Tatort('tvdirekt', fs.readFileSync(__dirname + '/fixtures/example.html'));

    /* describe('next()', () => {
      it('should return a valid Tatort', () => {
        return t.next().then(
          (item) => {
            assert.equal(item.name, 'Im Namen des Vaters')
            assert.equal(item.channel, 'HR')

            assert.ok(item.date instanceof Date)
          }
        )
      });
    }); */

    describe('list()', () => {
      it('should return a list of upcoming Tatort shows', () => {
        return t.list().then(
          (list) => {
            assert.equal(list.Count(), 10)
          }
        )
      });
    });

    describe('after()', () => {
      it('should return shows after specified date #1', () => {
        return t.after(
          new Date(2016, 11, 1, 0, 0, 0)
        ).then(
          list => {
            assert(list.First().name, 'Im Namen des Vaters');
          }
        )
      });

      it('should return shows after specified date #2', () => {
        return t.after(
          new Date(2016, 11, 26, 0, 0, 0)
        ).then(
          list => {
            assert(list.First().name, 'Klingelingeling');
          }
        )
      })

      it('should return shows after specified date #3', () => {
        return t.after(
          new Date(Date.UTC(2016, 11, 28, 21, 59, 59))
        ).then(
          list => {
            assert(list.First().name, 'Der Hammer');
          }
        )
      })

      it('should return shows after specified date #4', () => {
        return t.after(
          new Date(Date.UTC(2016, 11, 28, 22, 0, 0))
        ).then(
          list => {
            assert.equal(list.First().name, 'Der Hammer');
          }
        )
      })

      it('should return shows after specified date #5', () => {
        return t.after(
          new Date(Date.UTC(2016, 11, 28, 22, 0, 1))
        ).then(
          list => {
            assert.equal(list.First(), null);
          }
        )
      })
    });

    /*
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
    }); */
  });
})();
