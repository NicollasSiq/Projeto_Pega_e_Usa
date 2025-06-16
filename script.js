// Menu mobile acessível
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', function () {
    const expanded = navLinks.classList.toggle('ativo');
    navToggle.setAttribute('aria-expanded', expanded);
  });
}

// Tema claro/escuro com persistência
const themeBtn = document.getElementById('toggle-theme');
const themeIcon = document.getElementById('theme-icon');
function setTheme(dark) {
  document.body.classList.toggle('dark-mode', dark);
  if (themeIcon) themeIcon.textContent = dark ? '☀️' : '🌙';
  localStorage.setItem('pegaeusa-theme', dark ? 'dark' : 'light');
}
if (themeBtn && themeIcon) {
  const saved = localStorage.getItem('pegaeusa-theme');
  setTheme(saved === 'dark');
  themeBtn.addEventListener('click', () => {
    setTheme(!document.body.classList.contains('dark-mode'));
  });
}


// Sidebar (abrir/fechar)
const abrirSidebarBtn = document.getElementById('abrir-sidebar');
const sidebar = document.getElementById('sidebar-adicionar');
const fecharSidebarBtn = document.getElementById('fechar-sidebar');
if (abrirSidebarBtn && sidebar && fecharSidebarBtn) {
  abrirSidebarBtn.addEventListener('click', () => sidebar.classList.add('aberta'));
  fecharSidebarBtn.addEventListener('click', () => sidebar.classList.remove('aberta'));
  document.addEventListener('mousedown', (e) => {
    if (sidebar.classList.contains('aberta') && !sidebar.contains(e.target) && e.target !== abrirSidebarBtn) {
      sidebar.classList.remove('aberta');
    }
  });
}

// Modal Sobre Nós (se existir)
const sobreNosBtn = document.getElementById('sobre-nos-btn');
const sobreNosModal = document.getElementById('sobre-nos-modal');
const closeSobreNos = document.getElementById('close-sobre-nos');
if (sobreNosBtn && sobreNosModal && closeSobreNos) {
  sobreNosBtn.addEventListener('click', () => sobreNosModal.classList.add('ativa'));
  closeSobreNos.addEventListener('click', () => sobreNosModal.classList.remove('ativa'));
  sobreNosModal.addEventListener('mousedown', (e) => {
    if (e.target === sobreNosModal) sobreNosModal.classList.remove('ativa');
  });
  document.addEventListener('keydown', (e) => {
    if (sobreNosModal.classList.contains('ativa') && e.key === 'Escape') {
      sobreNosModal.classList.remove('ativa');
    }
  });
}

// Botão voltar ao topo (se existir)
const btnTopo = document.getElementById('voltar-topo');
window.addEventListener('scroll', () => {
  if (btnTopo) btnTopo.style.display = window.scrollY > 300 ? 'block' : 'none';
});
if (btnTopo) {
  btnTopo.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  });
}

