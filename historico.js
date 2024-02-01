// objeto que vai armazenar o histórico de pesquisas
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

// função que atualiza o histórico de pesquisas exibido
function updateSearchHistory() {
    const historyList = document.getElementById("historyList");
    historyList.innerHTML = "";

    for (const query of searchHistory) {
        const listItem = document.createElement("li");
        listItem.textContent = query;
        historyList.appendChild(listItem);
    }
}

// função que vai exibir o histórico de pesquisas na caixa
function displayResults() {
    const resultsContainer = document.getElementById("historyBox");
    resultsContainer.innerHTML = "";
}

// função que apaga o histórico de pesquisas
function clearHistory() {
    localStorage.removeItem('searchHistory');
    searchHistory.length = 0; // Limpar o array local também
    updateSearchHistory();
}

// chamar a função que atualiza o historico de pesquiisa ao carregar a página
updateSearchHistory();

// faz com que o botão Apagar histórico execute a função clearHistory ao clicar na tecla Del ou Delete
document.addEventListener('keydown', function(event) {
    if (event.key === 'Delete' || event.key === 'del') {
        clearHistory();
    }
});

// função que vai apagar um item específico do histórico a escolha do utilizador
function deleteHistoryItem(index) {
    searchHistory.splice(index, 1);
    updateSearchHistory();
    saveHistoryToLocalStorage(); // salva no armazenamento local
}

// função que salva o histórico no armazenamento local
function saveHistoryToLocalStorage() {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

// função para carregar o histórico do armazenamento local
function loadHistoryFromLocalStorage() {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
        searchHistory = JSON.parse(savedHistory);
    }
}

// função que atualizaa o histórico que vai ser exibido
function updateSearchHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';

    // adiciona os itens atualizados do histórico à lista
    searchHistory.forEach((item, index) => {
        const listItem = document.createElement('li');
        const deleteButton = document.createElement('button');

        listItem.textContent = item;
        deleteButton.textContent = 'Excluir';
        deleteButton.classList.add('deleteButton');
        deleteButton.onclick = function() {
            deleteHistoryItem(index);
        };

        // adiciona o botão "Excluir" à direita de cada item
        listItem.appendChild(deleteButton);
        historyList.appendChild(listItem);
    });
}