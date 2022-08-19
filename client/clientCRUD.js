export async function logExpense(object) {

    let title = object.title;
    let amt = object.amt;
    let freq = object.freq;

    const response = await fetch(
        `/logExpense`,
        {
            headers: {
                'Content-Type' : 'application/json'
            },
            method : 'POST',
            body: JSON.stringify({title : title, amt : amt, freq : freq}),
        }
    );
}

export async function logTransaction(object) {

    let amt = object.amt;
    let des = object.des;

    console.log(amt);
    console.log(des);

    const response = await fetch(
        `/logTransaction`,
        {
            headers: {
                'Content-Type' : 'application/json'
            },
            method : 'POST',
            body: JSON.stringify({amt : amt, des : des}),
        }
    );
}

export async function getExpenseLedger() {
    const response = await fetch(
        `/getExpenseLog`,
        {
            method : 'GET',
        }
    );
    return await response.json();
}

export async function getTransactionLedger() {
    const response = await fetch(
        `/getTransactionLog`,
        {
            method : 'GET',
        }
    );
    return await response.json();
}

export async function deleteExpense(object) {

    let title = object.title;
    let amt = object.amt;
    let freq = object.freq;

    const response = await fetch(
        `/deleteExpense`,
        {
            headers: {
                'Content-Type' : 'application/json'
            },
            method : 'DELETE',
            body : JSON.stringify({title : title, amt : amt, freq : freq}),
        }
    );
}

export async function deleteTransaction(object) {

    let amt = object.amt;
    let des = object.des;

    const response = await fetch(
        `/deleteTransaction`,
        {
            headers: {
                'Content-Type' : 'application/json'
            },
            method : 'DELETE',
            body : JSON.stringify({amt : amt, des : des}),
        }
    );
}