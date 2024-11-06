 let currentSlide = 0;
    let cart = [];
    let total = 0;

    function showSlide(index) {
        const carousel = document.getElementById('carousel');
        const totalSlides = document.querySelectorAll('.carousel-item').length;
        currentSlide = (index + totalSlides) % totalSlides;
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function addToCart(name, price) {
        const item = { name, price };
        cart.push(item);
        total += price;
        updateCart();
    }

    function removeFromCart(index) {
        total -= cart[index].price;
        cart.splice(index, 1);
        updateCart();
    }

    function updateCart() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');

        cartItems.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                ${item.name} - R$ ${item.price.toFixed(2)}
                <button class="remove-button" onclick="removeFromCart(${index})">Remover</button>
            `;
            cartItems.appendChild(cartItem);
        });

        cartTotal.innerText = `Total: R$ ${total.toFixed(2)}`;
    }
    // Função para aplicar cupons
    function applyCoupon(code) {
        alert(`Cupom ${code} aplicado com sucesso!`);
    }

    // Funções do Carrossel de Supermercados
    let currentSupermarket = 0;

    function showSupermarket(index) {
        const carousel = document.getElementById('supermarketCarousel');
        const totalItems = document.querySelectorAll('.supermarket-item').length;
        currentSupermarket = (index + totalItems) % totalItems;
        carousel.style.transform = `translateX(-${currentSupermarket * 100}%)`;
    }

    function nextSupermarket() {
        showSupermarket(currentSupermarket + 1);
    }

    function prevSupermarket() {
        showSupermarket(currentSupermarket - 1);
    }
