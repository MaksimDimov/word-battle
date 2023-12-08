'use strict';

class Score {
    #date;
    #hits;
    #persentage;
  
    constructor(date, hits, persentage) {
      this.#date = date;
      this.#hits = hits;
      this.#persentage = persentage;
    }
  
    get date() {
      return this.#date;
    }
  
    get hits() {
      return this.#hits;
    }
  
    get persentage() {
      return this.#persentage;
    }
  
    getInfo() {
      return `${this.#date}, ${this.#hits},  ${this.#persentage}`;
    }
  }

  export default Score;