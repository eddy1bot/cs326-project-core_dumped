export class Transaction {
    constructor(amount, description) {
        this.amount = amount;
        this.description = description;
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
    getDescription() {
        return this.description;
    }
}