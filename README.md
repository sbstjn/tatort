# Tatort

Query for upcoming [Tatort](http://www.daserste.de/unterhaltung/krimi/tatort/index.html) shows.

## Installation

```bash
$ > npm install tatort
```

## Usage

```bash
let Tatort = require('tatort');

Tatort.next().then(
  (item) => {
    console.log(item.name, item.date, item.channel);
  }
);
```

## License

Feel free to use the code, it's released using the [MIT license](https://github.com/sbstjn/tatort/blob/master/LICENSE.md).

## Contributors

- [Sebastian Müller](https://sbstjn.com)
