
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

    const pesquisa = campoBusca.value.toLowerCase();

    let encontrados = 0;

    cartoesAgentes.forEach(function (cartao) {

        const nome = cartao.dataset.name.toLowerCase();

        const faccao = cartao.dataset.faction;

        const combinaBusca =
            nome.includes(pesquisa) ||
            faccao.toLowerCase().includes(pesquisa);

        const combinaFiltro =
            filtroAtual === "todos" ||
            faccao === filtroAtual;

        if (combinaBusca && combinaFiltro) {

            cartao.style.display = "block";

            encontrados++;

        } else {

            cartao.style.display = "none";

        }

    });

    avisoVazio.hidden = encontrados > 0;

}


// EVENTO DE PESQUISA

campoBusca.addEventListener("input", mostrarAgentes);


// EVENTOS DOS FILTROS

botoesFiltro.forEach(function (botao) {

    botao.addEventListener("click", function () {

        botoesFiltro.forEach(function (item) {

            item.classList.remove("active");

        });

        botao.classList.add("active");

        filtroAtual = botao.dataset.filter;

        mostrarAgentes();

    });

});
