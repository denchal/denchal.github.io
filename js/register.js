document.getElementById('register').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const output = document.getElementById('output');
  
    try {
      const response = await fetch('https://opis-backend.onrender.com/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: email, pwd: password }),
      });
  
      if (response.ok) {
        output.classList.add('hidden');
        window.location.href = 'login';
      } else {
        const error = await response.text();
        output.innerHTML = `${error}`;
        output.classList.add('bg-red-300');
        output.classList.remove('hidden');
      }
    } catch (err) {
      output.innerHTML = 'Błąd połączenia z serwerem.';
      output.classList.add('bg-red-300');
      output.classList.remove('hidden');
      console.error(err);
    }
  });
  
document.getElementById('login').addEventListener('click', async () => {
  window.location.href = 'login';
});