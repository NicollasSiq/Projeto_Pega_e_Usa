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
  // Inicializa tema salvo
  const saved = localStorage.getItem('pegaeusa-theme');
  setTheme(saved === 'dark');
  themeBtn.addEventListener('click', () => {
    setTheme(!document.body.classList.contains('dark-mode'));
  });
}

// Carrossel automático
const slides = document.querySelectorAll('.carrossel-slide');
let carrosselIndex = 0;
function showSlide(idx) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('ativo', i === idx);
  });
}
function nextSlide() {
  carrosselIndex = (carrosselIndex + 1) % slides.length;
  showSlide(carrosselIndex);
}
if (slides.length) {
  setInterval(nextSlide, 3500);
  showSlide(carrosselIndex);
}

// Sidebar adicionar roupa
const abrirSidebarBtn = document.getElementById('abrir-sidebar');
const sidebar = document.getElementById('sidebar-adicionar');
const fecharSidebarBtn = document.getElementById('fechar-sidebar');
if (abrirSidebarBtn && sidebar && fecharSidebarBtn) {
  abrirSidebarBtn.addEventListener('click', () => sidebar.classList.add('aberta'));
  fecharSidebarBtn.addEventListener('click', () => sidebar.classList.remove('aberta'));
  // Fecha sidebar ao clicar fora
  document.addEventListener('mousedown', (e) => {
    if (sidebar.classList.contains('aberta') && !sidebar.contains(e.target) && e.target !== abrirSidebarBtn) {
      sidebar.classList.remove('aberta');
    }
  });
}

// Modal Sobre Nós
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

// Filtros de categorias
const filtroBtns = document.querySelectorAll('.filtro-btn');
filtroBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    filtroBtns.forEach(b => {
      b.classList.remove('ativo');
      b.setAttribute('aria-selected', 'false');
    });
    this.classList.add('ativo');
    this.setAttribute('aria-selected', 'true');
    const categoria = this.dataset.categoria;
    document.querySelectorAll('.estoque .item').forEach(item => {
      item.style.display = (categoria === 'geral' || item.dataset.categoria === categoria) ? '' : 'none';
    });
  });
});

// Dados iniciais de roupas (exemplo)
let roupas = [
  {
    id: 1,
    nome: "Terno Azul",
    tamanho: "M",
    quantidade: 3,
    tipo: "terno",
    preco: 30,
    imagem: "Imagens/produto1.jpg",
    alugadas: 0
  },
  {
    id: 2,
    nome: "Camiseta Branca",
    tamanho: "G",
    quantidade: 5,
    tipo: "camiseta",
    preco: 10,
    imagem: "Imagens/produto2.jpg",
    alugadas: 0
  },
  {
    id: 3,
    nome: "Calça Jeans",
    tamanho: "38",
    quantidade: 2,
    tipo: "calca",
    preco: 15,
    imagem: "Imagens/produto3.jpg",
    alugadas: 0
  },
  {
    id: 4,
    nome: "Blusa Rosa",
    tamanho: "P",
    quantidade: 4,
    tipo: "blusa",
    preco: 12,
    imagem: "Imagens/produto4.jpg",
    alugadas: 0
  },
  {
    id: 5,
    nome: "Tênis Esportivo",
    tamanho: "40",
    quantidade: 2,
    tipo: "tenis",
    preco: 18,
    imagem: "Imagens/produto5.jpg",
    alugadas: 0
  }
];

// Renderiza estoque e alugadas
function renderRoupas() {
  const estoqueDiv = document.querySelector('.estoque');
  const alugadasDiv = document.querySelector('.alugadas');
  if (!estoqueDiv || !alugadasDiv) return;
  estoqueDiv.innerHTML = '';
  alugadasDiv.innerHTML = '';
  roupas.forEach(roupa => {
    // Estoque (só se quantidade > 0)
    if (roupa.quantidade > 0) {
      const item = document.createElement('div');
      item.className = 'item';
      item.dataset.categoria = roupa.tipo;
      item.innerHTML = `
        <div class="item-img-wrap">
          <img src="${roupa.imagem}" alt="${roupa.nome}" />
        </div>
        <h3>${roupa.nome}</h3>
        <span class="tamanho">Tamanho: ${roupa.tamanho}</span>
        <span class="quantidade">${roupa.quantidade} disponíveis</span>
        <span class="preco">R$ ${roupa.preco}/dia</span>
        <div class="botoes-roupa">
          <button class="alugar-btn">Alugar</button>
          <button class="devolver-btn" disabled>Devolver</button>
          <button class="deletar-btn">Deletar</button>
        </div>
      `;
      // Alugar
      item.querySelector('.alugar-btn').addEventListener('click', () => alugarRoupa(roupa.id));
      // Deletar
      item.querySelector('.deletar-btn').addEventListener('click', () => deletarRoupa(roupa.id));
      estoqueDiv.appendChild(item);
    }
    // Alugadas (se alugadas > 0)
    if (roupa.alugadas > 0) {
      const item = document.createElement('div');
      item.className = 'item';
      item.dataset.categoria = roupa.tipo;
      item.innerHTML = `
        <div class="item-img-wrap">
          <img src="${roupa.imagem}" alt="${roupa.nome}" />
        </div>
        <h3>${roupa.nome}</h3>
        <span class="tamanho">Tamanho: ${roupa.tamanho}</span>
        <span class="quantidade">${roupa.alugadas} alugadas</span>
        <span class="preco">R$ ${roupa.preco}/dia</span>
        <div class="botoes-roupa">
          <button class="alugar-btn" disabled>Alugar</button>
          <button class="devolver-btn">Devolver</button>
          <button class="deletar-btn">Deletar</button>
        </div>
      `;
      // Devolver
      item.querySelector('.devolver-btn').addEventListener('click', () => devolverRoupa(roupa.id));
      // Deletar
      item.querySelector('.deletar-btn').addEventListener('click', () => deletarRoupa(roupa.id));
      alugadasDiv.appendChild(item);
    }
  });
}
renderRoupas();

