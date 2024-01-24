// 房贷计算


function calculateEqualInstallmentMonthlyPayment(principal, annualInterestRate, loanTermYears) {
    // 将年利率转换为月利率
    let monthlyInterestRate = annualInterestRate / 12 / 100;

    // 计算还款总期数
    let loanTermMonths = loanTermYears * 12;

    // 使用等额本息还款公式计算每月还款金额
    let monthlyPayment = principal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths)) / (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);

    return monthlyPayment.toFixed(2);
}

let loanPrincipal = 1000000; // 贷款本金
let annualInterestRate = 4.3; // 年化利率
let loanTermYears = 30; // 贷款期限（年）

let monthlyPayment = calculateEqualInstallmentMonthlyPayment(loanPrincipal, annualInterestRate, loanTermYears);

console.log("Monthly Payment:", monthlyPayment);






