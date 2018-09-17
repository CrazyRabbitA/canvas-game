const WINDOW_WIDTH=500
const WINDOW_HEIGHT=300
const RADIUS=3
const MARGIN_LEFT=50
const MARGIN_TOP=50
var bg = new Image()

var newhour1
var newhour2
var newmin1
var newmin2
var newsec1
var newsec2



var oldhour1
var oldhour2
var oldmin1
var oldmin2
var oldsec1
var oldsec2



var ballColors=["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]
var ballAry=[]
var ballReserve=[]
// var canvas
// var cxt
window.onload=function(){
    if(!document.hidden){
        var canvas=document.querySelector('#canvas')
        var cxt=canvas.getContext('2d')
     //    console.dir(cxt)
        canvas.width=WINDOW_WIDTH
        canvas.height=WINDOW_HEIGHT
        bgRender(cxt)
        setInterval(function(){       
     render(cxt)
         update(cxt)
       },40)
    }
  
}
function render(cxt){
    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT)
    var now=new Date()
    var hour=now.getHours()
    var min=now.getMinutes()
    var sec=now.getSeconds()
    
    newhour1=parseInt(hour/10)
    newhour2=parseInt(hour%10)
    newmin1=parseInt(min/10)
    newmin2=parseInt(min%10)
    newsec1=parseInt(sec/10)
    newsec2=parseInt(sec%10)
    
// 小时
renderDigit(MARGIN_LEFT,MARGIN_TOP,newhour1,cxt)
renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,newhour2,cxt)
//冒号
renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt)
//分钟
renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,newmin1,cxt)
renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,newmin2,cxt)
//冒号
renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt)
//秒
renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,newsec1,cxt)
renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,newsec2,cxt)

for(var i=0;i<ballAry.length;i++){
    cxt.fillStyle=ballAry[i].color
    cxt.beginPath()   
    cxt.arc(ballAry[i].x,ballAry[i].y,RADIUS,0,2*Math.PI)
cxt.closePath()           
cxt.fill() 

}
}


function update(cxt){


if(oldhour1&&newhour1!=oldhour1){
    addBalls(MARGIN_LEFT,MARGIN_TOP,newhour1)
}
if(oldhour2&&newhour2!=oldhour2){
    addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,newhour2)
}
if(oldmin1&&newmin1!=oldmin1){
    addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,newmin1)
}
if(oldmin2&&newmin2!=oldmin2){
    addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,newmin2)
}
if(oldsec1&&newsec1!=oldsec1){
    addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,newsec1)
}
if(oldsec2&&newsec2!=oldsec2){
    addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,newsec2)
}

 oldhour1=newhour1
 oldhour2=newhour2
 oldmin1=newmin1
 oldmin2=newmin2
 oldsec1=newsec1
 oldsec2=newsec2
    updateBalls()
}
function renderDigit(x,y,num,cxt){ 
    cxt.fillStyle="green"
    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][j].length;j++){
          if(digit[num][i][j]==1){
            cxt.beginPath()   
                cxt.arc((x+2*j*(RADIUS+1)+RADIUS+1),(y+2*i*(RADIUS+1)+RADIUS+1),RADIUS,0,2*Math.PI)
            cxt.closePath()           
    cxt.fill()           
            }
        }
    }
}

function addBalls(x,y,num){
    // console.log(1)
    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][j].length;j++){
          if(digit[num][i][j]==1){
            var ball={
                x:x+2*j*(RADIUS+1)+RADIUS+1,
                y:y+2*i*(RADIUS+1)+RADIUS+1,
                g:Math.random()+1,
                vx:Math.pow(-1,Math.floor(Math.random()*10))*3,
                vy:-3,
                color:ballColors[Math.floor(Math.random()*10)]
            }
              ballAry.push(ball)
            }
        }
    }
}

function updateBalls(){
    for(var i=0;i<ballAry.length;i++){
        ballAry[i].x+=ballAry[i].vx
        ballAry[i].y+=ballAry[i].vy
        ballAry[i].vy+=ballAry[i].g
        
        if(ballAry[i].y>=WINDOW_HEIGHT-RADIUS){
            ballAry[i].y=WINDOW_HEIGHT-RADIUS
            ballAry[i].vy=-ballAry[i].vy*0.7
        }
        // if(ballAry[i].x>=WINDOW_WIDTH-RADIUS){
        //     ballAry[i].x=WINDOW_WIDTH-RADIUS
        //     ballAry[i].vx=-ballAry[i].vx*0.8
        // }
        if(ballAry[i].x+RADIUS>0&&ballAry[i].x-RADIUS<WINDOW_WIDTH){
ballReserve.push(ballAry[i])
        }
    } 
    ballAry=ballReserve
    ballReserve=[]
    // console.log(ballAry.length)
    // console.log(document.hidden)
}
function bgRender(cxt){
bg.src = 'src/bg.jpg'
console.dir(bg.src)
cxt.drawImage(bg, 0, 0, 500, 300)

}