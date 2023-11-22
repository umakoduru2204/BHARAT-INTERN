document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');

  form.addEventListener('submit', (event) => {
    if (!validateForm()) {
      event.preventDefault();
    }
  });

  function validateForm() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorDiv = document.getElementById('errorDiv');
    let isValid = true;

    errorDiv.innerHTML = '';

    if (password !== confirmPassword) {
      showError('Passwords do not match');
      isValid = false;
    }

    // Add more validation as needed

    return isValid;
  }

  function showError(message) {
    const errorDiv = document.getElementById('errorDiv');
    const errorParagraph = document.createElement('p');
    errorParagraph.className = 'error';
    errorParagraph.textContent = message;
    errorDiv.appendChild(errorParagraph);
  }
});
