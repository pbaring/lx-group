
const express = require('express');
const router = express.Router();
const calc = require('../../services/income-calculator')

  
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
      let annuation = calc.computeSuperAnnuation(salary);//computeSuperAnnuation(salary);
      let incomeTax = calc.computeIncomeTax(salary);
      let medicareTax = calc.computeMedicare(salary);
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

  module.exports = router;