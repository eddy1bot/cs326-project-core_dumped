import { Controller } from "./controller.js";
import { Expense } from "./expense.js";




const controller = new Controller();




document.getElementById("add_expense_button").addEventListener("click", () => {
    //get the values from the fields
    const title = document.getElementById("expense_title").value;

    let tentativeAmount = document.getElementById("expense_amount").value;
    const amount =
        parseInt(tentativeAmount[0] === '$' ?
            tentativeAmount.slice(1) : tentativeAmount);

    const frequency = document.getElementById("expense_frequency").value;

    //create an expense object
    const expense = new Expense(title, amount, frequency);

    //add expense object to array ledger
    controller.addExpense(expense);

    document.getElementById("expense_list").value +=
    expense.formatLedgerEntry();

});
