import { Controller } from "./controller.js";
import { Expense } from "./expense.js";
import { Transaction } from "./transaction.js";



const controller = new Controller();
controller.printExpenseLedger();
controller.printTransactionLedger();


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


document.getElementById("UAR_calculate_button").addEventListener("click", () => {
        controller.calculateUAR();
        window.localStorage.setItem("Paycheck_input",
            JSON.stringify(document.getElementById("Paycheck_input").value));
});

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