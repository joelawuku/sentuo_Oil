function calculateSalary() {
    // Static values
    const dailyWage = 59.09;
    const hourlyWage = 5.91;
    const workHours = 10;
    const overtimeRate = 1.6149;
    const sstRate = 5.50 / 100;
    const otTaxRate = 7.16 / 100;
    const incomeTaxRate = 9.44 / 100;
    const TandT_Food = 150.00;

    // Get input values
    const basicSalary = parseFloat(document.getElementById('basic-salary').value);
    const workDays = parseFloat(document.getElementById('work-days').value);
    const overtimeDays = parseFloat(document.getElementById('overtime-days').value);
    const overtimeHours = parseFloat(document.getElementById('overtime-hours').value);
    const allowanceBonus = parseFloat(document.getElementById('allowance-bonus').value);
    const appraisal = document.getElementById('appraisal').value;

    // Validation
    if (isNaN(workDays) || isNaN(overtimeDays) || isNaN(overtimeHours) || isNaN(allowanceBonus)) {
        document.getElementById('result').innerHTML = `<p style="color: red;">Please enter valid numerical values.</p>`;
        return;
    }

    // Appraisal Value (A=400, B=300, C=200)
    let appraisalBonus = 0;
    if (appraisal === "A") {
        appraisalBonus = 400;
    } else if (appraisal === "B") {
        appraisalBonus = 300;
    } else if (appraisal === "C") {
        appraisalBonus = 200;
    }

    // Calculations
    const attendancePay = basicSalary;  // Use selected basic salary
    const totalOtHours = (overtimeDays * workHours) + overtimeHours;
    const otPay = hourlyWage * totalOtHours * overtimeRate;
    const grossSalary = attendancePay + otPay + allowanceBonus;
    const ssfDeduction = attendancePay * sstRate;
    const taxableIncome = grossSalary * 0.563;
    const otTax = otPay * otTaxRate;
    const incomeTax = taxableIncome * incomeTaxRate;
    const totalDeductions = otTax + incomeTax + ssfDeduction;
    const netSalary = grossSalary - totalDeductions;

    // Adjust Take Home based on Basic Salary
    let takeHome = netSalary + TandT_Food + appraisalBonus;

    if (basicSalary === 1500) {
        takeHome += 200; // Add 200 if Basic Salary is 1500
    } else if (basicSalary === 1400) {
        takeHome += 100; // Add 100 if Basic Salary is 1400
    } // 1300 case is handled by default (no addition)

    // Display result
    const resultHTML = `
        <p><strong>Basic Salary:</strong> GHC ${attendancePay.toFixed(2)}</p>
        <p><strong>Overtime Pay:</strong> GHC ${otPay.toFixed(2)}</p>
        <p><strong>Gross Salary:</strong> GHC ${grossSalary.toFixed(2)}</p>
        <p><strong>Net Salary:</strong> GHC ${netSalary.toFixed(2)}</p>
        <p><strong>Take Home:</strong> GHC ${takeHome.toFixed(2)}</p>
    `;
    document.getElementById('result').innerHTML = resultHTML;
}
