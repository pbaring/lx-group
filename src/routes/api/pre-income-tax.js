
const express = require('express');
const router = express.Router();

  
  //with parameters
  router.get('/', (req, res) => {
  
    //accessing get parameters
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
    return roundToHundredth(salary * percent); //rounded to nearest cent

  }

  function computeIncomeTax(salary)
  {
    let percent = 0;

    if (salary > 0 && salary < 18201) {
        //0
        percent = 0;
    } 
    else if (salary > 18200 && salary < 37001) {
        //19%
        percent = 0.19;
    } else if(salary > 37000 && salary < 87001)
    {
        //32.5%       
        percent = 0.325;
    } else if(salary > 87000 && salary < 180001)
    {
        //37%        
        percent = 0.37;
    }      
    else {
      //over $180,000
      //45 %      
      percent = 0.45;
    }

    return salary * percent; //rounded to nearest cent

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

    return roundToHundredth(result);

  }

  function roundToHundredth(value)
  {
    return Number(value.toFixed(2));
  }

  module.exports = router;