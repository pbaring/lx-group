
const express = require('express');
const router = express.Router();

  
 /**
 * @api {get} /api/calculate-after-tax-income Compute Post Tax Income
 * @apiName calculate-after-tax-income 
 * @apiGroup api
 * @apiParam {float} annualBaseSalary.
 * @apiSuccess (Success 200) {Object} result computation
 */
  router.get('/', (req, res) => {
  
    //accessing get parameters
    var salary = parseFloat(req.query.annualBaseSalary);
    var result = {
        baseSalary: salary,
        superannuation: 0.0,
        taxes: {
            income: 0.0,
            medicare: 0.0,
            total: 0.0
        },
        postTaxIncome: 0.0

    };

    //computations
    let annuation = computeSuperAnnuation(salary);
    let incomeTax = computeIncomeTax(salary);
    let medicareTax = computeMedicare(salary);
    let totalTax = incomeTax + medicareTax ;

    result.superannuation = annuation;
    result.taxes.income = incomeTax;
    result.taxes.medicare = medicareTax;
    result.taxes.total = totalTax
    result.postTaxIncome = salary - totalTax;
  
    res.json(result);
  });

  function computeSuperAnnuation(salary)
  {
    let percent = 0.095;
    return Math.round(salary * percent);
  }

  function computeIncomeTax(salary)
  {
    let incomeTax = 0.0
    let last = salary;
    let taxBracket = [
      {bracket: 180000, tax: 0.45},
      {bracket: 87000, tax: 0.37},
      {bracket: 37000, tax: 0.325},
      {bracket: 18200, tax: 0.19}, 
      {bracket: 0, tax: 0}
    ];

    taxBracket.forEach(t => {
      if (salary > t.bracket) {
        let bracketComp = (last - (t.bracket + 1)) * t.tax;
        let comp = Math.round(bracketComp);
        console.log(comp);
        incomeTax = incomeTax + comp;
        last = t.bracket;
      }      
    });
    
    return incomeTax;

  }

  function computeMedicare(salary)
  {
    let percent = 0;

    if (salary > 0 && salary < 21336) {
        percent = 0;
    } 
    else if (salary >= 21336 && salary <= 26668) {
        percent = 0.1;
        salary = salary - 21336;

    } else
    {
        percent = 0.02;
    }

    var result = salary * percent; 

    return Math.round(result);

  }

  module.exports = router;