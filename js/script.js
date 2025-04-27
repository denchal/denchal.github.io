document.getElementById('generate').addEventListener('click', async () => {
  const productName = document.getElementById('product-name').value;
  const output = document.getElementById('output');
  const type = document.getElementById('template').value;

  if (!productName.trim()) {
    output.innerHTML = '<em>Wpisz nazwę produktu!</em>';
    return;
  }

  output.innerHTML = 'Generowanie...';
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('https://opis-backend.onrender.com/desc/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productName: productName, type: type }),
    });
    const data = await response.json();
    try {
      output.innerHTML = marked.parse(data.result);
    } catch (err) {
      output.innerHTML = data.error;
    }
  } catch (err) {
    output.innerHTML = 'Wystąpił nieznany błąd przy generowaniu opisu!';
  }
});