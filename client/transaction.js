export class Transaction {
    constructor(amount, description) {
        this.amt = amount;
        this.des = description;
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
    getDescription() {
        return this.des;
    }
}