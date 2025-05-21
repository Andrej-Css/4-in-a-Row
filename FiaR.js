const displayController = (()=>{
    const renderMessage = (message)=>{
        document.querySelector(".message").innerHTML = message;
    }
    return {
        renderMessage,
    }
})();

const GameBoard = (() =>{
    let gameboard = [
    "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", 
    "", "", "", "", "", "", "", 
    ];

    const render = () => {
        let boardHTML = ""; 
        gameboard.forEach((round,index)=>{
            if (round){
                boardHTML += `<div class="round" id="round-${index}"><div class="disc ${round}"></div></div>`;
            } else {
                boardHTML+=`<div class = "round" id="round-${index}">${round}</div>`
            }
        })
        document.querySelector(".gameboard").innerHTML=boardHTML;
        const round = document.querySelectorAll(".round");
        console.log(round);

        round.forEach((round)=>{
            round.addEventListener("click", Game.handleClick);
        })
    }

    const update = (index,value) =>{
        gameboard[index]=value;
        render();
    }

    const getGameboard = () => gameboard; 

    return {
        render,
        update,
        getGameboard,
    }

})();

const createPlayer = (name,clr)=>{
    return {
        name,
        clr
    }
}

const Game = (()=>{
    let players = []; 
    let currentPlayerIndex;
    let gameOver;


    const start = () =>{

        players = [
            createPlayer(document.querySelector("#player1").value, "blue"),
            createPlayer(document.querySelector("#player2").value, "red"),
            
        ]

        currentPlayerIndex = 0; 
        gameOver = false;
        GameBoard.render();

    }; 
    
    const handleClick=(event)=>{
        if (gameOver){
            return;
        }
        let index = parseInt(event.target.id.split("-")[1]);
        console.log(index);

        if (GameBoard.getGameboard()[index]!== ""){
            return;
        }
        GameBoard.update(index,players[currentPlayerIndex].clr);

        if (checkForWin(GameBoard.getGameboard(), players[currentPlayerIndex].clr)){
            gameOver = true; 
            displayController.renderMessage(`${players[currentPlayerIndex].name} wins!`);
            console.log('winner!!');
        }

        currentPlayerIndex = currentPlayerIndex === 0? 1:0;
    }

   
    

    const restart=()=>{
        for (let i=0; i<42; i++){
            GameBoard.update(i,'');
        }
        GameBoard.render();
        gameOver = false;

    }
    

    return {
        start,
        restart,
        handleClick,

    }

})();

function checkForWin(board){
    const winningCombination =[
        [0,1,2,3],
        [3,4,5,6],
        [7,8,9,10],
        [10,11,12,13],
        [14,15,16,17],
        [17,18,19,20],
        [21,22,23,24],
        [24,25,26,27],
        [28,29,30,31],
        [31,32,33,34],
        [35,36,37,38],
        [38,39,40,41],
        [0,7,14,21],
        [14,21,28,35],
        [1,8,13,22],
        [13,22,29,36],
        [2,9,16,23],
        [16,23,30,37],
        [3,10,17,24],
        [17,24,31,38],
        [4,11,18,25],
        [18,25,32,39],
        [5,12,19,26],
        [19,26,33,40],
        [6,13,20,27],
        [20,27,34,41],
        [21,15,9,3],
        [28,22,16,10],
        [22,16,10,4],
        [35,29,23,17],
        [29,23,17,11],
        [23,17,11,5],
        [36,30,24,18],
        [30,24,18,12],
        [24,18,12,6],
        [37,31,25,19],
        [31,25,19,13],
        [38,32,26,20],
        [1,2,3,4],
        [8,9,10,11],
        [15,16,17,18],
        [22,23,24,25],
        [36,37,38,39],
        [2,3,4,5],
        [9,10,11,12],
        [16,17,18,19],
        [23,24,25,26],
        [30,31,32,33],
        [37,38,39,40],
        [14,22,30,38],
        [7,15,23,31],
        [15,23,31,38],
        [0,8,16,24],
        [8,16,24,32],
        [16,24,32,39],
        [1,9,17,23],
        [9,17,23,33],
        [17,23,33,41],
        [2,10,18,26],
        [10,18,26,34],
        [3,11,19,27]
    ]
    for (let i=0; i<winningCombination.length; i++){
        const [a,b,c,d] = winningCombination[i]; // destructuring
       if (board[a] && board[a]===board[b] && board[a]===board[c] && board[a]===board[d]) {
        return true;
       }
    }
    return false;
} 

const restartButton = document.querySelector(".restart-button"); 
restartButton.addEventListener("click",()=>{
    Game.restart();
})

const startButton = document.querySelector(".start-button"); 
startButton.addEventListener("click", ()=>{
    Game.start(); 
})
