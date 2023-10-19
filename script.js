let inputs = document.querySelectorAll("input");
let message = document.querySelector("#requiredMessage");
let divs_In_Leader_Board = document.querySelectorAll(".board div");
let leaderBoard = document.querySelector(".board");
let boardElements = document.querySelectorAll(".boardElements");
let ArrayOfEle = [];
for (let i = 0; i < boardElements.length; i++) {
  ArrayOfEle.push(boardElements[i]);
}

inputs[4].addEventListener("click", (e) => {
  e.preventDefault();
  let firstName = inputs[0].value,
    lastName = inputs[1].value,
    country = inputs[2].value,
    score = inputs[3].value;
  if (firstName == "" || lastName == "" || country == "" || score == "") {
    message.innerText = "All Fields Are Required";
    return;
  }
  addPlayer(firstName, lastName, country, score, leaderBoard);
  removebtn();
  Add_sub();
  for (let i = 0; i < inputs.length - 1; i++) inputs[i].value = ""; 
});
let month=['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']
// ----------Adding New Player---------------------------
function addPlayer(firstName, lastName, country, score, leaderBoard) {
  let newDiv = document.createElement("div");
  newDiv.classList.add("boardElements");
  newDiv.innerHTML = `  <span>${firstName} ${lastName}
  <p> <span class="date">${new Date().getDate()}</span> <span class="month">${month[new Date().getMonth()]}</span> <span class="year">${new Date().getFullYear()}</span> <span class="hr">${new Date().getHours()}</span>:<span class="min">${new Date().getMinutes()}</span>:<span class="sec">${new Date().getSeconds()}</span></p>
</span>
                        <span>${country}</span>
                        <span class="score">${score}</span>
                        <span><i class="fa-solid fa-trash"></i></span>
                        <span class="addition_5">+5</span>
                        <span>-5</span>`;
  leaderBoard.appendChild(newDiv);
  ArrayOfEle.push(newDiv);
  sortArray(ArrayOfEle);
  removebtn() 
}

//  -----------------Delete Player---------------------
function removebtn() {
  let deleteBtn = document.querySelectorAll(".fa-solid");
  deleteBtn.forEach((ele, idx) => {
    ele.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.remove();
      console.log(e.target.parentElement.parentElement);
    });
  });
}

// ------------------Addition and subtraction------------------------
function Add_sub() {
  boardElements = document.querySelectorAll(".boardElements");
  let scoreEle = document.querySelectorAll(".score");
  boardElements.forEach((ele, idx) => {
    ele.addEventListener("click", add_subCallback);
    
  });
}

function add_subCallback(event){
let score=document.querySelectorAll(".score");
  if (event.target.innerText == +5) {
    event.target.parentElement.children[2].innerText = parseInt(event.target.parentElement.children[2].innerText) + 5;
  } else if (event.target.innerText == -5) {
    event.target.parentElement.children[2].innerText = parseInt(event.target.parentElement.children[2].innerText) - 5;
  }
  // sortArray(ArrayOfEle);
}

// --------------Sorting-----------------------------------
function sortArray(arr) {
  // console.log(arr);
  arr.sort((a, b) => {
    if (parseInt(a.children[2].innerText) > parseInt(b.children[2].innerText)) {
      return -1;
    } else if (parseInt(a.children[2].innerText) < parseInt(b.children[2].innerText)) {
      return 1;
    } else {
      return 0;
    }
  });
  replaceUnsorted(arr);  
}

// --------------------ReplaceUnsorted---------------------
function replaceUnsorted(arr) {
  for(let i=0;i<arr.length;i++){
    if(arr[i].children[2].innerText>=500){
      arr[i].style.backgroundColor="#98FB98";
    }else if(arr[i].children[2].innerText<=500 && arr[i].children[2].innerText>=100){
      arr[i].style.backgroundColor="antiquewhite";
    }else{
      arr[i].style.backgroundColor="#F7B4B4";
    }
  }
  leaderBoard = document.querySelector(".board");
  leaderBoard.replaceChildren(...arr);
}

Add_sub();
removebtn();
sortArray(ArrayOfEle);
