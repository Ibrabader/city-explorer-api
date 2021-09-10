'use strict';

class Cache {
  constructor() {
    this.Forcast = [];
    this.Movies = [];
    this.timeStamp = Date.now();
  }
}

module.exports = Cache;
