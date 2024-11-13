function calculateLoan() {
    const loanAmount = document.getElementById("loanAmount").value;
    const interestRate = document.getElementById("interestRate").value;
    const loanTerm = document.getElementById("loanTerm").value;

    if (!loanAmount || !interestRate || !loanTerm) {
        alert("Please fill in all fields");
        return;
    }

    const monthlyInterestRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyPayment = (loanAmount * monthlyInterestRate) / 
        (1 - Math.pow((1 + monthlyInterestRate), -numberOfPayments));

    document.getElementById("result").innerText = 
        `Monthly Payment: $${monthlyPayment.toFixed(2)}`;
}