var canvas = document.getElementById("reversi")
var displayPlayer = document.getElementById("player")
var log = document.getElementById("log")

var ctx = canvas.getContext("2d")
var playBoard = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
]
var player = 1
displayPlayer.innerText = "white"

ctx.fillStyle = "black"

// クリックした座標に石を置く
function onClickPutStone(event){
  // HTMLの中にCANVASがあるので、CANVASのどの位置をクリックしたか
 
  var rect = event.target.getBoundingClientRect();
  x = event.clientX - rect.left;
  y = event.clientY - rect.top;
  x = x - x % 40 + 20 // キリが良い箇所に配置されるようにx座標を補正
  y = y - y % 40 + 20 // キリが良い箇所に配置されるようにy座標を補正
  
  // どこに石を置いたか記憶する
  var posX = (x-20) / 40
  var posY = (y-20) / 40

  putStone(posX, posY, player);
  console.log(playBoard)
}

function changePlayer(){
  if(player == 1){
  	player = 2
    displayPlayer.innerText = "black"
  }else{
  	player = 1
    displayPlayer.innerText = "white"
  }
}
// 初期配置を行う関数
function initialize(){
  putStone(3, 4, 1)
  putStone(4, 4, 2)
  putStone(3, 3, 2)
  putStone(4, 3, 1)
}
// 座標を指定しして石を置く
function putStone(x, y, stone){
  if(stone == 1){
    color = "white"
  }else{
  	color = "black"
  }
  
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(40*x + 20, 40*y + 20, 16, 0, 2 * Math.PI);
  ctx.fill();

  playBoard[x][y] = 1 // 1:white 2:black とする
}
// マス目を引く処理
function drawPlayBoard () {
  // 縦に線を引く
  for (let col = 0; col < 8; col++) {
    ctx.beginPath(); // Start a new path
    ctx.moveTo(40 * col, 0); // Move the pen to
    ctx.lineTo(40 * col, 320); // Draw a line to
    ctx.stroke();
  }
  // 横に線を引く
  for (let row = 0; row < 8; row++) {
    ctx.beginPath(); // Start a new path
    ctx.moveTo(0, 40 * row); // Move the pen to
    ctx.lineTo(320, 40 * row); // Draw a line to 
    ctx.stroke();
  }
}

// 盤面を描く
drawPlayBoard()
// 初期配置
initialize()