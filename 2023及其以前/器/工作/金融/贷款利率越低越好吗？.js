// 有人可能会觉得，这还用问吗，肯定是选利率低的。先别急，我们来看两个具体的贷款例子：
// 贷款 A：本金 120,000 元，年化利率（单利） 10%，还款方式先息后本；
// 贷款 B：本金 120,000 元，年化利率（单利） 12%，还款方式等额本息。

// 两个贷款的还款情况如下：
// 贷款 A：每个月还款 1,000 元利息，总计还款 12,000 元利息；
// 贷款 B：每个元还款 10,662 元本息，总计还款 127,942 元本息，其中 7,942 元是利息。

// 贷款a
function calculateTotalInterest_1(principal, annualInterestRate, months) {
    let totalInterest = 0;
    let monthlyInterestRate = annualInterestRate / loanTermMonths_1 / 100;

    for (let i = 1; i <= months; i++) {
        let monthlyInterest = principal * monthlyInterestRate;
        console.log("第" + i + "个月的利息 = ", monthlyInterest);
        totalInterest += monthlyInterest;
        console.log("第" + i + "个月的还款的利息总额 = ", totalInterest);
    }

    let totalAmountPaid = parseFloat(totalInterest) + principal;
    console.log("最后一个月的还款的利息总额 = ", totalAmountPaid);
    let effectiveAnnualRate = (totalAmountPaid / principal - 1) / (loanTermMonths_1 / 12) * 100;
    let actualInterestRate = effectiveAnnualRate.toFixed(2);

    console.log("Actual Interest Rate:", actualInterestRate + "%");

    return totalInterest.toFixed(2);
}

let loanPrincipal_1 = 120000; // 贷款本金
let annualInterestRate_1 = 10; // 年化利率（单利）
let loanTermMonths_1 = 12; // 贷款期限（月）
calculateTotalInterest_1(loanPrincipal_1, annualInterestRate_1, loanTermMonths_1);


// =======================================================================================
// =======================================================================================
// =======================================================================================

// 计算等额本息每月还款金额
function calculateEqualMonthlyPayment_2(principal, annualInterestRate, loanTermMonths) {
    // 将年利率转换为月利率
    let monthlyInterestRate = annualInterestRate / loanTermMonths / 100;
    console.log("calculateEqualMonthlyPayment_2 利率 = ", monthlyInterestRate);
    // 使用等额本息还款公式计算每月还款金额
    let monthlyPayment = (principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -loanTermMonths));
    console.log("calculateEqualMonthlyPayment_2 monthlyPayment = ", monthlyPayment);

    // 保留两位小数并返回
    return monthlyPayment.toFixed(2);
}

// 生成等额本息摊销表
function generateAmortizationSchedule_2(principal, annualInterestRate, loanTermMonths) {
    let monthlyInterestRate = annualInterestRate / loanTermMonths / 100;
    let monthlyPayment = calculateEqualMonthlyPayment_2(principal, annualInterestRate, loanTermMonths);

    let amortizationSchedule = [];

    // 循环计算每月的本金、利息、剩余本金，并将结果添加到摊销表中
    for (let i = 1; i <= loanTermMonths; i++) {
        let interestPayment = principal * monthlyInterestRate;
        let principalPayment = monthlyPayment - interestPayment;

        console.log("第" + i + "个月，支付本金 = ", principalPayment.toFixed(2));
        console.log("第" + i + "个月，支付利息 = ", interestPayment.toFixed(2));
        console.log("第" + i + "个月，支付本息 = ", monthlyPayment);
        console.log("第" + i + "个月，剩余本金 = ", (principal - principalPayment).toFixed(2));
        console.log("===========================================================");

        amortizationSchedule.push({
            month: i,
            // 支付本金
            principalPayment: principalPayment.toFixed(2),
            // 支付利息
            interestPayment: interestPayment.toFixed(2),
            // 剩余本金
            remainingPrincipal: (principal - principalPayment).toFixed(2),
        });

        principal -= principalPayment;
    }

    // 返回摊销表
    return amortizationSchedule;
}

// 计算等额本息总还款额
function calculateTotalRepayment_2(monthlyPayment, loanTermMonths) {
    // 总还款额等于每月还款金额乘以还款期数
    return (monthlyPayment * loanTermMonths).toFixed(2);
}


// 贷款信息
let loanPrincipal_2 = 120000; // 贷款本金
let annualInterestRate_2 = 12; // 年化利率（单利）
let loanTermMonths_2 = 12; // 贷款期限（月）
// 计算每月还款金额
let monthlyPayment = calculateEqualMonthlyPayment_2(loanPrincipal_2, annualInterestRate_2, loanTermMonths_2);

// 计算总还款额
let totalRepayment = calculateTotalRepayment_2(monthlyPayment, loanTermMonths_2);

// 生成摊销表
let amortizationSchedule = generateAmortizationSchedule_2(loanPrincipal_2, annualInterestRate_2, loanTermMonths_2);
// 打印结果到控制台
console.log("每个月需要支付的利息 = ", monthlyPayment);
console.log("总共的 支付本息 = ", totalRepayment);
console.log("总共的 支付利息 = ", totalRepayment - loanPrincipal_2);
console.log("Amortization Schedule:", JSON.stringify(amortizationSchedule));



// =======================================================================================
// =======================================================================================
// =======================================================================================
// 我们再来看一个例子，现在有张三、李四和王五三个人都需要贷款 120,000 元，他们自身的情况各不相同：
// 张三：打工人，每个月有 8,000 元收入。工资现金发放，放在家里没有利息；
// 李四：打工人，每个月有 8,000 元收入。每个月的工资会用来炒股，江湖人称小股神，年化收益率 20% 从未失手；
// 王五：做生意，第一年收入很少，每个月可能只有 1000 元，一年后会有一笔 150,000 元的收入。

// 现在他们可以选择的还是刚才的两个贷款：
// 贷款 A：先息后本，利率 10%，每个月还款 1,000 元利息，总计还款 12,000 元利息；
// 贷款 B：等额本息，利率 12%，每个元还款 10,662 元本息，总计还款 127,942 元本息，其中 7,942 元是利息。

// 对于张三来说
// 一年收入是 96,000 元。如果选择贷款 A，一年后将会剩下 84,000 元；
// 如果选择贷款 B，一年后将会剩下 88,058 元。
// 对于张三来说，应该选择贷款 B。

// 对李四来说，如果选择贷款 A，则每个月的工资可以用来炒股，赚取 20% 的年化收益率，同时需要为这部分本金付出 10% 的利息，相当于净赚 10% 的利息差；而如果选择贷款 B，只能用每个月还款后剩余的工资用来炒股，而且还要为这些本金付出 12% 的利息，相对于贷款 A 来说，用更少的本金赚了更少的利息差。不用具体的计算数字，也能看出应该选择贷款 A。

// 对于王五来说，初步一看他好像没得选，只能选择贷款 A，因为要等到一年后才还得起本金。



// 选择还款方式就是选择了对本金的使用方式，所以选择哪种还款方式，就取决于每个人对本金的诉求：
// 对于没有办法让资金产生更大收益的人，例如张三，就应该选择对本金占用时间最短的还款方式，能还就尽快还；
// 对于可以让资金产生更大收益的人，例如李四，就应该选择对本金占用时间更长的还款方式，能用就尽量用；
// 对于短期内缺钱的人，例如王五，就应该尽可能推迟本金归还的时间。
















