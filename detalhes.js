/**
 * detalhes.js
 * Funcionalidade: Exibição de Detalhes do Produto Específico e Validação de Formulário
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- PARTE A: Exibir Detalhes do Produto ---
    const API_URL = 'https://tech4japa.fly.dev/produtos';
    const detailsContainer = document.getElementById('detalhes-produto-container'); 

    /**
     * Obtém o ID do produto da query string da URL.
     */
    function getProductIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    /**
     * Busca o produto específico na API e exibe os detalhes.
     */
    async function fetchAndDisplayProductDetails() {
        const productId = getProductIdFromUrl();

        if (!productId) {
            if (detailsContainer) {
                detailsContainer.innerHTML = '<p class="mensagem-erro">ID do produto não especificado na URL.</p>';
            }
            return;
        }

        try {
            const response = await fetch(API_URL); 
            if (!response.ok) {
                throw new Error('Falha ao buscar a lista de produtos.');
            }
            
            const allProducts = await response.json();
            // Tenta encontrar o produto. Converte o ID da URL para número, se necessário.
            const product = allProducts.find(p => p.id == productId); 
            
            if (!product) {
                if (detailsContainer) {
                    detailsContainer.innerHTML = `<p class="mensagem-erro">Produto com ID ${productId} não encontrado.</p>`;
                }
                return;
            }

            renderProductDetails(product, detailsContainer);

        } catch (error) {
            console.error('Erro ao carregar detalhes do produto:', error);
            if (detailsContainer) {
                detailsContainer.innerHTML = '<p class="mensagem-erro">Não foi possível carregar os detalhes do produto.</p>';
            }
        }
    }

    /**
     * Renderiza as informações do produto no container.
     */
    function renderProductDetails(product, container) {
        container.innerHTML = `
            <div>
                <img src="${product.imagem || 'placeholder.jpg'}" alt="${product.produto}" class="detalhe-imagem">
            </div>
            <div>
                <h1 class="detalhe-nome">${product.produto}</h1> 
                
                <p class="detalhe-restaurante">Restaurante: ${product.restaurante}</p> 
                
                <p class="detalhe-descricao">${product.descricao}</p>
                
                <div class="detalhe-info">
                    </div>
            </div>
        `;
    }

    fetchAndDisplayProductDetails();


    // --- PARTE B: Validação do Formulário "Receber promoções" ---

    const form = document.getElementById('promocao-form');
    const emailInput = document.getElementById('email-promocao');
    const termsCheckbox = document.getElementById('aceite-termos');
    const termsMessage = document.getElementById('termos-erro-mensagem');
    const submitButton = document.getElementById('btn-promocao');
    const emailErrorElement = document.getElementById('email-erro-mensagem');
    
    const errorClass = 'input-error-border'; 

    function displayError(element, message) {
        element.textContent = message;
        element.style.display = message ? 'block' : 'none';
    }

    function validateEmailFormat(email) {
        if (email.length < 10) {
            return 'O e-mail deve ter no mínimo 10 caracteres.';
        }
        
        const atCount = (email.match(/@/g) || []).length;
        if (atCount !== 1) {
            return 'O e-mail deve possuir uma, e apenas uma, "@".';
        }

        const atIndex = email.indexOf('@');
        const afterAt = email.substring(atIndex + 1);
        if (!afterAt.includes('.')) {
            return 'Deve existir pelo menos um ponto após o "@".';
        }

        return null; 
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let email = emailInput.value.trim();
        let isValid = true;

        // 1. Validação do campo e-mail vazio (com prompt)
        if (!email) {
            const promptedEmail = prompt('O campo de e-mail está vazio. Por favor, digite seu e-mail:');
            
            if (promptedEmail !== null) {
                email = promptedEmail.trim(); 
                emailInput.value = email;
            }
        }
        
        // 2. Validação do e-mail: Vazio (pós-prompt) e Formato
        if (!email) {
            displayError(emailErrorElement, 'Uma mensagem de erro deve ser exibida porque o e-mail não foi digitado.');
            emailInput.classList.add(errorClass);
            isValid = false;
        } else {
            const emailFormatError = validateEmailFormat(email);
            if (emailFormatError) {
                displayError(emailErrorElement, emailFormatError);
                emailInput.classList.add(errorClass);
                isValid = false;
            } else {
                displayError(emailErrorElement, '');
                emailInput.classList.remove(errorClass);
            }
        }

        // 3. Validação do Checkbox "Termos de Uso"
        if (!termsCheckbox.checked) {
            termsCheckbox.classList.add(errorClass); 
            displayError(termsMessage, 'Você precisa aceitar os termos de uso.');
            isValid = false;
        } else {
            termsCheckbox.classList.remove(errorClass);
            displayError(termsMessage, '');
        }

        // Se todas as validações passarem
        if (isValid) {
            // 4. Modifica o texto do botão de envio
            submitButton.textContent = `E-mail "${email}" cadastrado com sucesso!`;
            submitButton.disabled = true;
        } else {
            submitButton.textContent = 'Enviar';
            submitButton.disabled = false;
        }
    });

    // Limpar o destaque de erro ao interagir
    emailInput.addEventListener('input', () => {
        emailInput.classList.remove(errorClass);
        displayError(emailErrorElement, '');
    });

    termsCheckbox.addEventListener('change', () => {
        termsCheckbox.classList.remove(errorClass);
        displayError(termsMessage, '');
    });
});