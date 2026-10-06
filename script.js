// Registra o Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('sw.js')
      .then((reg) => console.log('Service Worker registrado:', reg.scope))
      .catch((erro) => console.error('Falha ao registrar o Service Worker:', erro));
  });
}

// Filtro da vitrine (Todos / Casas / Apartamentos)
const botoes = document.querySelectorAll('.filtro');
const imoveis = document.querySelectorAll('.imovel');

botoes.forEach((botao) => {
  botao.addEventListener('click', () => {
    botoes.forEach((b) => b.classList.remove('ativo'));
    botao.classList.add('ativo');
    const tipo = botao.dataset.tipo;
    imoveis.forEach((imovel) => {
      imovel.hidden = tipo !== 'todos' && imovel.dataset.tipo !== tipo;
    });
  });
});

// Aviso de conexão
const status = document.getElementById('status-rede');
function atualizarRede() {
  status.textContent = navigator.onLine ? '' : 'Você está offline. Mostrando a versão salva.';
}
window.addEventListener('online', atualizarRede);
window.addEventListener('offline', atualizarRede);
atualizarRede();
