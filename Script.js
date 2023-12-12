let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-button");
let newGameBtn=document.querySelector("#new-button");
let msgContainer =document.querySelector(".msg-container")
let msg=document.querySelector("#msg");

let isPlayerOTurn=true;
let winPattern=[
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];
let moveCount=0;
boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        console.log("box was clicked")
        moveCount++;
        if(isPlayerOTurn){
            box.innerText="O";
            isPlayerOTurn=false;
            box.classList.add("O-color");
            }
            else{
            box.innerText="X";
            isPlayerOTurn=true;
            box.classList.add("X-color");
            }
        box.disabled=true;

        checkWinner();
        checkDraw();
    });
});


const disabledBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};
const enabledBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};
const showWinner=(winner)=>{
    msg.innerText= `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
    moveCount=0;
};
const checkDraw=()=>{
    if(moveCount===boxes.length){
        msg.innerText="It's a draw! Play Again"
        msgContainer.classList.remove("hide");
        disabledBoxes();
        moveCount=0;
    }
};

const resetGame=()=>{
    isPlayerOTurn=true;
    enabledBoxes();
    msgContainer.classList.add("hide");
    boxes.forEach((box) => {
        box.classList.remove("O-color", "X-color");
        box.classList.remove("winner-background");
        box.classList.remove("winner-background");
        box.classList.remove("winner-background");
    });


    moveCount=0;
};
const checkWinner=()=>{
    for(let pattern of winPattern){
        // Only boxes
        let pos1 = boxes[pattern[0]];
        let pos2 = boxes[pattern[1]];
        let pos3 = boxes[pattern[2]];

        // inner text of a box
        let pos1Value= boxes[pattern[0]].innerText;
        let pos2Value= boxes[pattern[1]].innerText;
        let pos3Value= boxes[pattern[2]].innerText;
        
        if(pos1Value != "" && pos2Value != "" && pos3Value != ""){
            if(pos1Value === pos2Value && pos2Value === pos3Value){
                console.log("winner", pos1Value);
                showWinner(pos1Value);
                pos1.classList.add("winner-background");
                pos2.classList.add("winner-background");
                pos3.classList.add("winner-background");
                moveCount=0;
            }        
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);