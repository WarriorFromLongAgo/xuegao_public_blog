function calculateActualInterestRate(principal, initialServiceFee, numberOfInstallments) {
    let totalRepayment = principal + initialServiceFee; // 总还款金额
    let totalInterest = totalRepayment - principal; // 总利息

    // 实际利率的计算公式
    let actualInterestRate = (totalInterest / principal) / (numberOfInstallments / 12) * 100;

    return actualInterestRate.toFixed(2);
}

let principal = 190000; // 贷款本金
let initialServiceFee = 5000; // 第一个月的金融服务费
let numberOfInstallments = 12; // 分期期数

let interestRate = calculateActualInterestRate(principal, initialServiceFee, numberOfInstallments);

console.log("Actual Annual Interest Rate:", interestRate, "%");
