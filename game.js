//Event listener
document.addEventListener('DOMContentLoaded', () => {
    //Variables declaration
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

    //Create game board
    function createBoard(){
        //Get shuffled game array with random bombs
        const bombsArray = Array(bombAmount).fill('bomb');
        const emptyArray = Array (width * width - bombAmount).fill ('valid');
        const gameArray = emptyArray.concat(bombsArray);
        const shuffledArray = gameArray.sort (() => Math.random() - 0.5);
        emojiBtn.innerHTML = '😀';
        flagsLeft.innerHTML = bombAmount;

        //Create titles with bombs
        for (let i = 0; i < width * width ; i++){
            const square = document.createElement('div');
            square.setAttribute('id', i);
            square.classList.add(shuffledArray[i]);
            grid.appendChild(square);
            square.push(square)

            //Normal click
            square.addEventListener('click', function (e){
                if(isGameOver) {return}
                emojiBtn.innerHTML = '😬';
                click(square);
            });

            //Left click [for flag checking]
            square.oncontextmenu = function (e){
                e.preventDefault();
                addFlag(square);
            }

            //Mouseover
            square.addEventListener('mouseover', function (e){
                if(isGameOver) {return}
                emojiBtn.innerHTML = '😖';
            });
        }

        //Add numbers to squares
        for (let i = 0; i < squares.length; i++) {
            let total = 0;
            const isLeftEdge = (i % width === 0);
            const isRightEdge = (i % width === width -1);

            if(squares[i].classList.contains('valid')){
                if(i > 0 && !isLeftEdge && squares[i-1].classList.contains('bomb')){ total++ };
                if(i > 9 && !isRightEdge && squares[i+1 - width].classList.contains('bomb')){ total++ };
                if(i > 10 && squares[ i- width ].classList.contains('bomb')){ total++ };
                if(i > 11 && !isLeftEdge && squares[i - 1 - width].classList.contains('bomb')){ total++ };
                if(i > 98 && !isRightEdge && squares[i + 1].classList.contains('bomb')){ total++ };
                if(i > 90 && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb')){ total++ };
                if(i > 88 && !isRightEdge && squares[i + 1 + width].classList.contains('bomb')){ total++ };
                if(i > 89 && squares[i + width].classList.contains('bomb')){ total++ };
                squares[i].setAttribute('data', total);
            }
        }
    }
    createBoard();

    //Add flag with right click
    function addFlag(someInput){

    }

    //Action after clicking on square
    function click(){

    }

    //Check neighbring squares once square is clicked
    function checkSquare(){

    }

    //Timer
    let startTime = function (){}

    //Game over function
    function gameOver(someInput){}
})









