const profileName = document.getElementById('profileName');
const profileEmail = document.getElementById('profileEmail');
const profileType = document.getElementById('profileType');
const profileTag = document.getElementById('profileTag');
const welcomeTitle = document.getElementById('welcomeTitle');
const accountName = document.getElementById('accountName');
const accountEmail = document.getElementById('accountEmail');
const accountCpf = document.getElementById('accountCpf');
const accountType = document.getElementById('accountType');
const accountNameValue = document.getElementById('accountNameValue');
const accountEmailValue = document.getElementById('accountEmailValue');
const accountPhone = document.getElementById('accountPhone');
const logoutBtn = document.getElementById('logoutBtn');
const adminLink = document.getElementById('adminLink');
const themeSelect = document.getElementById('themeSelect');
const themeToggleButton = document.getElementById('themeToggleButton');
const sidebar = document.getElementById('sidebar');
const sidebarCollapseBtn = document.getElementById('sidebarCollapseBtn');
const sidebarToggleMobile = document.getElementById('sidebarToggleMobile');
const statusButtons = document.querySelectorAll('[data-status-toggle]');

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

function applyTheme(theme) {
  const selectedTheme = theme || 'light';
  document.body.dataset.theme = selectedTheme;
  if (themeSelect) themeSelect.value = selectedTheme;
  if (themeToggleButton) {
    const icon = themeToggleButton.querySelector('i');
    themeToggleButton.innerHTML = `${icon ? icon.outerHTML : '<i class="fa-solid fa-sun"></i>'} ${selectedTheme === 'dark' ? 'Escuro' : 'Claro'}`;
  }
}

function toggleSidebar(force) {
  if (!sidebar) return;
  const shouldCollapse = typeof force === 'boolean' ? force : !sidebar.classList.contains('collapsed');
  sidebar.classList.toggle('collapsed', shouldCollapse);
}

function protectPage() {
  const user = getStoredUser();
  if (!user) {
    redirectTo('index.html');
    return false;
  }

  const displayName = user.nome || 'Maria Silva';
  const displayType = user.tipo || 'CLIENTE';
  const displayEmail = user.email || 'maria.silva@email.com';

  if (profileName) profileName.textContent = displayName;
  if (profileEmail) profileEmail.textContent = displayEmail;
  if (profileType) profileType.textContent = displayType;
  if (profileTag) profileTag.textContent = displayType;
  if (welcomeTitle) welcomeTitle.textContent = `Bem-vindo, ${displayName}`;
  if (accountName) accountName.textContent = displayName;
  if (accountEmail) accountEmail.textContent = displayEmail;
  if (accountNameValue) accountNameValue.textContent = displayName;
  if (accountEmailValue) accountEmailValue.textContent = displayEmail;
  if (accountCpf) accountCpf.textContent = user.cpf || '123.456.789-00';
  if (accountPhone) accountPhone.textContent = user.telefone || '(11) 99999-0000';
  if (accountType) accountType.textContent = displayType;

  if (adminLink) {
    if (user.tipo !== 'ADMIN' || !user.acessoLiberado) {
      adminLink.style.display = 'none';
    } else {
      adminLink.style.display = 'inline-flex';
    }
  }

  const savedTheme = localStorage.getItem('appTheme') || 'light';
  applyTheme(savedTheme);

  return true;
}

logoutBtn?.addEventListener('click', () => {
  localStorage.removeItem('usuario');
  localStorage.removeItem('appTheme');
  redirectTo('index.html');
});

themeSelect?.addEventListener('change', (event) => {
  const selectedTheme = event.target.value;
  localStorage.setItem('appTheme', selectedTheme);
  applyTheme(selectedTheme);
});

themeToggleButton?.addEventListener('click', () => {
  const currentTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('appTheme', currentTheme);
  applyTheme(currentTheme);
});

sidebarCollapseBtn?.addEventListener('click', () => toggleSidebar());
sidebarToggleMobile?.addEventListener('click', () => toggleSidebar(false));
statusButtons.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('is-paid');
    button.textContent = button.classList.contains('is-paid') ? 'Pago' : 'Pendente';
  });
});

protectPage();
