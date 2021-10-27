
const express = require('express');
const router = express.Router();
const calc = require('../../services/income-calculator')


   /**
 * @api {get} /api/calculate-pre-tax-income-from-take-home Compute Base Salary
 * @apiName calculate-pre-tax-income-from-take-home
 * @apiGroup api
 * @apiParam {float} postTaxSalary.
 * @apiSuccess (Success 200) {Object} result computation
 */
  router.get('/', (req, res) => {
  
    //accessing get parameters    
    var isNumber = !isNaN(req.query.postTaxSalary);

    if (isNumber) {      
      var postSalary = parseFloat(req.query.postTaxSalary);
      var result = {
          baseSalary: 0.0,
          superannuation: 0.0,
          taxes: {
              income: 0.0,
              medicare: 0.0,
              total: 0.0
          },
          postTaxIncome: postSalary

      };

    // //computations    
    //{postTaxIncome: postTaxIncome, incomeTax: incomeTax, medicareTax: medicareTax, totalTax: totalTax, salary: salary}
    let netPay = Math.round(postSalary);
    let comp = calc.computeTaxBreakdown(netPay)
    let salary = comp.salary;
    let annuation = calc.computeSuperAnnuation(salary);
    let incomeTax = comp.incomeTax;
    let medicareTax = comp.medicareTax;
    let totalTax = comp.totalTax;

    result.superannuation = annuation;
    result.taxes.income = incomeTax;
    result.taxes.medicare = medicareTax;
    result.taxes.total = totalTax
    result.baseSalary = salary;
  
    res.json(result);
    }
    else
    {
      var msg = {message: `Invalid Number: ${req.query.postTaxSalary}`};
      res.status(400).json(msg);
    }

 });
 
  module.exports = router;