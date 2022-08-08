export class Expense {
    constructor(title, amount, frequency) {
        this.title = title;
        this.amount = amount;
        this.frequency = frequency;
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
        return this.amount;
    }

    /**
     *
     * @returns the string frequency of this expense object
     */
    getFrequency() {
        return this.frequency;
    }
}