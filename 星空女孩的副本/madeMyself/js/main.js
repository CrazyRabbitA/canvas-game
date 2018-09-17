var can
var ctx
var w
var h
var girPic = new Image()
var starPic = new Image()
var num = 50
var starArr = []
var lastTime
var deltaTime
var inArea = 0
var light = 0

function init () {
  can = document.querySelector('#canvas')
  ctx = can.getContext('2d')
  w = can.width
  h = can.height
  girPic.src = 'src/girl.jpg'
  starPic.src = 'src/star.png'
  for (let i = 0; i < num; i++) {
    let star = new starObj()
    star.init()
    starArr.push(star)
  }
  lastTime = Date.now()
  gameloop()
}

document.body.onload = init

function gameloop () {
  var now = Date.now()
  deltaTime = now - lastTime
  lastTime = now
  drawBackground()
  drawGirl()
  drawStars()
  showLight()
  requestAnimationFrame(gameloop)
}
function drawBackground () {
  ctx.fillStyle = '#393550'
  ctx.fillRect(0, 0, w, h)
}

function drawGirl () {
  ctx.drawImage(girPic, 100, 150, 600, 300)
}
var aa = document.querySelector('canvas')
aa.addEventListener('mousemove', inSection, false)

function inSection (e) {
  // console.dir(e.offsetX)
  let ms = e.offsetX
  let my = e.offsetY
  if ((ms > 100) & (ms < 700) & (my > 150) & (my < 450)) {
    // console.log('在区域内')
    inArea = true
  } else {
    inArea = false
  }
}
function showLight () {
  if (inArea) {
    light += 0.01
    if (light >= 1) {
      light = 1
    }
  } else {
    light -= 0.01
    if (light <= 0) {
      light = 0
    }
  }
}
