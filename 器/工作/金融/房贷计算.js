// 房贷计算

// 获取每个月要还款的金额
function calculateMonthlyPaymentDetails(principal, annualInterestRate, remainingLoanTermMonths) {
    // 将年利率转换为月利率
    let monthlyInterestRate = annualInterestRate / 12 / 100;

    for (let i = 1; i <= remainingLoanTermMonths; i++) {
        // 使用等额本息还款公式计算每月还款金额
        let monthlyPayment = principal * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -remainingLoanTermMonths));
        // 计算每月利息
        let interestPayment = principal * monthlyInterestRate;
        // 计算每月本金
        let principalPayment = monthlyPayment - interestPayment;
        // 更新剩余本金
        principal -= principalPayment;

        console.log("月还款利息 =", interestPayment.toFixed(2));
        console.log("月还款本金 =", principalPayment.toFixed(2));
        console.log("月还款本息 =", (interestPayment + principalPayment).toFixed(2));
        console.log("剩余本金 =", principal.toFixed(2));
        console.log("======================================================");
    }
}

let loanPrincipal_1 = 887544.22; // 贷款本金
let annualInterestRate_1 = 4.3; // 年化利率
let loanTermMonths_1 = 327; // 贷款期限（年）

calculateMonthlyPaymentDetails(loanPrincipal_1, annualInterestRate_1, loanTermMonths_1);

// 月还款利息 = 3180.37
// 月还款本金 = 1432.03
// 月还款本息 = 4612.39
// 剩余本金 = 886112.19
// ======================================================
// 月还款利息 = 3175.24
// 月还款本金 = 1429.72
// 月还款本息 = 4604.95
// 剩余本金 = 884682.47
// ======================================================
// 月还款利息 = 3170.11
// 月还款本金 = 1427.41
// 月还款本息 = 4597.52
// ======================================================
