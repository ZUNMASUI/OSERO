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

  var rect = event.target.getBoundingClientRect();
  x = event.clientX - rect.left;
  y = event.clientY - rect.top;
  console.log({x, y})
  putStone(x, y, "white")
  // 下だと、クリック位置とずれる
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