export class Controller {

    constructor() {
        //initalize the expense array
        this.expenseLedger = [];

        //initalize transaction ledger
        this.transactionLedger = [];
    }


    addTransaction(object) {
        transactionLedger.push(object);
    }

    addExpense(object) {
        expenseLedger.push(object);
    }

    removeTransaction(object) {
        for (let i = 0; i < this.transactionLedger.length; i++){
            if (this.transactionLedger[i] === object) {
                this.transactionLedger.splice(i, 1);
                i--;
            }
        }
    }

    removeExpense(object) {
        for (let i = 0; i < this.expenseLedger.length; i++){
            if (this.expenseLedger[i] === object) {
                this.expenseLedger.splice(i, 1);
                i--;
            }
        }
    }


}