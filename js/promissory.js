// Toggle language within promissory note view
function toggleLanguage() {
  const showTelugu = document.getElementById('langToggle').checked;
  
  // Update global language state if it exists
  if (typeof isTeluguActive !== 'undefined') {
    window.isTeluguActive = showTelugu;
    document.getElementById('globalLangToggle').checked = showTelugu;
    applyGlobalLanguage();
  }
  
  // Update UI labels
  const labelPrincipal = document.getElementById('labelPrincipal');
  const labelRate = document.getElementById('labelRate');
  const labelStart = document.getElementById('labelStart');
  const labelEnd = document.getElementById('labelEnd');
  const toggleText = document.getElementById('toggleText');
  const calcBtn = document.getElementById('calcBtn');
  const pageTitle = document.getElementById('pageTitle');
  
  if (showTelugu) {
    labelPrincipal.textContent = 'మూలధన మొత్తం (₹):';
    labelRate.textContent = 'వడ్డీ శాతం (% నెలకు):';
    labelStart.textContent = 'ప్రారంభ తేదీ:';
    labelEnd.textContent = 'ముగింపు తేదీ:';
    toggleText.textContent = 'ఆంగ్లంలో చూపించు';
    calcBtn.textContent = 'లెక్కించండి';
    pageTitle.innerHTML = 'వడ్డీ లేఖ <span class="english">/ Promissory Note</span>';
  } else {
    labelPrincipal.textContent = 'Principal Amount (₹):';
    labelRate.textContent = 'Interest Rate (% per month):';
    labelStart.textContent = 'Start Date:';
    labelEnd.textContent = 'End Date:';
    toggleText.textContent = 'Show in Telugu';
    calcBtn.textContent = 'Calculate';
    pageTitle.innerHTML = 'Promissory Note <span class="telugu">/ వడ్డీ లేఖ</span>';
  }
  
  // Recalculate if there's output already
  const output = document.getElementById('output');
  if (output && output.innerHTML.trim() !== '') {
    calculate();
  }
}

function calculate() {
  const principal = parseFloat(document.getElementById('principal').value);
  const rate = parseFloat(document.getElementById('rate').value);
  const startDate = new Date(document.getElementById('startDate').value);
  const endDate = new Date(document.getElementById('endDate').value);
  const showTelugu = document.getElementById('langToggle').checked;
  
  if (!principal || !rate || !startDate || !endDate || endDate <= startDate) {
    alert(showTelugu ? "చెల్లని సమాచారం" : "Invalid input");
    return;
  }
  
  const totalMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
                      (endDate.getMonth() - startDate.getMonth());
  
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  
  const dayStart = startDate.getDate();
  const dayEnd = endDate.getDate();
  
  let days = dayEnd - dayStart;
  if (days < 0) days += 30;
  
  const monthlyInterest = (principal * rate) / 100;
  const dailyInterest = monthlyInterest / 30;
  
  const interestY = monthlyInterest * 12 * years;
  const interestM = monthlyInterest * months;
  const interestD = dailyInterest * days;
  
  const totalInterest = interestY + interestM + interestD;
  const totalPayable = principal + totalInterest;
  
  const labels = {
    years: showTelugu ? "సంవత్సరాలు" : "Years",
    months: showTelugu ? "నెలలు" : "Months",
    days: showTelugu ? "రోజులు" : "Days",
    interest: showTelugu ? "మొత్తం వడ్డీ" : "Total Interest",
    payable: showTelugu ? "మొత్తం చెల్లించవలసిన మొత్తం" : "Total Payable"
  };
  
  document.getElementById('output').innerHTML = `
    <p><strong>${labels.years}:</strong> ₹${interestY.toFixed(2)}</p>
    <p><strong>${labels.months}:</strong> ₹${interestM.toFixed(2)}</p>
    <p><strong>${labels.days}:</strong> ₹${interestD.toFixed(2)}</p>
    <p><strong>${labels.interest}:</strong> ₹${totalInterest.toFixed(2)}</p>
    <p><strong>${labels.payable}:</strong> ₹${totalPayable.toFixed(2)}</p>
  `;
}

// Initialize the form
document.addEventListener('DOMContentLoaded', function() {
  // Check if global language state exists and apply it
  if (typeof isTeluguActive !== 'undefined') {
    document.getElementById('langToggle').checked = window.isTeluguActive;
    toggleLanguage();
  }
});