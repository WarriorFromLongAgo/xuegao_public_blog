// 等额本金
let loanPrincipal_1 = 1000000; // 贷款本金
let annualInterestRate_1 = 5.38; // 年化利率（单利）
let loanTermMonths_1 = 360; // 贷款期限（月）
// calculateEqualPrincipalMonthlyPayment_1(loanPrincipal_1, annualInterestRate_1, loanTermMonths_1);
function calculateEqualPrincipalMonthlyPayment_1(principal, annualInterestRate, loanTermMonths) {
    // 将年利率转换为月利率
    let monthlyInterestRate = annualInterestRate / loanTermMonths / 100;

    // 计算每月应还本金
    let monthlyPrincipalPayment = principal / loanTermMonths;

    for (let i = 1; i <= loanTermMonths; i++) {
        // 计算每月利息
        let interestPayment = (principal - monthlyPrincipalPayment * (i - 1)) * monthlyInterestRate;

        // 计算每月总还款金额
        let monthlyPayment = monthlyPrincipalPayment + interestPayment;

        console.log("第" + i + "个月，支付本金 = ", monthlyPrincipalPayment.toFixed(2));
        console.log("第" + i + "个月，支付利息 = ", interestPayment.toFixed(2));
        console.log("第" + i + "个月，支付本息 = ", monthlyPayment.toFixed(2));
        console.log("第" + i + "个月，剩余本金 = ", (principal - monthlyPrincipalPayment * i).toFixed(2));
        console.log("===========================================================");
    }
}

console.log("===========================================================");
console.log("===========================================================");
console.log("===========================================================");

calculateEqualInstallmentMonthlyPaymentDetails_2(loanPrincipal_1, annualInterestRate_1, loanTermMonths_1);
function calculateEqualInstallmentMonthlyPaymentDetails_2(principal, annualInterestRate, loanTermMonths) {
    // 将年利率转换为月利率
    let monthlyInterestRate = annualInterestRate / loanTermMonths / 100;

    // 使用等额本息还款公式计算每月还款金额
    let monthlyPayment = principal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths)) / (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);

    for (let i = 1; i <= loanTermMonths; i++) {
        // 计算每月利息
        let interestPayment = principal * monthlyInterestRate;
        // 计算每月本金
        let principalPayment = monthlyPayment - interestPayment;
        // 更新剩余本金
        principal -= principalPayment;

        console.log("第" + i + "个月，支付本息 = ", monthlyPayment.toFixed(2));
        console.log("第" + i + "个月，支付本金 = ", principalPayment.toFixed(2));
        console.log("第" + i + "个月，支付利息 = ", interestPayment.toFixed(2));
        console.log("第" + i + "个月，剩余本金 = ", principal.toFixed(2));
        console.log("===========================================================");
    }
}

// 如果你是张三，钱不能生钱，那么你不光应该选择等额本金，还应该只要一有钱就随时提前还款；
// 如果你是李四，钱非常能生钱，那么你不光不要提前还款，如果银行允许的话，最好中间连利息都不要还，等 30 年后再一次性把本金和利息都还了；
// 如果你是王五，没钱可还，那就只能尽可能晚还本金。

























