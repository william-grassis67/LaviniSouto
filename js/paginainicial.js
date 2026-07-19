const profileName = document.getElementById('profileName');
const profileEmail = document.getElementById('profileEmail');
const profileType = document.getElementById('profileType');
const logoutBtn = document.getElementById('logoutBtn');
const adminLink = document.getElementById('adminLink');

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('usuario') || 'null');
  } catch (error) {
    return null;
  }
}

function redirectTo(page) {
  const currentPath = window.location.pathname;
  const basePath = currentPath.replace(/[^/]+$/, '');
  window.location.href = `${basePath}${page}`;
}

function protectPage() {
  const user = getStoredUser();
  if (!user) {
    redirectTo('index.html');
    return false;
  }

  if (profileName) profileName.textContent = user.nome || 'Usuário';
  if (profileEmail) profileEmail.textContent = user.email || 'Sem e-mail cadastrado';
  if (profileType) {
    profileType.textContent = user.tipo || 'CLIENTE';
    profileType.classList.toggle('admin', user.tipo === 'ADMIN');
  }

  if (adminLink) {
    if (user.tipo !== 'ADMIN' || !user.acessoLiberado) {
      adminLink.style.display = 'none';
    } else {
      adminLink.style.display = 'inline-flex';
    }
  }

  if (user.tipo === 'ADMIN' && !user.acessoLiberado) {
    const statusMessage = document.createElement('div');
    statusMessage.className = 'payment-warning';
    statusMessage.textContent = 'Pagamento pendente. Acesso bloqueado até a confirmação do pagamento.';
    const card = document.querySelector('.profile-card');
    if (card) {
      card.insertAdjacentElement('afterend', statusMessage);
    }
  }

  return true;
}

logoutBtn?.addEventListener('click', () => {
  localStorage.removeItem('usuario');
  redirectTo('index.html');
});

protectPage();
