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

    }

    // Check neighboring squares once square is clicked
    function checkSquare(square, currentId) {

        const isLeftEdge = (currentId % width === 0)
        const isRightEdge = (currentId % width === -1)

        setTimeout(() =>{
            if(currentId > 0 && !isLeftEdge){
                const newId =squares[parseInt(currentId) -1].id;
                const newSquare = document.getElementById(newId);
                Click(newSquare);
            }
            if(currentId > 9 && !isRightEdge){
                const newId =squares[parseInt(currentId) + 1 -width].id;
                const newSquare = document.getElementById(newId);
                Click(newSquare);
            }
            if(currentId > 10){
                const newId = squares[parseInt(currentId - width].id;
                const newSquare = document.getElementById(newId);
                Click(newSquare);
            }
            if(currentId >= 11 && !isLeftEdge){
                const newId = squares[parseInt(currentId) - 1 - width].id;
                const newSquare = document.getElementById(newId);
                Click(newSquare);
            }
            if(currentId <= 98 && !isRightEdge){
                const newId = squares[parseInt(currentId) + 1].id;
                const newSquare = document.getElementById(newId);
                Click(newSquare);
            }
            if(currentId < 90 && !isLeftEdge){
                const newId = squares[parseInt(currentId) - 1 + width].id;
                const newSquare = document.getElementById(newId);
                Click(newSquare);
            }
            if(currentId <= 88 && !isRightEdge) {
                const newId = squares[parseInt(currentId) + 1 + width].id;
                const newSquare = document.getElementById(newId);
            Click(newSquare);
            }
            if(currentId <= 89){
                const newId = squares[parseInt(currentId)  + width].id;
                const newSquare = document.getElementById(newId);
                Click(newSquare);
            }
        }, 10);
    }
    // Timer
    let startTime = function () {
        intervalRef = setInterval(() =>{
          count+=10;
          let s = Math.floor((count / 1000));
          timer.innerHTML = s;
          if(s >= 90){
              clearInterval(intervalRef);
              timeUp();
          }
        }, 10);
        removeEventListener('click', startTime);
    }

    window.addEventListener('click', startTime);

    function timeUp(){
        timer.innerHTML = 'END';
        emojiBtn.innerHTML = '😔';
        result.innerHTML = 'Out Of Time!';
        isGameOver = 'true';

        //Showing all bombs
        squares.forEach(square => {
            if(square.classList.contains('bombs')){
                square.innerHTML = '💣';
            }
        });
    }


    // Game over function
    function gameOver(square) {
        clearInterval(intervalRef);
        timer.innerHTML = 'END';
        emojiBtn.innerHTML = '😵‍💫';
        result.innerHTML = 'BOOM! Game Over!';
        isGameOver = 'true';

        //Showing all bombs
        squares.forEach(square => {
            if (square.classList.contains('bombs')) {
                square.innerHTML = '💣';
            }
        });
    }

    function checkForWin(){
        let matches = 0;
        for(let i = 0; i < squares.length; i++){
            if(squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')){
                matches++;
            }
            if(matches === bombAmount){
                clearInterval(intervalRef);
                timer.innerHTML = 'WIN';
                emojiBtn.innerHTML = '😎';
                result.innerHTML = 'YOU WIN!'
                isGameOver = 'true';
            }
        }
    }

    //Reload Game
    emojiBtn.addEventListener('click', function (e){
        emojiBtn.style.borderColor = '#F0B7A4 #FFEBCF #FFEBCF #F0B7A4';
        location.reload();
    })


});
//41:30