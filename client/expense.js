export class Expense {
    constructor(title, amount, frequency) {
        this.title = title;
        this.amt = amount;
        this.freq = frequency;
    }

    /**
     *
     * @returns the string title of this expense object
     */
    getTitle() {
        return this.title;
    }

    /**
     *
     * @returns the int amount of this expense object
     */
    getAmount() {
        return this.amt;
    }

    /**
     *
     * @returns the string frequency of this expense object
     */
    getFrequency() {
        return this.freq;
    }
}