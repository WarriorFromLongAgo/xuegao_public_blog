console.log("======================================================");
let principal_1 = 105600
let interest_1 = 14400
// 砍头息 单利，但是优先要还利息
// calculateActualInterestRate(principal_1, interest_1)
function calculateActualInterestRate(principal, interest) {
    console.log("本金 = ", principal);
    console.log("利息 = ", interest);

    let interestRate = (interest / principal * 100).toFixed(2);
    console.log("利率 = ", interestRate);

    return interestRate;
}

console.log("======================================================");
// 金融服务费
let principal_2 = 120000
let interest_2 = 7942
calculateActualInterestRate_2(principal_2, interest_2)
function calculateActualInterestRate_2(principal, interest) {
    console.log("本金 = ", principal);
    console.log("利息 = ", interest);

    let interestRate = (interest / principal * 100).toFixed(2);
    console.log("利率 = ", interestRate);

    return interestRate;
}

console.log("======================================================");

















