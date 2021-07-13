const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        console.log('OKOKOKOKOK!!!!!!');
        document.location.replace('/homepage');
      } else {
        alert(response.statusText);
      }
    }
};
  
const signupFormHandler = async (event) => {
    event.preventDefault();
    console.log('CLICKED!');
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (name && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        console.log('OKOKOKOKOK!!!!!!')
        document.location.replace('/homepage');
      } else {
        alert(response.statusText);
      }
    }
};
  
document
    .querySelector('#loginbtn')
    .addEventListener('click', loginFormHandler);
  
document
    .querySelector('#signupbtn')
    .addEventListener('click', signupFormHandler);
  
