document.addEventListener('DOMContentLoaded', () => {
    const themes = {
        fruits: ['🍎', '🍌', '🍉', '🍇', '🍓', '🍊', '🍒', '🥝'],
        emojis: ['😀', '😎', '😍', '😂', '😜', '🤩', '😇', '🤔']
    };

    const gameBoard = document.getElementById('gameBoard');
    const restartButton = document.getElementById('restartButton');
    const scoreDisplay = document.getElementById('score');
    const themeSelector = document.getElementById('theme');

    let cards = [];
    let score = 0;

    function createGameBoard(theme) {
        cards = [];
        gameBoard.innerHTML = '';
        const symbols = themes[theme];
        const shuffledSymbols = [...symbols, ...symbols].sort(() => Math.random() - 0.5);

        shuffledSymbols.forEach(symbol => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.symbol = symbol;
            card.innerHTML = symbol; // Display the symbol on the card
            card.addEventListener('click', () => flipCard(card));
            gameBoard.appendChild(card);
            cards.push(card);
        });
    }

    function flipCard(card) {
        if (card.classList.contains('flipped')) return;
    
        card.classList.add('flipped');
    
        const flippedCards = cards.filter(card => card.classList.contains('flipped'));
    
        if (flippedCards.length === 2) {
            const [card1, card2] = flippedCards;
            const symbol1 = card1.dataset.symbol;
            const symbol2 = card2.dataset.symbol;
    
            if (symbol1 === symbol2) {
                score += 10; // Increment score for a successful match
                scoreDisplay.textContent = score; // Update the score display
                setTimeout(() => {
                    card1.classList.remove('flipped');
                    card2.classList.remove('flipped');
                }, 1000);
            } else {
                // If symbols do not match, shake the incorrect cards and then flip them back
                card1.classList.add('shake');
                card2.classList.add('shake');
                setTimeout(() => {
                    card1.classList.remove('flipped', 'shake');
                    card2.classList.remove('flipped', 'shake');
                }, 1000);
            }
        }
    }
    

    restartButton.addEventListener('click', () => {
        score = 0; // Reset the score
        scoreDisplay.textContent = score; // Update the score display
        createGameBoard(themeSelector.value);
    });

    themeSelector.addEventListener('change', () => {
        createGameBoard(themeSelector.value);
    });

    createGameBoard(themeSelector.value);
});
