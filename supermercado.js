    // Função para adicionar um novo comentário
    function addComment() {
        const commentInput = document.getElementById('comment-input');
        const commentText = commentInput.value.trim();
        
        if (commentText === '') {
            alert("Por favor, escreva um comentário antes de enviar.");
            return;
        }

        // Cria um novo elemento de comentário
        const commentList = document.getElementById('comments-list');
        const newComment = document.createElement('div');
        newComment.classList.add('comment-item');
        newComment.innerHTML = `
            <p class="comment-author">Usuário Anônimo</p>
            <p>${commentText}</p>
        `;

        // Insere o novo comentário no início da lista
        commentList.insertBefore(newComment, commentList.firstChild);

        // Limpa o campo de texto após o envio
        commentInput.value = '';
    }

let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.carousel-indicator');

    // Função para mostrar o slide atual
    function showSlide(index) {
        // Garante que o índice do slide está dentro do limite
        currentSlide = (index + slides.length) % slides.length;

        // Move o carrossel
        document.getElementById('carousel-slide').style.transform = `translateX(-${currentSlide * 100}%)`;

        // Atualiza indicadores
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentSlide);
        });
    }

    // Próximo slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Slide anterior
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Navegação direta para o slide
    function goToSlide(index) {
        showSlide(index);
    }

    // Auto-play do carrossel
    setInterval(nextSlide, 5000); // Troca de slide a cada 5 segundos
