document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }
  const message = document.getElementById('name');
  const userPlan = document.getElementById('plan');
  const userDailyLeft = document.getElementById('left');
  const free = document.getElementById('free');
  const pro = document.getElementById('pro');
  const unlimited = document.getElementById('unlimited');
  const currFree = document.getElementById('currFree');
  const currPro = document.getElementById('currPro');
  const currUnlimited = document.getElementById('currUnlimited');
  try {
    const response = await fetch(`http://localhost:3000/user/user`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}`
       }
    });

    if (response.ok) {
      const data = await response.json();
      const plan = data.plan;
      const daily = data.daily;
      let left = 0;
      if (plan == 'free') {
        left = 5 - daily;
        currFree.classList.remove('hidden');
        free.classList.add('border-indigo-600');
        free.classList.remove('border-transparent');
      }
      else if (plan =='pro') {
        left = 30 - daily;
        currPro.classList.remove('hidden');
        pro.classList.add('border-indigo-600');
        pro.classList.remove('border-transparent');
      }
      else {
        left = 'NIELIMITOWANE'
        currUnlimited.classList.remove('hidden');
        unlimited.classList.add('border-indigo-600');
        unlimited.classList.remove('border-transparent');
      }
      message.innerHTML = `Witaj, ${data.login}!`;
      userPlan.innerHTML = `Aktualny plan: ${plan}`;
      userDailyLeft.innerHTML = `Pozostało dzisiaj opisów: ${left}`;
    } else {
      const error = await response.text();
    }

  } catch (err) {
    console.error(err);
  }
});


document.getElementById('dashboard').addEventListener('click', async () => {
  const token = localStorage.getItem('token');
  if (token) {
    window.location.href = 'dashboard.html';
    return;
  }
  else {
    window.location.href = 'login.html';
    return;
  }
});

document.getElementById('upgrade').addEventListener('click', async () => {
  const token = localStorage.getItem('token');
  if (token) {
    const overlay = document.getElementById('overlay');
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    setTimeout(() => {
      modal.classList.remove('scale-90', 'opacity-0');
    }, 10);
  }
  else {
    window.location.href = 'login.html';
    return;
  }
});

document.getElementById('overlay').addEventListener('click', (e) => {
  if (e.target == overlay) {
    modal.classList.add('scale-90', 'opacity-0');
    setTimeout(() => {
      overlay.classList.add('opacity-0', 'pointer-events-none');
    }, 300);
  }
});

document.getElementById('logout').addEventListener('click', (e) => {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
  return;
});