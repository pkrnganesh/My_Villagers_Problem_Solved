// Global language state - true for Telugu, false for English
let isTeluguActive = true;

// Load view with dynamic component
function loadView(view) {
  // Hide the hero section when loading a specific view
  const heroSection = document.getElementById('heroSection');
  if (heroSection) {
    heroSection.style.display = 'none';
  }

  fetch(`components/${view}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById('mainContent').innerHTML = html;
      const script = document.createElement('script');
      script.src = `js/${view}.js`;
      script.onload = () => {
        // Apply current language to the newly loaded view
        applyLanguageToView(isTeluguActive);
      };
      document.body.appendChild(script);
    });
}

// Toggle global language
function toggleGlobalLanguage() {
  isTeluguActive = document.getElementById('globalLangToggle').checked;
  applyGlobalLanguage();
  applyLanguageToView(isTeluguActive);
}

// Apply language to sidebar elements
function applyGlobalLanguage() {
  const dashboardLabel = document.getElementById('dashboardLabel');
  const promissoryLink = document.getElementById('promissoryLink');
  const agriLoanLink = document.getElementById('agriLoanLink');
  
  if (isTeluguActive) {
    dashboardLabel.textContent = 'డాష్‌బోర్డ్';
    promissoryLink.textContent = 'వడ్డీ లేఖ';
    agriLoanLink.textContent = 'వ్యవసాయ రుణ సహాయకుడు';
  } else {
    dashboardLabel.textContent = 'Dashboard';
    promissoryLink.textContent = 'Promissory Note';
    agriLoanLink.textContent = 'Agri Loan Helper';
  }
}

// Apply language to the current view
function applyLanguageToView(isTeluguActive) {
  const currentView = document.querySelector('.container h1');
  if (!currentView) return;
  
  // Find view-specific language toggle if it exists
  const viewToggle = document.getElementById('langToggle');
  if (viewToggle) {
    viewToggle.checked = isTeluguActive;
    
    // If the view has its own toggle handler (like promissory note)
    if (typeof toggleLanguage === 'function') {
      toggleLanguage();
    }
  }
  
  // For agri-loan which doesn't have its own toggle
  if (currentView.textContent.includes('Agri Loan') || currentView.textContent.includes('వ్యవసాయ రుణ')) {
    updateAgriLoanLabels(isTeluguActive);
  }
}

// Update Agri Loan labels based on language
function updateAgriLoanLabels(isTeluguActive) {
  const labels = document.querySelectorAll('.form label');
  const calculateBtn = document.querySelector('.form button');
  const outputDiv = document.getElementById('loanOutput');
  
  if (!labels.length || !calculateBtn) return;
  
  const translations = {
    crop: isTeluguActive ? 'పంటను ఎంచుకోండి:' : 'Select Crop:',
    area: isTeluguActive ? 'భూమి పరిమాణం (ఎకరాలు):' : 'Land Area (Acres):',
    cost: isTeluguActive ? 'ఎకరాకు ఖర్చు (₹):' : 'Cost per Acre (₹):',
    yield: isTeluguActive ? 'ఉత్పత్తి అంచనా (క్వింటాల్స్):' : 'Expected Yield (Quintals):',
    price: isTeluguActive ? 'క్వింటాల్‌కు మార్కెట్ ధర (₹):' : 'Market Price per Quintal (₹):',
    duration: isTeluguActive ? 'రుణ కాలం (నెలలు):' : 'Loan Duration (Months):',
    rate: isTeluguActive ? 'వడ్డీ రేటు (% సంవత్సరానికి):' : 'Interest Rate (% annual):',
    calculate: isTeluguActive ? 'లెక్కించండి' : 'Calculate'
  };
  
  labels.forEach(label => {
    if (label.textContent.includes('Crop') || label.textContent.includes('పంటను')) {
      label.textContent = translations.crop;
    } else if (label.textContent.includes('Area') || label.textContent.includes('భూమి')) {
      label.textContent = translations.area;
    } else if (label.textContent.includes('Cost') || label.textContent.includes('ఖర్చు')) {
      label.textContent = translations.cost;
    } else if (label.textContent.includes('Yield') || label.textContent.includes('ఉత్పత్తి')) {
      label.textContent = translations.yield;
    } else if (label.textContent.includes('Price') || label.textContent.includes('ధర')) {
      label.textContent = translations.price;
    } else if (label.textContent.includes('Duration') || label.textContent.includes('కాలం')) {
      label.textContent = translations.duration;
    } else if (label.textContent.includes('Interest Rate') || label.textContent.includes('వడ్డీ రేటు')) {
      label.textContent = translations.rate;
    }
  });
  
  calculateBtn.textContent = translations.calculate;
  
  // If there's output, recalculate to update labels
  if (outputDiv && outputDiv.innerHTML.trim() !== '') {
    calculateLoan();
  }
}

// Initialize app
window.onload = () => {
  loadView('promissory');
  // Set initial language based on the toggle
  isTeluguActive = document.getElementById('globalLangToggle').checked;
  applyGlobalLanguage();
};