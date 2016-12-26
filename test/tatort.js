(() => {
  'use strict';

  let moment = require('moment-timezone');
  let assert = require('assert')
  let fs = require('fs');

  describe('Tatort', () => {
    let Tatort = require(__dirname + '/../');
    let t = new Tatort('tvdirekt', fs.readFileSync(__dirname + '/fixtures/example.html'));

    describe('list()', () => {
      it('should return a list of upcoming Tatort shows',
        () => t.list().then(
          (list) => {
            assert.equal(list.Count(), 10)

            var cur = list.Next();
            assert.equal(cur.name, 'Im Namen des Vaters')

            cur = list.Next();
            assert.equal(cur.name, 'Klingelingeling')
          }
        )
      );

      it('should return a GMT+1 timestamp',
        () => t.list().then(
          (list) => {
            assert.ok((list.First().date + "").indexOf('GMT+0100'))
          }
        )
      );
    });

    describe('after()', () => {
      it('should return shows after specified date #1',
        () => t.after(
          new Date(2016, 11, 1, 0, 0, 0)
        ).then(
          list => {
            assert(list.First().name, 'Im Namen des Vaters');
          }
        )
      );

      it('should return shows after specified date #2',
        () => t.after(
          new Date(2016, 11, 26, 0, 0, 0)
        ).then(
          list => {
            assert(list.First().name, 'Klingelingeling');
          }
        )
      );

      it('should return shows after specified date #3',
        () => t.after(
          new Date(Date.UTC(2016, 11, 28, 20, 59, 59))
        ).then(
          list => {
            assert(list.First().name, 'Der Hammer');
          }
        )
      );

      it('should return shows after specified date #4',
        () => t.after(
          moment.tz(Date.UTC(2016, 11, 28, 21, 0, 1), 'Europe/Berlin')
        ).then(
          list => {
            assert.equal(list.First().name, 'Der Hammer');
          }
        )
      );

      it('should return shows after specified date #5',
        () => t.after(
          moment.tz(Date.UTC(2016, 11, 28, 22, 0, 1), 'Europe/Berlin')
        ).then(
          list => {
            assert.equal(list.First(), null);
          }
        )
      );
    });

    describe('between', () => {
      it('should filter shows #1',
        () => t.between(
          moment.tz(Date.UTC(2016, 11, 28, 19, 0, 0), 'Europe/Berlin'),
          moment.tz(Date.UTC(2016, 11, 28, 22, 0, 1), 'Europe/Berlin')
        ).then(
          list => {
            assert.equal(list.Count(), 3);
          }
        )
      );

      it('should filter shows #2',
        () => t.between(
          moment.tz(Date.UTC(2016, 11, 26, 20, 0, 0), 'Europe/Berlin'),
          moment.tz(Date.UTC(2016, 11, 26, 20, 5, 0), 'Europe/Berlin')
        ).then(
          list => {
            assert.equal(list.Count(), 1);
          }
        )
      );
    });
  });
})();
