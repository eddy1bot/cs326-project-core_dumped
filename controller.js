export class Controller {

    constructor() {
        //initalize the expense array
        if(window.localStorage.getItem('expenseLedger') === null) {
            this.expenseLedger = [];
        } else {
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

        //Initalize UAR
        this.UAR = 0;
        this.paycheck = 0;
    }


    /** Adds the given transaction the ledger array of transactions
     *
     * @param {transaction} object representing a transaction
     */
    addTransaction(object) {
        this.transactionLedger.push(object);

        //save changes
        window.localStorage.setItem('transactionLedger',
            JSON.stringify(this.transactionLedger));
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

        console.log(document.getElementById("Paycheck_input").value);
        if(document.getElementById("Paycheck_input").value != '') {
            this.calculateUAR();
        }
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

        //save changes
        window.localStorage.setItem('transactionLedger',
            JSON.stringify(this.transactionLedger));

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

        console.log(document.getElementById("Paycheck_input").value);
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
                v.title + " (" + v.frequency + ") - $" + v.amount + "\n\n";
        });
    }


    // fillValues() {
    //     console.log(window.localStorage.getItem('Paycheck_input'));
    //     if (window.localStorage.getItem('Paycheck_input') != null) {
    //         document.getElementById("Paycheck_input").value =
    //             window.localStorage.getItem('Paycheck_input');
    //     }

    // }

    calculateUAR() {
        //get paycheck and check for $
        const tentativePaycheck = document.getElementById("Paycheck_input").value;
        let paycheck =
        parseInt(tentativePaycheck[0] === '$' ?
            tentativePaycheck.slice(1) : tentativePaycheck);

        //check for valid input
        if(isNaN(paycheck)) {
            window.alert("Please enter a valid numberical paycheck amount");
        } else {

            this.expenseLedger.forEach( (v) => {
                if(v.frequency === 'Weekly') {
                    paycheck -= v.amount;
                } else if (v.frequency === 'Biweekly') {
                    paycheck -= (v.amount / 2);
                } else {
                    paycheck -= (v.amount / 4);
                }
            });
            document.getElementById("UAR_remaining").value = JSON.stringify(paycheck);
        }
    }
}