// Adicionar roupa
const formAdicionar = document.getElementById('form-adicionar-roupa');
if (formAdicionar) {
  formAdicionar.addEventListener('submit', function (e) {
    e.preventDefault();
    const fd = new FormData(formAdicionar);
    const nome = fd.get('nome');
    const tamanho = fd.get('tamanho');
    const quantidade = parseInt(fd.get('quantidade'));
    const tipo = fd.get('tipo');
    const valor = parseFloat(fd.get('valor'));
    const foto = fd.get('foto');
    let imagem = "Imagens/produto1.jpg";
    if (foto && foto.name) {
      imagem = URL.createObjectURL(foto);
    }
    roupas.push({
      id: Date.now(),
      nome,
      tamanho,
      quantidade,
      tipo,
      preco: valor,
      imagem,
      alugadas: 0
    });
    renderRoupas();
    sidebar.classList.remove('aberta');
    formAdicionar.reset();
  });
}

// Alugar roupa
function alugarRoupa(id) {
  const roupa = roupas.find(r => r.id === id);
  if (!roupa || roupa.quantidade === 0) return;
  const dias = parseInt(prompt('Por quantos dias deseja alugar?'));
  if (!dias || dias < 1) return;
  const maxQtd = roupa.quantidade;
  const qtd = parseInt(prompt(`Quantas unidades deseja alugar? (Disponíveis: ${maxQtd})`));
  if (!qtd || qtd < 1 || qtd > maxQtd) return;
  const total = dias * qtd * roupa.preco;
  alert(`Valor total do aluguel: R$ ${total.toFixed(2)}`);
  roupa.quantidade -= qtd;
  roupa.alugadas += qtd;
  renderRoupas();
}

// Devolver roupa
function devolverRoupa(id) {
  const roupa = roupas.find(r => r.id === id);
  if (!roupa || roupa.alugadas === 0) return;
  const qtd = parseInt(prompt(`Quantas unidades deseja devolver? (Alugadas: ${roupa.alugadas})`));
  if (!qtd || qtd < 1 || qtd > roupa.alugadas) return;
  roupa.quantidade += qtd;
  roupa.alugadas -= qtd;
  renderRoupas();
}

// Deletar roupa
function deletarRoupa(id) {
  if (!confirm('Tem certeza que deseja deletar esta roupa?')) return;
  roupas = roupas.filter(r => r.id !== id);
  renderRoupas();
}

// Confirmação para qualquer botão de deletar roupa (caso use outros botões/links)
document.addEventListener('click', function (e) {
  const btn = e.target.closest('.deletar-btn, .btn-deletar-roupa');
  if (btn) {
    e.preventDefault();
    const confirmado = confirm('Tem certeza que deseja deletar esta roupa?');
    if (confirmado) {
      // Descobre o id da roupa associado ao botão
      let id = btn.dataset.id;
      if (!id) {
        // Tenta encontrar o id no DOM (ajuste conforme sua estrutura)
        const item = btn.closest('.item');
        if (item && item.dataset && item.dataset.id) {
          id = item.dataset.id;
        }
      }
      if (id) {
        deletarRoupa(Number(id));
      }
    }
  }
});

// Botão voltar ao topo
const btnTopo = document.getElementById('voltar-topo');
window.addEventListener('scroll', () => {
  if (btnTopo) btnTopo.style.display = window.scrollY > 300 ? 'block' : 'none';
});
if (btnTopo) {
  btnTopo.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  });
}