// server/public/main.js
function submitForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    fetch('/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Form submitted successfully!');
      } else {
        alert('Error submitting form. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    });
  }
  