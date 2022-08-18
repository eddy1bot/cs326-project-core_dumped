export async function logExpense(object) {

    let title = object.title;
    let amt = object.amount;
    let freq = object.frequency;

    const response = await fetch(
        `/logExpense`,
        {
            method : 'POST',
            body: {title : title, amt : amt, freq : freq},
        }
    );
    const data = await response.json();
    return data;
}

export async function logTransaction(object) {

    let amt = object.amount;
    let des = object.description;

    const response = await fetch(
        `/logTransaction`,
        {
            method : 'POST',
            body: {amt : amt, des : des},
        }
    );
    const data = await response.json();
    return data;
}

export async function getExpenseLog() {
    const response = await fetch(
        `/getExpenseLog`,
        {
            method : 'GET',
        }
    );
    const data = await response.json();
    return data;
}

export async function getTransactionLog() {
    const response = await fetch(
        `/getTransactionLog`,
        {
            method : 'GET',
        }
    );
    const data = await response.json();
    return data;
}

export async function deleteExpense(object) {

    let title = object.title;
    let amt = object.amount;
    let freq = object.frequency;

    const response = await fetch(
        `/deleteExpense`,
        {
            method : 'DELETE',
            body : {title : title, amt : amt, freq : freq},
        }
    );
    const data = await response.json();
    return data;
}

export async function deleteTransaction(object) {

    let amt = object.amount;
    let des = object.description;

    const response = await fetch(
        `/deleteTransaction`,
        {
            method : 'DELETE',
            body : {amt : amt, des : des},
        }
    );
    const data = await response.json();
    return data;
}