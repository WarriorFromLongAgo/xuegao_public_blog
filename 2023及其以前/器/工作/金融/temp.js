function calculateActualInterestRate(principal, cashFlows) {
    let annualInterestRate = 0.1;  // 初始年化利率，可根据实际情况调整
    let tolerance = 0.0001;  // 容差值，控制迭代精度

    // 迭代计算实际年化利率
    for (let i = 0; i < 1000; i++) {
        let presentValue = 0;

        // 计算每期现金流的现值
        for (let j = 0; j < cashFlows.length; j++) {
            presentValue += cashFlows[j] / Math.pow(1 + annualInterestRate, j);
        }

        // 如果现值与零相差较小，则认为找到了合适的年化利率
        if (Math.abs(presentValue) < tolerance) {
            break;
        }

        // 调整年化利率
        annualInterestRate += presentValue / principal;
    }

    return (annualInterestRate * 100).toFixed(2);
}

let principal = -100; // 初始支出
let cashFlows = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]; // 每个月的现金流

let interestRate = calculateActualInterestRate(principal, cashFlows);

console.log("Actual Annual Interest Rate:", interestRate, "%");
