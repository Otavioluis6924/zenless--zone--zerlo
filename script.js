
// MENU PARA CELULARES

const menuToggle = document.getElementById("menuToggle");

const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", function () {

    mainNav.classList.toggle("open");

    const aberto = mainNav.classList.contains("open");

    menuToggle.setAttribute("aria-expanded", aberto);

    menuToggle.textContent = aberto ? "✕" : "☰";

});


// FECHAR MENU AO CLICAR EM UM LINK

const linksMenu = document.querySelectorAll("#mainNav a");

linksMenu.forEach(function (link) {

    link.addEventListener("click", function () {

        mainNav.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.textContent = "☰";

    });

});


// PESQUISA E FILTROS DOS AGENTES

const campoBusca = document.getElementById("agentSearch");

const botoesFiltro = document.querySelectorAll(".filter");

const cartoesAgentes = document.querySelectorAll(".agent-card");

const avisoVazio = document.getElementById("noResults");

let filtroAtual = "todos";


// FUNÇÃO PARA MOSTRAR OS AGENTES

function mostrarAgentes() {

    const pesquisa = campoBusca.value.toLowerCase().trim();

    let encontrados = 0;

    cartoesAgentes.forEach(function (cartao) {

        const nome = cartao.dataset.name.toLowerCase();

        const faccao = cartao.dataset.faction;

        // VERIFICA SE O NOME OU A FACÇÃO COMBINAM COM A PESQUISA

        const combinaBusca =
            nome.includes(pesquisa) ||
            faccao.toLowerCase().includes(pesquisa);

        // VERIFICA SE O AGENTE PERTENCE À FACÇÃO SELECIONADA

        const combinaFiltro =
            filtroAtual === "todos" ||
            faccao === filtroAtual;

        // MOSTRA OU ESCONDE O AGENTE

        if (combinaBusca && combinaFiltro) {

            cartao.style.display = "block";

            encontrados++;

        } else {

            cartao.style.display = "none";

        }

    });

    // AVISA QUANDO NENHUM AGENTE FOR ENCONTRADO

    avisoVazio.hidden = encontrados > 0;

}


// PESQUISAR AGENTES PELO NOME OU FACÇÃO

campoBusca.addEventListener("input", mostrarAgentes);


// FILTRAR OS AGENTES POR FACÇÃO

botoesFiltro.forEach(function (botao) {

    botao.addEventListener("click", function () {

        // REMOVE A SELEÇÃO DOS OUTROS BOTÕES

        botoesFiltro.forEach(function (item) {

            item.classList.remove("active");

        });

        // ATIVA O BOTÃO CLICADO

        botao.classList.add("active");

        // GUARDA A FACÇÃO ESCOLHIDA

        filtroAtual = botao.dataset.filter;

        // ATUALIZA OS AGENTES NA TELA

        mostrarAgentes();

    });

});

