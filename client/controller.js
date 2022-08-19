import * as crud from "./clientCRUD.js";

export class Controller {

    constructor() {
        if(window.localStorage.getItem('Paycheck_input') === null) {
            //Initalize UAR
            this.UAR = 0;
            this.paycheck = 0;
        } else {
            //NOTE: this is super weird what I did here; for some reason
            // when I was retrieving the paycheck value, there were forward
            // slashes appended to the beginning and end which caused the
            // parseInt to continually return NaN. Therefore, in the
            // implementation below, I take the substring which ignores
            // the first and last characters and parse that to avoid
            // attempting to parse the "/" characters
            let paycheck_string = window.localStorage.getItem('Paycheck_input');
            this.paycheck = parseInt(paycheck_string);
            // this.paycheck = parseInt(paycheck_string.substring(1,
            //     (paycheck_string.length - 1)));

            document.getElementById("Paycheck_input").value = this.paycheck;

            this.UAR = parseInt(window.localStorage.getItem("UAR"));

            document.getElementById("UAR_remaining").value = this.UAR;
        }
    }

    async initalizeLedgers() {
        //initalize the expense array
        this.expenseLedger = await crud.getExpenseLedger();

        //initalize transaction ledger
        this.transactionLedger = await crud.getTransactionLedger();
    }


    /** Adds the given transaction the ledger array of transactions
     *
     * @param {transaction} object representing a transaction
     */
    addTransaction(object) {
        const isEqual = (first, second) => {
            return JSON.stringify(first) === JSON.stringify(second);
        }

        if (this.transactionLedger.some( (v) => isEqual(v, object))) {
                window.alert("Duplicate transactions are not allowed");
        } else {
            this.transactionLedger.push(object);

            this.printTransactionLedger();

            //save changes
            crud.logTransaction(object);

            //recalculate UAR
            if(document.getElementById("Paycheck_input").value != '') {
                this.calculateUAR();
            }
        }
    }


    /** Adds the given expense to the ledger array of expenses
     *
     * @param {expense} object representing an expense
     */
    addExpense(object) {

        const isEqual = (first, second) => {
            return JSON.stringify(first) === JSON.stringify(second);
        }

        //check for duplicate expense entries (which will blow up server lol)
        if (this.expenseLedger.some( (v) => isEqual(v, object))) {
            window.alert("Duplicate expenses are not allowed");
        } else {
            console.log("Object is: ");
            console.log(object);
            this.expenseLedger.push(object);

            this.printExpenseLedger();

            //save changes
            crud.logExpense(object);
            // window.localStorage.setItem('expenseLedger',
            //     JSON.stringify(this.expenseLedger));

            //recalculate
            if(document.getElementById("Paycheck_input").value != '') {
                this.calculateUAR();
            }
        }
    }


    /** Removes the given transaction the ledger array of transactions
     *
     * @param {transaction} object representing a transaction
     */
    removeTransaction(object) {
        for (let i = 0; i < this.transactionLedger.length; i++){
            if (JSON.stringify(this.transactionLedger[i]) ===
                JSON.stringify(object)) {
                this.transactionLedger.splice(i, 1);
                i--;
            }
        }
        this.printTransactionLedger();

        //save changes
        crud.deleteTransaction(object);
        // window.localStorage.setItem('transactionLedger',
        //     JSON.stringify(this.transactionLedger));

        //recalculate UAR
        if(document.getElementById("Paycheck_input").value != '') {
            this.calculateUAR();
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
        crud.deleteExpense(object);
        // window.localStorage.setItem('expenseLedger',
        //     JSON.stringify(this.expenseLedger));

        if(document.getElementById("Paycheck_input").value != '') {
            this.calculateUAR();
        }
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
                v.title + " (" + v.freq + ") - $" + v.amt + "\n\n";
        });
    }

    /**
     * Prints the current state of the expense ledger into the text area
     * which represents the visible expense ledger
     */
    printTransactionLedger() {
    //clear the visible ledger
    document.getElementById("transaction_list").value = '';

    //reprint ledger based on updated ledger array
    this.transactionLedger.forEach( (v) => {
        document.getElementById("transaction_list").value +=
            v.des + " - $" + v.amt + "\n";
    });
}


    calculateUAR() {
        //get paycheck and check for $
        const tentativePaycheck = document.getElementById("Paycheck_input").value;
        let paycheck = tentativePaycheck[0] === '$' ?
            tentativePaycheck.slice(1) : tentativePaycheck;
        paycheck = parseInt(paycheck);


        //check for valid input
        if(isNaN(paycheck)) {
            window.alert("Please enter a valid numberical paycheck amount");
        } else {

            console.log(paycheck);

            this.expenseLedger.forEach( (v) => {
                if(v.freq === 'Weekly') {
                    paycheck -= v.amt;
                } else if (v.freq === 'Biweekly') {
                    paycheck -= (v.amt / 2);
                } else {
                    paycheck -= (v.amt / 4);
                }
            });

            this.transactionLedger.forEach( (v) => {
                paycheck -= v.amt;
            });

            document.getElementById("UAR_remaining").value =
                JSON.stringify(paycheck);

            window.localStorage.setItem("UAR", JSON.stringify(paycheck));
        }
    }
}