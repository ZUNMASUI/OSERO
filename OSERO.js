var canvas = document.getElementById("reversi")
var ctx = canvas.getContext("2d")

ctx.fillStyle = "black"

for (let col = 0; col < 8; col++) {
  ctx.beginPath(); // Start a new path
  ctx.moveTo(40 * col, 0); // Move the pen to
  ctx.lineTo(40 * col, 320); // Draw a line to
  ctx.stroke();
}
for (let row = 0; row < 8; row++) {
  ctx.beginPath(); // Start a new path
  ctx.moveTo(0, 40 * row); // Move the pen to
  ctx.lineTo(320, 40 * row); // Draw a line to 
  ctx.stroke();
}

function putStone(x, y, color){
	ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 16, 0, 2 * Math.PI);
  ctx.fill();
}

// クリックした座標に石を置く
function putStoneAt(event){
	// HTMLの中にCANVASがあるので、CANVASのどの位置をクリックしたか
 	// 調整するために、CANVASとHTMLの位置関係から補正しています
  var rect = event.target.getBoundingClientRect();
  x = event.clientX - rect.left;
  y = event.clientY - rect.top;
  console.log({x, y})
  // 20 + 40n に配置されるようにすれば良い
  // % は 余りを取得する演算子 
  // fx1. 158なら38 (158-38+20=140) 
  // fx2. 170なら１０ (170-10+20=180) 
  x = x - x % 40 + 20 // キリが良い箇所に配置されるようにx座標を補正
  y = y - y % 40 + 20 // キリが良い箇所に配置されるようにy座標を補正
  putStone(x, y, "white")
  // 参考：下記の実装だと、クリック位置とずれる
  // console.log({event.clientX, event.clientY})
  // putStone(event.clientX, event.clientY, "white")
}

// 初期配置を行う関数
function initialize(){
  putStone(140, 140, "white")
  putStone(180, 140, "black")
  putStone(140, 180, "black")
  putStone(180, 180, "white")
}

// 初期配置を実装
initialize()