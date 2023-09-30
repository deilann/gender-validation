class oddInteger {

    #k;
    #n;

    constructor(k=0) {
        this.#k = k
        this.#n = 2*k + 1
    }
  
    plusPlus() {
      this.#k++
      this.#n += 2
    }
  
    minusMinus() {
      this.#k--
      this.#n -= 2
    }
  
    reset() {
      this.#k = 0
      this.#n = 1
    }

    getK() {
        return this.#k
    }

    getN() {
        return this.#n
    }

    valueOf() {
        return this.getK()
    }

    toString() {
        return this.getK()
    }

    makeDiff(a, b) {
        return (((a - b) % this.#n) + this.#n) % this.#n
    }
}