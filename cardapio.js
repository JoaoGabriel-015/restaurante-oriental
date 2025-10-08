

document.addEventListener('DOMContentLoaded', () => {
   
    const API_URL = 'https://tech4japa.fly.dev/produtos';
    
    
    const MEU_RESTAURANTE_ID = 'Sushi House'; 

    const productCards = document.querySelectorAll('.produto-card');

    
    async function fetchAndDisplayProducts() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
            }

            const allProducts = await response.json();
            
           
            const myProducts = allProducts.filter(product => 
                product.restaurante === MEU_RESTAURANTE_ID
            );
            
          
            myProducts.forEach((product, index) => {
                if (index < productCards.length) {
                    const card = productCards[index];
                    
                    
                    card.dataset.productId = product.id; 
                    
                    updateCardContent(card, product);
                    
                    
                    card.addEventListener('click', () => {
                        window.location.href = `detalhes.html?id=${product.id}`;
                    });
                }
            });

            
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
    
   
    function updateCardContent(card, product) {
        
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
