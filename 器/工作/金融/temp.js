function calculateEqualPrincipalMonthlyPayment(principal, annualInterestRate, loanTermMonths) {
    // 将年利率转换为月利率
    let monthlyInterestRate = annualInterestRate / 12 / 100;

    let amortizationSchedule = [];

    for (let i = 1; i <= loanTermMonths; i++) {
        // 计算每月应还本金
        let monthlyPrincipalPayment = principal / loanTermMonths;

        // 计算每月利息
        let interestPayment = (principal - monthlyPrincipalPayment * (i - 1)) * monthlyInterestRate;

        // 计算每月总还款金额
        let monthlyPayment = monthlyPrincipalPayment + interestPayment;

        amortizationSchedule.push({
            month: i,
            principalPayment: monthlyPrincipalPayment.toFixed(2),
            interestPayment: interestPayment.toFixed(2),
            totalPayment: monthlyPayment.toFixed(2),
            remainingPrincipal: (principal - monthlyPrincipalPayment * i).toFixed(2),
        });
    }

    return amortizationSchedule;
}

let loanPrincipal = 120000; // 贷款本金
let annualInterestRate = 12; // 年化利率（单利）
let loanTermMonths = 12; // 贷款期限（月）

let amortizationSchedule = calculateEqualPrincipalMonthlyPayment(loanPrincipal, annualInterestRate, loanTermMonths);

console.log("Amortization Schedule:", JSON.stringify(amortizationSchedule));
