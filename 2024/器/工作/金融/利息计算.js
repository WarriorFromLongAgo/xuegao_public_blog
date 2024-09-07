// 已知本金，年限，利率，算利息








let principal = 120000
let years = 1
let interestRate = 0.12


// 单利
// 100万，单利利率3％，期限为3年
// 计算公式：本金 × （1 + 单利利率 × 期数）
// 单利：利率×3年×本金；
calculateSimpleInterest(principal, interestRate, years)
function calculateSimpleInterest(principal, interestRate, years) {
    console.log("----- 单利 单利 单利 -----");
    console.log("本金 = ", principal);
    console.log("贷款年限 = ", years);

    let interest = principal * interestRate * years;
    console.log("利息 = ", interest.toFixed(3));
    let averagePrice = (interest / years).toFixed(3)
    console.log("每年要还给银行的利息 = ", averagePrice);

    let amount = principal + interest;
    amount = amount.toFixed(3);
    console.log("要还给银行的总金额 = ", amount);

    return amount;
}

console.log("======================================================");

// 按年复利
// 100万本金，复利3％，期限为3年
// 计算公式：本金×（ 1+单利利率）^期数
// 年复利是每年结一次利息；
// 第二年是利息＋本金的和×1.45%的利率；
// 第三年是第二年结的本金和利息的和×1.45%的利息；
calculateYearlyCompoundInterest(principal, interestRate, years)
function calculateYearlyCompoundInterest(principal, interestRate, years) {
    console.log("----- 按年复利 按年复利 按年复利 -----");
    console.log("本金 = ", principal);
    console.log("贷款年限 = ", years);
    let interest = principal * Math.pow(1 + interestRate, years) - principal;
    console.log("利息 = ", interest.toFixed(3));
    let averagePrice = (interest / years).toFixed(3)
    console.log("每年要还给银行的利息 = ", averagePrice);

    let amount = principal + interest;
    amount = amount.toFixed(3);
    console.log("要还给银行的总金额 = ", amount);

    return amount;
}

console.log("======================================================");

// 同理，月复利是按照每个月结一次利息；
calculateMonthlyCompoundInterest(principal, interestRate, years * 12)
function calculateMonthlyCompoundInterest(principal, interestRate, months) {
    console.log("----- 按月复利 按月复利 按月复利 -----");
    console.log("本金 = ", principal);
    console.log("贷款月份 = ", months);

    let monthlyRate = interestRate / 12;
    let interest = principal * Math.pow(1 + monthlyRate, months) - principal;
    console.log("利息 = ", interest.toFixed(3));
    let averagePrice = (interest / years).toFixed(3)
    console.log("每年要还给银行的利息 = ", averagePrice);

    let amount = principal + interest;
    amount = amount.toFixed(3);
    console.log("要还给银行的总金额 = ", amount);

    return amount;
}


console.log("======================================================");

// 日复利是每日结一次利息；
calculateDailyCompoundInterest(principal, interestRate, years * 365)
function calculateDailyCompoundInterest(principal, interestRate, days) {
    console.log("----- 按日复利 按日复利 按日复利 -----");
    console.log("本金 = ", principal);
    console.log("贷款天数 = ", days);

    let dailyRate = interestRate / 365;
    let interest = principal * Math.pow(1 + dailyRate, days) - principal;
    console.log("利息 = ", interest.toFixed(3));
    let averagePrice = (interest / years).toFixed(3)
    console.log("每年要还给银行的利息 = ", averagePrice);

    let amount = principal + interest;
    amount = amount.toFixed(3);
    console.log("要还给银行的总金额 = ", amount);

    return amount;
}







