
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
    var isNumber = !isNaN(req.query.annualBaseSalary);

    if (isNumber) {
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
      let totalTax = incomeTax + medicareTax;

      result.superannuation = annuation;
      result.taxes.income = incomeTax;
      result.taxes.medicare = medicareTax;
      result.taxes.total = Math.round(totalTax);
      result.postTaxIncome = salary - totalTax;
    
      res.json(result);
    }
    else
    {
      var msg = {message: `Invalid Number: ${req.query.annualBaseSalary}`};
      res.status(400).json(msg);
    }
    
  });

  function computeSuperAnnuation(salary)
  {
    let percent = 0.095;
    return Math.round(salary * percent);
  }

  function computeIncomeTax(salary)
  {
    let incomeTax = 0.0
    let ceiling = salary;
    let taxBracket = [
      {bracket: 180000, tax: 0.45},
      {bracket: 87000, tax: 0.37},
      {bracket: 37000, tax: 0.325},
      {bracket: 18200, tax: 0.19}, 
      {bracket: 0, tax: 0}
    ];

    taxBracket.forEach(t => {
      if (salary > t.bracket) {
        let bracketComp = (ceiling - (t.bracket + 1)) * t.tax;
        console.log(bracketComp);
        incomeTax = incomeTax + Math.round(bracketComp);
        ceiling = t.bracket;
      }      
    });
    
    return Math.round(incomeTax);

  }

  function computeMedicare(salary)
  {
    let ceiling = salary;
    let medicare = 0.0;

    let taxBracket = [
      {bracket: 26668, tax: 0.02},
      {bracket: 21336, tax: 0.1}
    ];

    taxBracket.forEach(t => {
      if (salary > t.bracket) {
        let bracketComp = (ceiling - t.bracket) * t.tax;
        console.log(bracketComp);
        medicare = medicare + bracketComp;
        ceiling = t.bracket;
      }      
    });
    
    return medicare < 0.159 ? medicare : Math.round(medicare);

  }

  module.exports = router;