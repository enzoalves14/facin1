// Variáveis do Carrinho
let cart = []; // Array para armazenar os itens adicionados ao carrinho
let total = 0; // Variável para armazenar o valor total do carrinho

// Variáveis do Carrossel
const adCarousel = document.getElementById("ad-carousel"); // Elemento do carrossel
const indicatorsContainer = document.getElementById("carousel-indicators"); // Contêiner para os indicadores
const totalSlides = document.querySelectorAll(".ad-item").length; // Total de slides no carrossel

// Variáveis para controle de deslizamento do carrossel
let currentAdIndex = 0; // Índice do slide atual
let isDragging = false; // Controle se o usuário está arrastando/deslizando
let startX, currentTranslate = 0, prevTranslate = 0; // Variáveis de posição

// ---------------------------
// Funções do Carrinho
// ---------------------------

// Atualiza os itens e o total do carrinho na interface
function updateCart() {
    const cartItems = document.getElementById("cart-items"); // Lista de itens no carrinho
    const cartTotal = document.getElementById("cart-total"); // Elemento para o valor total
    const cartCount = document.getElementById("cart-count"); // Contador de itens no ícone do carrinho

    // Limpa os itens exibidos atualmente
    cartItems.innerHTML = "";

    // Adiciona os itens do carrinho à lista
    cart.forEach((item, index) => {
        const li = document.createElement("li"); // Cria um elemento de lista
        li.textContent = `${item.name} - R$ ${item.price}`; // Adiciona o nome e preço do item

        // Cria o botão de remover
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remover"; // Texto do botão
        removeButton.classList.add("cart-item-remove"); // Adiciona a classe de estilo
        removeButton.onclick = () => removeFromCart(index); // Evento para remover o item
        li.appendChild(removeButton); // Adiciona o botão ao item da lista

        cartItems.appendChild(li); // Adiciona o item à lista
    });

    // Atualiza o valor total do carrinho
    cartTotal.textContent = `Total: R$ ${total}`;
    // Atualiza o contador de itens no ícone do carrinho
    cartCount.textContent = cart.length;
}

// Remove um item do carrinho com base no índice
function removeFromCart(index) {
    total -= cart[index].price; // Subtrai o preço do item do total
    cart.splice(index, 1); // Remove o item do array do carrinho
    updateCart(); // Atualiza o carrinho na interface
}

// Adiciona um item ao carrinho
function addToCart(name, price) {
    cart.push({ name, price }); // Adiciona o item ao array do carrinho
    total += price; // Soma o preço do item ao total
    updateCart(); // Atualiza o carrinho na interface
}

// Abre ou fecha o carrinho
function toggleCart() {
    const cartElement = document.getElementById("cart"); // Elemento do carrinho
    // Alterna entre mostrar e esconder o carrinho
    cartElement.style.display = cartElement.style.display === "block" ? "none" : "block";
}


// Finaliza a compra
function checkout() {
    if (cart.length === 0) {
        // Exibe um alerta se o carrinho estiver vazio
        alert("Seu carrinho está vazio!");
    } else {
        // Exibe um alerta com o valor total da compra
        alert(`Compra finalizada! Total: R$ ${total}`);
        cart = []; // Limpa o array do carrinho
        total = 0; // Reseta o valor total
        updateCart(); // Atualiza o carrinho na interface
    }
}

// ---------------------------
// Funções do Carrossel
// ---------------------------

// Cria os indicadores (bolinhas) para o carrossel
function createIndicators() {
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement("div"); // Cria um elemento de indicador
        indicator.classList.add("indicator"); // Adiciona a classe do indicador
        if (i === 0) indicator.classList.add("active"); // Ativa o primeiro indicador
        indicator.addEventListener("click", () => goToSlide(i)); // Adiciona evento de clique para mudar o slide
        indicatorsContainer.appendChild(indicator); // Adiciona o indicador ao contêiner
    }
}

// Atualiza os indicadores para destacar o slide ativo
function updateIndicators() {
    const indicators = document.querySelectorAll(".indicator"); // Seleciona todos os indicadores
    indicators.forEach((indicator, index) => {
        // Adiciona ou remove a classe "active" com base no índice
        if (index === currentAdIndex) {
            indicator.classList.add("active");
        } else {
            indicator.classList.remove("active");
        }
    });
}

// Vai para um slide específico com base no índice
function goToSlide(index) {
    currentAdIndex = index; // Define o índice do slide atual
    setPositionByIndex(); // Ajusta a posição do carrossel
    updateIndicators(); // Atualiza os indicadores
}

// Eventos de mouse e toque para o carrossel
adCarousel.addEventListener("mousedown", startDrag); // Início do arraste com o mouse
adCarousel.addEventListener("touchstart", startDrag); // Início do deslize com toque

adCarousel.addEventListener("mouseup", endDrag); // Fim do arraste com o mouse
adCarousel.addEventListener("touchend", endDrag); // Fim do deslize com toque

adCarousel.addEventListener("mousemove", drag); // Arraste com o mouse
adCarousel.addEventListener("touchmove", drag); // Deslize com toque

// Inicia o arraste ou deslize
function startDrag(event) {
    isDragging = true; // Define que o usuário está arrastando/deslizando
    startX = event.type.includes("mouse") ? event.pageX : event.touches[0].clientX; // Pega a posição inicial do arraste
    adCarousel.style.transition = "none"; // Remove a transição durante o arraste
}

// Finaliza o arraste ou deslize
function endDrag() {
    isDragging = false; // Define que o arraste/deslize terminou
    const movedBy = currentTranslate - prevTranslate; // Calcula a distância movida

    // Verifica se deve mudar de slide com base na distância movida
    if (movedBy < -50 && currentAdIndex < totalSlides - 1) currentAdIndex++;
    if (movedBy > 50 && currentAdIndex > 0) currentAdIndex--;

    setPositionByIndex(); // Ajusta a posição para o slide correto
    updateIndicators(); // Atualiza os indicadores
}

// Realiza o arraste ou deslize
function drag(event) {
    if (!isDragging) return; // Sai se o usuário não estiver arrastando/deslizando
    const currentPosition = event.type.includes("mouse") ? event.pageX : event.touches[0].clientX; // Pega a posição atual
    currentTranslate = prevTranslate + currentPosition - startX; // Calcula a posição atual do arraste
}

// Ajusta o carrossel para o slide correspondente
function setPositionByIndex() {
    currentTranslate = currentAdIndex * -adCarousel.clientWidth; // Calcula a posição do slide atual
    prevTranslate = currentTranslate; // Atualiza a posição anterior
    adCarousel.style.transition = "transform 0.3s ease-out"; // Adiciona a transição suave
    adCarousel.style.transform = `translateX(${currentTranslate}px)`; // Move o carrossel
}

// Inicializa o carrossel criando os indicadores
createIndicators();

function toggleMenu() {
    const menu = document.getElementById("hamburgerMenu"); // Seleciona o menu
    menu.style.display = menu.style.display === "flex" ? "none" : "flex"; // Alterna entre mostrar e esconder
}
