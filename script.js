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

    // Appraisal Value (A=400, B=300, C=200, D=0)
    let appraisalBonus = 0;
    if (appraisal === "A") {
        appraisalBonus = 400;
    } else if (appraisal === "B") {
        appraisalBonus = 300;
    } else if (appraisal === "C") {
        appraisalBonus = 200;
    } else if (appraisal === "D") {
        appraisalBonus = 0;
    }

    // Adjustments based on Basic Salary
    let salaryAdjustment = 0;
    if (basicSalary === 1400) salaryAdjustment = 100;
    else if (basicSalary === 1500) salaryAdjustment = 200;
    else if (basicSalary === 1200) salaryAdjustment = -100;
    else if (basicSalary === 1100) salaryAdjustment = -200;
    else if (basicSalary === 1000) salaryAdjustment = -300;
    else if (basicSalary === 900) salaryAdjustment = -400;
    else if (basicSalary === 800) salaryAdjustment = -500;

    // Calculations
    const attendancePay = basicSalary; // Use selected basic salary
    const totalOtHours = (overtimeDays * workHours) + overtimeHours;
    const otPay = hourlyWage * totalOtHours * overtimeRate;
    const grossSalary = attendancePay + otPay + allowanceBonus;
    const ssfDeduction = attendancePay * sstRate;
    const taxableIncome = grossSalary * 0.563;
    const otTax = otPay * otTaxRate;
    const incomeTax = taxableIncome * incomeTaxRate;
    const totalDeductions = otTax + incomeTax + ssfDeduction;
    const netSalary = grossSalary - totalDeductions;
    const takeHome = netSalary + TandT_Food + appraisalBonus + salaryAdjustment;

    // Display all data
    const resultHTML = `
        <h3>Input Data</h3>
        <p><strong>Basic Salary:</strong> GHC ${basicSalary}</p>
        <p><strong>Work Days:</strong> ${workDays}</p>
        <p><strong>Overtime Days:</strong> ${overtimeDays}</p>
        <p><strong>Overtime Hours:</strong> ${overtimeHours}</p>
        <p><strong>Allowance & Bonus:</strong> GHC ${allowanceBonus}</p>
        <p><strong>Appraisal:</strong> ${appraisal}</p>
        <br><br>

        <h3>Calculated Results</h3>
        <p><strong>Attendance Pay (Basic Salary):</strong> GHC ${attendancePay.toFixed(2)}</p>
        <p><strong>Total Overtime Hours:</strong> ${totalOtHours.toFixed(2)} hours</p>
        <p><strong>Overtime Pay:</strong> GHC ${otPay.toFixed(2)}</p>
        <p><strong>Gross Salary:</strong> GHC ${grossSalary.toFixed(2)}</p>
        <p><strong>SSF Deduction (5.5% of Attendance Pay):</strong> GHC ${ssfDeduction.toFixed(2)}</p>
        <p><strong>Taxable Income (56.3% of Gross Salary):</strong> GHC ${taxableIncome.toFixed(2)}</p>
        <p><strong>Overtime Tax (7.16% of Overtime Pay):</strong> GHC ${otTax.toFixed(2)}</p>
        <p><strong>Income Tax (9.44% of Taxable Income):</strong> GHC ${incomeTax.toFixed(2)}</p>
        <p><strong>Total Deductions:</strong> GHC ${totalDeductions.toFixed(2)}</p>
        <p><strong>Net Salary:</strong> GHC ${netSalary.toFixed(2)}</p>
        <br><br>

        <h3>Final Take Home Salary</h3>
        <p><strong>Take Home Salary:</strong> GHC ${takeHome.toFixed(2)}</p>
    `;
    document.getElementById('result').innerHTML = resultHTML;
}


function clearFields() {
    // Clear all inputs
    document.getElementById('basic-salary').value = '';
    document.getElementById('work-days').value = '';
    document.getElementById('overtime-days').value = '';
    document.getElementById('overtime-hours').value = '';
    document.getElementById('allowance-bonus').value = '';
    document.getElementById('appraisal').value = 'A';

    // Clear the result section
    document.getElementById('result').innerHTML = '';
}
