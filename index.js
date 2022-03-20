class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    return this.transactions.reduce((previousValue, currentValue) =>
      previousValue + currentValue.value, 0)
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor (amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
   return -this.amount
 }
 isAllowed() {
   return (this.account.balance - this.amount >= 0)
 }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}






// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");

console.log('Balance:', myAccount.balance);

t1 = new Withdrawal(50.25, myAccount);
console.log(t1.commit());
console.log(myAccount.transactions);

t2 = new Deposit(9.99, myAccount);
console.log(t2.commit());
console.log(myAccount.transactions);

t3 = new Withdrawal(9, myAccount);
console.log(t3.commit());
console.log(myAccount.transactions);

console.log("Ending balance: ", myAccount.balance);

