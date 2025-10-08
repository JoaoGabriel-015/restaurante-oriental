/**
 * cardapio.js
 * Funcionalidade: Carregamento e Exibição de Produtos da API
 */

document.addEventListener('DOMContentLoaded', () => {
    // Endpoint da API
    const API_URL = 'https://tech4japa.fly.dev/produtos';
    
    // CORREÇÃO: O filtro agora usa o identificador EXATO 'Sushi House'
    const MEU_RESTAURANTE_ID = 'Sushi House'; 

    const productCards = document.querySelectorAll('.produto-card');

    /**
     * Busca os produtos na API, filtra e exibe nos cards.
     */
    async function fetchAndDisplayProducts() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
            }

            const allProducts = await response.json();
            
            // 1. Filtrar os produtos cadastrados por você
            const myProducts = allProducts.filter(product => 
                product.restaurante === MEU_RESTAURANTE_ID
            );
            
            // 2. Exibir os produtos nos cards disponíveis
            myProducts.forEach((product, index) => {
                if (index < productCards.length) {
                    const card = productCards[index];
                    
                    // Armazena o ID do produto para a página de detalhes
                    card.dataset.productId = product.id; 
                    
                    updateCardContent(card, product);
                    
                    // Adiciona um listener para navegação para a página de detalhes
                    card.addEventListener('click', () => {
                        window.location.href = `detalhes.html?id=${product.id}`;
                    });
                }
            });

            // Oculta cards extras, se houver
            for (let i = myProducts.length; i < productCards.length; i++) {
                productCards[i].style.display = 'none';
            }

        } catch (error) {
            console.error('Falha ao carregar ou exibir os produtos:', error);
            const errorArea = document.getElementById('cardapio-erro-mensagem');
            if (errorArea) {
                errorArea.innerHTML = '<p class="mensagem-erro">Não foi possível carregar os produtos. Verifique o console ou a API.</p>';
            }
        }
    }
    
    /**
     * Função para atualizar o HTML de um card com os dados do produto.
     */
    function updateCardContent(card, product) {
        // CORREÇÃO: Usando 'produto' (Takoyaki) em vez de 'nome' (João Bulhoes)
        card.querySelector('.produto-nome').textContent = product.produto; 
        card.querySelector('.produto-descricao').textContent = product.descricao;
        
        const imageElement = card.querySelector('.produto-imagem');
        if (imageElement) {
            imageElement.src = product.imagem || 'placeholder.jpg';
            imageElement.alt = `Imagem de ${product.produto}`;
        }
    }

    fetchAndDisplayProducts();
});