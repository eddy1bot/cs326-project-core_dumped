import { Controller } from "./controller.js";
import { Expense } from "./expense.js";
import { Transaction } from "./transaction.js";



const controller = new Controller();
controller.printExpenseLedger();
controller.printTransactionLedger();

/**
 * Event listener for "Add" expense button on bottom left of screen
 */
document.getElementById("add_expense_button").addEventListener("click", () => {
    //get the values from the fields
    const title = document.getElementById("expense_title").value;
    let tentativeAmount = document.getElementById("expense_amount").value;

    if(title === '' || tentativeAmount === '') {
        window.alert("Please enter the title and amount of an expense to add");
    } else {
        const amount =
        parseInt(tentativeAmount[0] === '$' ?
            tentativeAmount.slice(1) : tentativeAmount);

        const frequency = document.getElementById("expense_frequency").value;

        //create an expense object
        const expense = new Expense(title, amount, frequency);

        //add expense object to array ledger
        controller.addExpense(expense);
    }
});


/**
 * Event listener for "Remove" expense button on bottom left of screen
 */
document.getElementById("remove_expense_button").addEventListener("click", () => {
    //get the values from the fields
    const title = document.getElementById("expense_title").value;
    let tentativeAmount = document.getElementById("expense_amount").value;

    if(title === '' || tentativeAmount === '') {
        window.alert("Please enter the title and amount of an expense to remove");
    } else {
        const amount =
        parseInt(tentativeAmount[0] === '$' ?
            tentativeAmount.slice(1) : tentativeAmount);

        const frequency = document.getElementById("expense_frequency").value;

        //create an expense object
        const expense = new Expense(title, amount, frequency);

        //add expense object to array ledger
        controller.removeExpense(expense);
    }
});


/**
 * Event listener for "Remove" transaction button on bottom right of screen
 */
document.getElementById("remove_trans_button").addEventListener("click", () => {
        //get the values from the amount and transaction fields
        const description = document.getElementById("trans_des").value
        let tentativeAmount = document.getElementById("trans_amt").value;

        //check if amount is specified
        if(tentativeAmount === '' || description === '') {
            window.alert("Please enter the amount and description" +
                "of the transaction you wish to remove");
        } else {
            const amount =
            parseInt(tentativeAmount[0] === '$' ?
                tentativeAmount.slice(1) : tentativeAmount);

            const transaction = new Transaction(amount, description);

            //add expense object to array ledger
            controller.removeTransaction(transaction);

            document.getElementById("trans_amt").value = '';
            document.getElementById("trans_des").value = '';
        }
});


/**
 * Event listener for UAR "Calculate" button on top right of screen
 */
document.getElementById("UAR_calculate_button").addEventListener("click", () => {
        controller.calculateUAR();
        window.localStorage.setItem("Paycheck_input",
            document.getElementById("Paycheck_input").value);
});



/**
 * Event listener for transaction "POST" button in middle of screen
 */
document.getElementById("transaction_post").addEventListener("click", () => {
        //get the values from the amount and transaction fields
        const description =
        document.getElementById("transaction_des").value === '' ?
        "Unspecified" : document.getElementById("transaction_des").value;

        let tentativeAmount = document.getElementById("transaction_amt").value;

        //check if amount is specified
        if(tentativeAmount === '') {
            window.alert("Please enter the amount of the transaction to add");
        } else {
            const amount =
            parseInt(tentativeAmount[0] === '$' ?
                tentativeAmount.slice(1) : tentativeAmount);

            const transaction = new Transaction(amount, description);

            //add expense object to array ledger
            controller.addTransaction(transaction);

            document.getElementById("transaction_amt").value = '';
            document.getElementById("transaction_des").value = '';
        }
});


/**
 * Event listener for transaction "POST" button in middle of screen
 */
 document.getElementById("add_rev_button").addEventListener("click", () => {

    //confirm that current entered paycheck has been saved and that data
    // currently displayed on screen reflects current paycheck amount
    if (document.getElementById("Paycheck_input").value !=
        window.localStorage.getItem("Paycheck_input")) {
            window.alert("Please click the 'calculate' button to first" +
            " calculate the new paycheck amount before attempting to" +
            " add funds");
    } else {
        //get the value from the amount field
        let tentativeAmount = document.getElementById("add_rev_input").value;

        //check if amount is specified
        if(tentativeAmount === '') {
        window.alert("Please enter amount of additional revenue to add");
        } else {
            const amount =
            parseInt(tentativeAmount[0] === '$' ?
                tentativeAmount.slice(1) : tentativeAmount);

            console.log(controller.paycheck);
            console.log(typeof amount);
            controller.paycheck += amount;
            controller.calculateUAR();

            window.localStorage.setItem("Paycheck_input",
                JSON.stringify(controller.paycheck));

            document.getElementById("Paycheck_input").value =
                (controller.paycheck);

            document.getElementById("add_rev_input").value = '';
        }
    }
});