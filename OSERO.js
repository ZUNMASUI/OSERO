var canvas = document.getElementById("reversi");
var displayPlayer = document.getElementById("player");
var log = document.getElementById("log");

var ctx = canvas.getContext("2d");
var playBoard = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0]
];
var player = 1;
displayPlayer.innerText = "white";

ctx.fillStyle = "black";

// クリックした座標に石を置く
function onClickPutStone(event) {
  // HTMLの中にCANVASがあるので、CANVASのどの位置をクリックしたか
  // 調整するために、CANVASとHTMLの位置関係から補正しています
  var rect = event.target.getBoundingClientRect();
  x = event.clientX - rect.left;
  y = event.clientY - rect.top;
  x = x - (x % 40) + 20; // キリが良い箇所に配置されるようにx座標を補正
  y = y - (y % 40) + 20; // キリが良い箇所に配置されるようにy座標を補正

  // どこに石を置いたか記憶する
  var posX = (x - 20) / 40;
  var posY = (y - 20) / 40;

  if (playBoard[posX][posY] === 0) {
    putStone(posX, posY, player);
    flipStones(posX, posY, player);
    console.log(playBoard);
    changePlayer(); // プレイヤーを切り替える
  }
}


function changePlayer(){
  if(player == 1){
    player = 2;
    displayPlayer.innerText = "black";
  }else{
    player = 1;
    displayPlayer.innerText = "white";
  }
}

// 初期配置を行う関数
function initialize(){
  putStone(3, 4, 1);
  putStone(4, 4, 2);
  putStone(3, 3, 2);
  putStone(4, 3, 1);
}

// 座標を指定しして石を置く
function putStone(x, y, stone){
  if(stone == 1){
    color = "white";
  }else{
    color = "black";
  }
  
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(40*x + 20, 40*y + 20, 16, 0, 2 * Math.PI);
  ctx.fill();

  playBoard[x][y] = stone; // stoneに変更
}

// 石をひっくり返す
function flipStones(x, y, stone) {
  var directions = [
    [-1, 0],  // 上
    [1, 0],   // 下
    [0, -1],  // 左
    [0, 1],   // 右
    [-1, -1], // 左上
    [-1, 1],  // 右上
    [1, -1],  // 左下
    [1, 1]    // 右下
  ];

  for (var i = 0; i < directions.length; i++) {
    var dx = directions[i][0];
    var dy = directions[i][1];
    var flippedStones = [];
    var currentX = x + dx;
    var currentY = y + dy;

    while (currentX >= 0 && currentX < 8 && currentY >= 0 && currentY < 8 && playBoard[currentX][currentY] !== stone && playBoard[currentX][currentY] !== 0) {
      flippedStones.push({x: currentX, y: currentY});
      currentX += dx;
      currentY += dy;
    }

    if (currentX >= 0 && currentX < 8 && currentY >= 0 && currentY < 8 && playBoard[currentX][currentY] === stone) {
      for (var j = 0; j < flippedStones.length; j++) {
        var flippedX = flippedStones[j].x;
        var flippedY = flippedStones[j].y;
        putStone(flippedX, flippedY, stone);
      }
    }
  }
}

// マス目を引く処理
function drawPlayBoard() {
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
drawPlayBoard();
// 初期配置
initialize();
// クリック時のイベントリスナーを設定
canvas.addEventListener("click", onClickPutStone);