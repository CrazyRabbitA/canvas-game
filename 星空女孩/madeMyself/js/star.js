function starObj () {

}
starObj.prototype.init=function(){
    this.x = Math.random() * 600 + 100
    this.y = Math.random() * 300 + 150
    this.picNum = Math.floor(Math.random() * 7)
    this.timer = 0
    this.xspd = Math.random() * 4 - 2
    this.yspd = Math.random() * 4 - 2
}
starObj.prototype.draw = function () {
    ctx.save()
    ctx.globalAlpha=light
  ctx.drawImage(starPic, this.picNum * 7, 0, 7, 7, this.x, this.y, 7, 7)
  ctx.restore()
}
starObj.prototype.update = function () {
  this.timer += deltaTime
  if (this.timer > 100) {
    this.picNum = this.picNum + 1
    this.picNum %= 7
    this.timer = 0
  }
  this.x += this.xspd * 0.1
  this.y += this.yspd * 0.1
  //重生判断
if(this.x<100||this.x>700||this.y<150||this.y>450){
    this.init()
    return
}
}
function drawStars () {
  for (var i = 0; i < num; i++) {
    starArr[i].update()
    starArr[i].draw()
  }
}
