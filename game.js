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
                emojiBtn.innerHTML = '😖';
            });
        }



    }

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









