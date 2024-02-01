function searchBooks() {   // cria a função searchBooks que vai solicitar as informações a APi
    const searchInput = document.getElementById("searchInput").value;
    const apiKey = "AIzaSyBFesO1tkA-qnnX7iAlCXvtCJwuHfymikY"; // API google books key
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&key=${apiKey}`; //URL da APi google books
    
    // realiza a solicitação à API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayResults(data.items))
        .catch(error => console.error('Erro ao buscar livros:', error));

        // obter o termo de pesquisa da barra de pesquisa
        const searchTerm = document.getElementById("searchInput").value;

        // adicionar o que é pesquisado ao histórico
        searchHistory.push(searchTerm);
    
        // atualizar o histórico no localStorage
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));        
}

function displayResults(books) { // cria a função displayResults que vai exibir os resultados na página
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    if (books && books.length > 0) { //verifica se há resultados
        
        const limitedBooks = books.slice(0, 10); // limita os resultados a ser exibidos para os primeiros 10

        // iterar (repetir) os resultados e criar elementos HTML
        limitedBooks.forEach(book => {
            const bookInfo = book.volumeInfo;

            const bookElement = document.createElement("div");
            bookElement.classList.add("book");

            // Titulo do livro
            const titleElement = document.createElement("h3");
            titleElement.textContent = bookInfo.title || "Título não encontrado"; //caso não seja encontrado algum resultado exibe a mensagem
            bookElement.appendChild(titleElement);

            // Autor do livro
            const authorsElement = document.createElement("p");
            authorsElement.textContent = "Autor: " + (bookInfo.authors ? bookInfo.authors.join(", ") : "Autor não encontrado");
            bookElement.appendChild(authorsElement);

            // Editora do livro
            const publisherElement = document.createElement("p");
            publisherElement.textContent = "Editora: " + (bookInfo.publisher || "Editora não encontrada");
            bookElement.appendChild(publisherElement);
            
            //EAN e ISBN do livro
            const eanisbnElement = document.createElement("p");
            eanisbnElement.textContent = "EAN e ISBN: " + (bookInfo.industryIdentifiers ? bookInfo.industryIdentifiers.map(identifier => identifier.identifier).join(", ") : "EAN e/ou ISBN não encontrados");
            bookElement.appendChild(eanisbnElement);

            // Gênero literário do livro
            const categoriesElement = document.createElement("p");
            categoriesElement.textContent = "Gênero Literário: " + (bookInfo.categories ? bookInfo.categories.join(", ") : "Gênero não encontrado");
            bookElement.appendChild(categoriesElement);

            // Data de publicação do livro
            const publishDateElement = document.createElement("p");
            publishDateElement.textContent = "Ano de Publicação: " + (bookInfo.publishedDate || "Ano não encontrado");
            bookElement.appendChild(publishDateElement);
            
            // Numero de páginas do livro
            const pagesElement = document.createElement("p");
            pagesElement.textContent = "Número de Páginas: " + (bookInfo.pageCount || "Número de páginas não encontrado");
            bookElement.appendChild(pagesElement);

            // Preço do livro
            const priceElement = document.createElement("p");
            priceElement.textContent = "Preço estimado: " + (book.saleInfo && book.saleInfo.listPrice && book.saleInfo.listPrice.amount ? book.saleInfo.listPrice.amount + " " + book.saleInfo.listPrice.currencyCode : "Preço não disponível");
            bookElement.appendChild(priceElement);

            // Capa do livro
            const coverElement = document.createElement("img");
            coverElement.src = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : "capandsnvl.png"; //em vez de uma mensagem vai buscar uma imagem de capa nao disponivel caso a capa nao seja encontrada
            coverElement.alt = "Capa indisponivel"; //texto alternativo caso nao seja carregada a imagem
            bookElement.appendChild(coverElement); 

            // Sinopse do livro
            const descriptionElement = document.createElement("p");
            descriptionElement.textContent = "Sinopse: " + (bookInfo.description || "Sinopse não encontrada");
            bookElement.appendChild(descriptionElement);

            // Adiciona o elemento do livro ao container de resultados 
            resultsContainer.appendChild(bookElement);
        });
    
    } else {
        // Exibe uma mensagem de resultado nao encontrado caso não seja encontrado algum resultado
        const noResultsElement = document.createElement("p");
        noResultsElement.textContent = "Nenhum resultado encontrado";
        resultsContainer.appendChild(noResultsElement);
    }
}

//faz com que o botão pesquisar execute a função searchBooks ao clicar na tecla Enter
document.getElementById("searchInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        searchBooks();
    }
});