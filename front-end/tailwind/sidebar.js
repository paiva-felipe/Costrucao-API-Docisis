// sidebar.js
async function carregarSidebar() {
  const container = document.getElementById('sidebar-container');
  if (!container) return;

  // Identifica qual página está ativa pelo atributo data-active
  const paginaAtiva = container.getAttribute('data-active');

  try {
    // Busca o arquivo sidebar.html
    const resposta = await fetch('sidebar.html');
    const htmlSidebar = await resposta.text();
    
    // Insere o HTML da sidebar no container da página
    container.innerHTML = htmlSidebar;

    // Aplica as classes de destaque na página atual
    if (paginaAtiva) {
      const linkAtivo = container.querySelector(`[data-page="${paginaAtiva}"]`);
      if (linkAtivo) {
        linkAtivo.classList.remove('text-stone-500', 'hover:bg-stone-50', 'hover:text-stone-700');
        linkAtivo.classList.add('bg-amber-50', 'text-amber-800', 'font-medium');
        linkAtivo.setAttribute('aria-current', 'page');
      }
    }

    // Renderiza os ícones do Lucide dentro do menu carregado
    if (window.lucide) {
      lucide.createIcons();
    }
  } catch (erro) {
    console.error('Erro ao carregar o menu:', erro);
  }
}

// Executa automaticamente quando o HTML terminar de carregar
document.addEventListener('DOMContentLoaded', carregarSidebar);