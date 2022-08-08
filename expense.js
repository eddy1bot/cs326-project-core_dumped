export class Expense {
    constructor(title, amount, frequency) {
        this.title = title;
        this.amount = amount;
        this.frequency = frequency;
    }

    getTitle() {
        return this.title;
    }

    getAmount() {
        return this.amount;
    }

    getFrequency() {
        return this.frequency;
    }

    formatLedgerEntry() {
        return this.title + " (" + this.frequency + ") - $" + this.amount + "\n\n";
    }
}