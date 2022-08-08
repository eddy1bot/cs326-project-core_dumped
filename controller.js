export class Controller {

    constructor() {
        //initalize the expense array
        if(window.localStorage.getItem('expenseLedger') === null) {
            this.expenseLedger = [];
        } else {
            console.log('true');
            this.expenseLedger =
                JSON.parse(window.localStorage.getItem('expenseLedger'));
        }

        //initalize transaction ledger
        if(window.localStorage.getItem('transactionLedger') === null) {
            this.transactionLedger = [];
        } else {
            this.transactionLedger =
                JSON.parse(window.localStorage.getItem('transactionLedger'));
        }
    }


    /** Adds the given transaction the ledger array of transactions
     *
     * @param {transaction} object representing a transaction
     */
    addTransaction(object) {
        this.transactionLedger.push(object);
    }


    /** Adds the given expense to the ledger array of expenses
     *
     * @param {expense} object representing an expense
     */
    addExpense(object) {
        this.expenseLedger.push(object);

        this.printExpenseLedger();

        //save changes
        window.localStorage.setItem('expenseLedger',
            JSON.stringify(this.expenseLedger));
    }


    /** Removes the given transaction the ledger array of transactions
     *
     * @param {transaction} object representing a transaction
     */
    removeTransaction(object) {
        for (let i = 0; i < this.transactionLedger.length; i++){
            if (this.transactionLedger[i] === object) {
                this.transactionLedger.splice(i, 1);
                i--;
            }
        }
    }

    /** Removes the given expense to the ledger array of expenses
     *
     * @param {expense} object representing an expense
     */
    removeExpense(object) {
        for (let i = 0; i < this.expenseLedger.length; i++){
            if (JSON.stringify(this.expenseLedger[i]) ===
                JSON.stringify(object)) {

                this.expenseLedger.splice(i, 1);
                i--;
            }
        }
        this.printExpenseLedger();

        //save changes
        window.localStorage.setItem('expenseLedger',
        JSON.stringify(this.expenseLedger));
    }

    /**
     * Prints the current state of the expense ledger into the text area
     * which represents the visible expense ledger
     */
    printExpenseLedger() {
        //clear the visible ledger
        document.getElementById("expense_list").value = '';

        //reprint ledger based on updated ledger array
        this.expenseLedger.forEach( (v) => {
            document.getElementById("expense_list").value +=
                v.title + " (" + v.frequency + ") - $" + v.amount + "\n\n";
        });
    }
}