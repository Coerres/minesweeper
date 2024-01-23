// Event listener
document.addEventListener('DOMContentLoaded', () => {
    // Variables declaration
    const grid = document.querySelector('.grid');
    const emojiBtn = document.querySelector('.emoji-btn');

    const flagsLeft = document.getElementById('flags-left');
    const result = document.getElementById('result');
    const timer = document.getElementById('timer');

    let width = 10;
    let bombAmount = 5;
    let flags = 0;
    let squares = [];
    let count = 0;
    let intervalRef = null;
    let isGameOver = false;

    // Create game board
    function createBoard() {
        // Get shuffled game array with random bombs
        const bombsArray = Array(bombAmount).fill('bomb');
        const emptyArray = Array(width * width - bombAmount).fill('valid');
        const gameArray = emptyArray.concat(bombsArray);
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5);
        emojiBtn.innerHTML = '😀';
        flagsLeft.innerHTML = bombAmount;

        // Create tiles with bombs
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            square.setAttribute('id', i);
            square.classList.add(shuffledArray[i]);
            grid.appendChild(square);
            squares.push(square); // Push square into the squares array

            // Normal click
            square.addEventListener('click', function (e) {
                if (isGameOver) { return; }
                emojiBtn.innerHTML = '😬';
                Click(square);
            });

            // Left click [for flag checking]
            square.oncontextmenu = function (e) {
                e.preventDefault();
                addFlag(square);
            }

            // Mouseover
            square.addEventListener('mouseover', function (e) {
                if (isGameOver) { return; }
                emojiBtn.innerHTML = '😖';
            });
        }

        // Add numbers to squares
        for (let i = 0; i < squares.length; i++) {
            let total = 0;
            const isLeftEdge = (i % width === 0);
            const isRightEdge = (i % width === width - 1);

            if (squares[i].classList.contains('valid')) {
                if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) { total++ };
                if (i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) { total++ };
                if (i > 10 && squares[i - width].classList.contains('bomb')) { total++ };
                if (i > 11 && !isLeftEdge && squares[i - 1 - width].classList.contains('bomb')) { total++ };
                if (i > 98 && !isRightEdge && squares[i + 1].classList.contains('bomb')) { total++ };
                if (i > 90 && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb')) { total++ };
                if (i > 88 && !isRightEdge && squares[i + 1 + width].classList.contains('bomb')) { total++ };
                if (i > 89 && squares[i + width].classList.contains('bomb')) { total++ };
                squares[i].setAttribute('data', total);
            }
        }
    }
    createBoard();

    // Add flag with right click
    function addFlag(square) {
       if(isGameOver) {return}
       if(!square.classList.contains('checked') && (flags < bombAmount)) {
           if(!square.classList.contains('flag')) {
               square.classList.add('flag');
               square.innerHTML = '🚩';
               flags++;
               flagsLeft.innerHTML = bombAmount - flags;
           } else {
               square.classList.remove('flag');
               square.innerHTML = '';
               flags--;
               flagsLeft.innerHTML = bombAmount - flags;
           }
       }
    }

    // Action after clicking on square
    function click(square) {
        let currentId = square.id;
        if(isGameOver) {return}
        if(square.classList.contains('checked') || square.classList.contains('flag')) {return};
        if(square.classList.contains('bomb')){

        }else{
            let total = square.getAttribute('data');
            if(total != 0){
                square.classList.add('checked');
                if(total == 1) { square.classList.add('one')};
                if(total == 2) { square.classList.add('two')};
                if(total == 3) { square.classList.add('three')};
                if(total == 4) { square.classList.add('four')};
                square.innerHTML = total;
                return
            }
        }
        square.classList.add('checked');
        //30:50
    }

    // Check neighboring squares once square is clicked
    function checkSquare(square) {
        // Implement the functionality to check neighboring squares
        const currentId = square.id;
        const isLeftEdge = (currentId % width === 0);
        const isRightEdge = (currentId % width === width - 1);

        setTimeout(() => {
            // Add your logic to check neighboring squares here
        }, 10);
    }

    // Timer
    let startTime = function () {
        // Implement the timer logic
    }

    // Game over function
    function gameOver(square) {
        // Implement the game over functionality
        isGameOver = true;
        emojiBtn.innerHTML = '😵';
        result.innerHTML = 'Game Over!';
        revealBombs();
    }

    // Check for a win
    function checkWin() {
        // Implement the logic to check for a win
    }

    // Reveal all bombs
    function revealBombs() {
        // Implement the logic to reveal all bombs
    }
});
