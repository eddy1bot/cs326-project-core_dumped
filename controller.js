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

        //initalize transaction ledger
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


    /** Adds the given transaction the ledger array of transactions
     *
     * @param {transaction} object representing a transaction
     */
    addTransaction(object) {
        this.transactionLedger.push(object);

        this.printTransactionLedger();

        //save changes
        window.localStorage.setItem('transactionLedger',
            JSON.stringify(this.transactionLedger));

        //recalculate UAR
        if(document.getElementById("Paycheck_input").value != '') {
            this.calculateUAR();
        }
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

        //recalculate
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
            if (JSON.stringify(this.transactionLedger[i]) ===
                JSON.stringify(object)) {
                this.transactionLedger.splice(i, 1);
                i--;
            }
        }
        this.printTransactionLedger();

        //save changes
        window.localStorage.setItem('transactionLedger',
            JSON.stringify(this.transactionLedger));

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
        window.localStorage.setItem('expenseLedger',
            JSON.stringify(this.expenseLedger));

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
            v.description + " - $" + v.amount + "\n";
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

            this.expenseLedger.forEach( (v) => {
                if(v.frequency === 'Weekly') {
                    paycheck -= v.amount;
                } else if (v.frequency === 'Biweekly') {
                    paycheck -= (v.amount / 2);
                } else {
                    paycheck -= (v.amount / 4);
                }
            });

            this.transactionLedger.forEach( (v) => {
                paycheck -= v.amount;
            });

            document.getElementById("UAR_remaining").value =
                JSON.stringify(paycheck);

            window.localStorage.setItem("UAR", JSON.stringify(paycheck));
        }
    }
}