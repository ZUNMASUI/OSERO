
var canvas = document.getElementById("reversi")
var ctx = canvas.getContext("2d")

ctx.fillStyle = "black"
// 縦の線を引く

for (let col = 0; col < 8; col++) {
  ctx.beginPath(); // Start a new path
  ctx.moveTo(40 * col, 0); // Move the pen to
  ctx.lineTo(40 * col, 320); // Draw a line to
  ctx.stroke();
}
// 横の線を引く
for (let row = 0; row < 8; row++) {
  ctx.beginPath(); // Start a new path
  ctx.moveTo(0, 40 * row); // Move the pen to
  ctx.lineTo(320, 40 * row); // Draw a line to 
  ctx.stroke();
}