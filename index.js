const Player = (name, symbol) => {
    return {name, symbol}
}

const displayController = (function() {
    let p1Name = document.querySelector("#p1name");
    let p2Name = document.querySelector("#p2name");
    let playerBtn = document.querySelector("#player_btn");
    let player1 = document.querySelector("#p1");
    let player2 = document.querySelector("#p2");
    let gridItems = document.querySelectorAll(".grid-item");
    let symbol = "O";

    function changeName() {
        if (p1Name.value && p2Name.value) {
            player1.textContent = p1Name.value;
            player2.textContent = p2Name.value;
        } 
    }

    function playSymbol(item) {
        let gridNum = item.id
        let gridItem = document.getElementById(`${gridNum}`)
        if (gridItem.textContent == String.fromCharCode(160)) {
            if (symbol == "O") {
                symbol = "X";
                gridItem.textContent = "X";
            } else {
                symbol = "O";
                gridItem.textContent = "O";
            }
        }
    }

    function startGame() {
        playerBtn.textContent = "New Game"
        p1Name.style.display = "none";
        p2Name.style.display = "none";
        changeName();
    }

    function newGame() {
        p1Name.style.display = "block";
        p2Name.style.display = "block";
        playerBtn.textContent = "Start Game";
        gridItems.forEach((item) => item.textContent = String.fromCharCode(160));
        symbol = "O"
    }

    return {startGame, newGame, playSymbol}
})();

const gameController = (function() {
    let win = false;
    let start = true;
    let player = 1;
    let player1 = [];
    let player2 = [];

    let form = document.querySelector(".form");
    let playerBtn = document.querySelector("#player_btn");
    let p1Name = document.querySelector("#p1name").value;
    let p2Name = document.querySelector("#p2name").value;
    let grid = document.querySelector(".grid-container");

    function addPlayers() {
        let p1 = Player(p1Name, "X");
        let p2 = Player(p2Name, "O");
    };

    function startGame() {
        form.addEventListener("submit", ((e) => e.preventDefault()));
        gameBoard();
        playerBtn.addEventListener("click", (function() {
            if (start) {
                start = false;
                addPlayers();
                displayController.startGame();
                grid.style.display = "grid";
            } else {
                start = true;
                win = false;
                displayController.newGame();
                grid.style.display = "none";
                player1 = [];
                player2 = [];
                player = 1;
            }
        }));
    }

    function playGame(item) {
        if (player == 1) {
            if (!win) {
                player = 2
            }
            player1.push(parseInt(item.id));
            winCondition(player1);
            
        } else {
            if (!win) {
                player = 1
            }
            player2.push(parseInt(item.id));
            winCondition(player2);
        }
    }


    function winCondition(player) {
        let board = [];
        let winCombos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], 
                        [1, 4, 7], [2, 5, 8], [3, 5, 7], [3, 6, 9], 
                        [1, 5, 9]];

        for (var i = 0; winCombos.length > i; i++) {
            if (board.length == 3) {
                win = true;
            } else {
                board = winCombos[i].filter((e) => player.includes(e))
            }   
        }
    }

    function gameBoard() {
        let gridItems = document.querySelectorAll(".grid-item");
        gridItems.forEach(function(item) {
                item.addEventListener("click", (function() {
                    if (win == false) {
                        if (item.textContent == String.fromCharCode(160)) {
                            playGame(item);
                            displayController.playSymbol(item);
                        }
                    } else if (win == true) {
                        let winner = "";
                        (player == 1? winner = p2Name : winner = p1Name);
                        alert(`${winner} Won!`);
                    }
                }));
            });
    }

    function beforeGame() {
        grid.style.display = "none";
    }

    return {beforeGame, startGame, winCondition}
})();

gameController.beforeGame();
gameController.startGame();
