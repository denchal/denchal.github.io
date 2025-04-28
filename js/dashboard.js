document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login';
    return;
  }
  const userbtn = document.getElementById('userlogin');
  userbtn.innerHTML = 'Panel użytkownika';

  const historyList = document.getElementById('history-list');
  try {
    const response = await fetch('https://opis-backend.onrender.com/user/history', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const history = await response.json();
    if (history.error) {
      alert("Sesja wygasła, zaloguj się ponownie!");
      localStorage.removeItem('token');
      return;
    }
    historyList.innerHTML = '';

    if (history.length === 0) {
      historyList.innerHTML = '';
    } else {
      history.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('mb-2', 'px-3', 'py-2', 'rounded-lg', 'hover:bg-indigo-500', 'cursor-pointer');
        listItem.innerHTML = `${item.prompt.slice(0,30)}`;
        historyList.appendChild(listItem);
        listItem.addEventListener('click', async () => {
          const descriptionResponse = await fetch(`https://opis-backend.onrender.com/user/history/${item._id}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
          if (descriptionResponse.ok) {
            const descriptionData = await descriptionResponse.json();
            const descriptionElement = document.getElementById('output');
            try {
              descriptionElement.innerHTML = marked.parse(descriptionData.desc);
            } catch (err) {
              descriptionElement.innerHTML = descriptionData.error;
            }
          } else {
            console.error('Nie udało się pobrać opisu');
          }
        });
      });
    }

  } catch (err) {
    console.error('Błąd po stronie klienta:', err);
  }
});


document.getElementById('userlogin').addEventListener('click', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login';
    return;
  }
  else {
    window.location.href = 'user_page';
  }
});
