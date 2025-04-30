function calculateLoan() {
    const area = parseFloat(document.getElementById('area').value);
    const costPerAcre = parseFloat(document.getElementById('costPerAcre').value);
    const expectedYield = parseFloat(document.getElementById('yield').value);
    const price = parseFloat(document.getElementById('price').value);
    const duration = parseFloat(document.getElementById('duration').value);
    const rate = parseFloat(document.getElementById('loanRate').value);
    
    // Get current language state from global
    const isTeluguActive = typeof isTeluguActive !== 'undefined' ? window.isTeluguActive : 
                           document.getElementById('globalLangToggle')?.checked;
    
    if (!area || !costPerAcre || !expectedYield || !price || !duration || !rate) {
      alert(isTeluguActive ? 'దయచేసి అన్ని ఫీల్డ్‌లను నింపండి' : 'Please enter all fields');
      return;
    }
    
    const totalCost = area * costPerAcre;
    const income = expectedYield * price;
    const profit = income - totalCost;
    const interest = (totalCost * rate * (duration / 12)) / 100;
    const totalRepayable = totalCost + interest;
    
    const labels = {
      totalCost: isTeluguActive ? "మొత్తం సాగు ఖర్చు" : "Total Cultivation Cost",
      expectedIncome: isTeluguActive ? "అంచనా ఆదాయం" : "Expected Income",
      expectedProfit: isTeluguActive ? "అంచనా లాభం" : "Expected Profit",
      loanInterest: isTeluguActive ? "రుణ వడ్డీ" : "Loan Interest",
      totalLoanRepayable: isTeluguActive ? "మొత్తం చెల్లించవలసిన రుణం" : "Total Loan Repayable"
    };
    
    document.getElementById('loanOutput').innerHTML = `
      <p><strong>${labels.totalCost}:</strong> ₹${totalCost.toFixed(2)}</p>
      <p><strong>${labels.expectedIncome}:</strong> ₹${income.toFixed(2)}</p>
      <p><strong>${labels.expectedProfit}:</strong> ₹${profit.toFixed(2)}</p>
      <p><strong>${labels.loanInterest}:</strong> ₹${interest.toFixed(2)}</p>
      <p><strong>${labels.totalLoanRepayable}:</strong> ₹${totalRepayable.toFixed(2)}</p>
    `;
  }