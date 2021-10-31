const incomeTaxBracket = [
  {bracket: 0, tax: 0},
  {bracket: 18200, tax: 0.19},
  {bracket: 37000, tax: 0.325},
  {bracket: 87000, tax: 0.37},
  {bracket: 180000, tax: 0.45}
];

const medTaxBracket = [      
  {bracket: 0, tax: 0},
  {bracket: 21336, tax: 0.1},
  {bracket: 26668, tax: 0.02}
];


const computeSuperAnnuation = function(salary){
    let percent = 0.095;
    return Math.round(salary * percent);
}

const computeIncomeTax = function(salary){
    let incomeTax = 0.0
    let ceiling = salary;
    let taxBracket = incomeTaxBracket.slice().reverse();

    taxBracket.forEach(t => {
      if (salary > t.bracket) {
        let bracketComp = (ceiling - (t.bracket + 1)) * t.tax;
        incomeTax = incomeTax + Math.round(bracketComp);
        ceiling = t.bracket;
      }      
    });
    
    return Math.round(incomeTax);
}

const computeMedicare = function(salary){
    let ceiling = salary;
    let medicare = 0.0;
    let taxBracket = medTaxBracket.slice().reverse();

    taxBracket.forEach(t => {
      if (salary > t.bracket) {
        let bracketComp = (ceiling - t.bracket) * t.tax;
        medicare = medicare + bracketComp;
        ceiling = t.bracket;
      }      
    });
    
    return medicare < 0.159 ? roundToHundredth(medicare) : Math.round(medicare);
}

const computeTaxBreakdown = function(netPay)
  {
    let iTaxBracket = incomeTaxBracket;
    let mTaxBracket = medTaxBracket;

    //find salary
    let salary = 0.0;
    let initNetPayComp = {postTaxIncome: netPay, incomeTax: 0, medicareTax: 0, totalTax: 0, salary: netPay};

    for (let i = 1; i < mTaxBracket.length; i++) {
      let medTax = mTaxBracket[i];   

      let compMedTax = ((-1 * medTax.bracket) * medTax.tax) + computeMedicare(medTax.bracket);
      for (let j = 1; j < iTaxBracket.length; j++) {
        let incomeTax = iTaxBracket[j];
        
        let compIncomeTax = ((-1 * (incomeTax.bracket + 1)) * incomeTax.tax) + computeIncomeTax(incomeTax.bracket);        
 
        //sum of income tax percent and med tax percent
        let miTaxSum = 1 - (incomeTax.tax + medTax.tax); 

        //salary computation
        salary = (netPay + Math.round(compIncomeTax) + Math.round(compMedTax))/miTaxSum;
        
        let roundedSalary = Math.round(salary);
        let netPayComp = getNetPay(roundedSalary);

        let roundedNetPay = Math.round(netPay);
        let roundedNetPayComp = Math.round(netPayComp.postTaxIncome);
        let min = roundedNetPay-1;
        let max = roundedNetPay +1;

        if (roundedNetPayComp >= min && roundedNetPayComp <= max) {
          return netPayComp;
        }        
      }

    }
      
    return initNetPayComp;

  }

function getNetPay(salary)
{        
    let incomeTax = computeIncomeTax(salary);
    let medicareTax = computeMedicare(salary);
    let totalTax = Math.round(incomeTax + medicareTax);
    let postTaxIncome = salary - totalTax;

    return {postTaxIncome: postTaxIncome, incomeTax: incomeTax, medicareTax: medicareTax, totalTax: totalTax, salary: salary};
}

function roundToHundredth(value)
{
  return Number(value.toFixed(2));
}

module.exports = {computeSuperAnnuation, computeIncomeTax, computeMedicare, computeTaxBreakdown};