document.getElementById('login').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const output = document.getElementById('output');
  
    try {
      const response = await fetch('https://opis-maker.vercel.app/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                   'Origin': 'https://https://denchal.github.io'
        },
        body: JSON.stringify({ login: email, pwd: password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem('token', token);
        output.classList.add('hidden');
        window.location.href = 'dashboard.html';
      } else {
        const error = await response.text();
        output.innerHTML = `${error}`;
        output.classList.remove('hidden');
      }
  
    } catch (err) {
      output.innerHTML = 'Wystąpił błąd połączenia z serwerem.';
      output.classList.remove('hidden');
      console.error(err);
    }
  });
  

document.getElementById('register').addEventListener('click', async () => {
  window.location.href = 'register.html';
});