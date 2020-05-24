

//Canvas settings

var can = document.getElementById("siam");
var c = can.getContext("2d");
var ch=300;
var cw=300;
can.height = ch;
can.width = cw;
//Initializations
var MaxScore=30;
var score = 0;
var lose_img = new Image();
lose_img.src = "bg2.png";
var won_img=new Image();
won_img.src="wonback.jpg";
var lose_aud=new Audio();
lose_aud.src="Hatemilk.mp3";
var win_aud=new Audio();
win_aud.src="scream.mp3";
var scb = document.getElementById("scoreboard");
//Random position generator
function getRnd() {
  
  return Math.floor(Math.random() * 15) * 20;
}
//Distance calc
function distcount(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));

}
//Controls start
function right() {
  cube1.dx = 20;
  cube1.dy = 0;
  timerInit();
  
}

function left() {
  cube1.dx = -20;
  cube1.dy = 0;
  timerInit();
  
}


function up() {
  cube1.dy = -20;
  cube1.dx = 0;
  timerInit();
  
}

function down() {
  cube1.dy = 20;
  cube1.dx = 0;
  timerInit();
  
}
//Controls end
//Draw glass of milk
var mug_img = new Image();
mug_img.src = "mug.png";
function Fruit(x,y){
  this.h=20;
  this.w=20;
  this.x=x;
  this.y=y;
  this.draw=function(){
    
    c.drawImage(mug_img,this.x,this.y,this.w,this.h);
  }
}
//Glass finished
//Draw Edward
var ed=new Image();
ed.src="edwar.jpeg";
function Box(x,y) {
  this.h = 20;
  this.w = 20;
  this.x = x;
  this.y = y;
  this.dx = 0;
  this.dy = 0;
  this.draw = function() {
    
    c.drawImage(ed,this.x,this.y,this.w,this.h);
  }

  this.update = function() {
    this.x += this.dx;
    this.y += this.dy;
    
    if (this.x+this.w> cw) {
      this.x = 0;

    }
    if (this.x < 0) {
      this.x = cw;
    }
    if (this.y +this.h> ch) {
      this.y = 0;

    }
    if (this.y < 0) {
      this.y = ch;
    }
    this.draw();
  }
}
//Edward finished
//Timer initialize 
var timeC=100;
var tmb=document.getElementById("timeboard") ;
var z = false;

function timerInit() {
  if (z == false) {
    setInterval(function() {
      timeC--;
      timep.innerHTML = "Remaining Time:" + timeC;

    }, 1000);
    z = true;
  }
}
//Timer end
var cube1 = new Box(0, 0);
var fru1=new Fruit(getRnd(),getRnd());
//Justification engine
function isgamefinished(s,t){
   undef();
   clearInterval(time);
  if(s>=MaxScore && t>=0){
    //Gamewon
    
   
    setTimeout(function(){
      c.drawImage(won_img,0,0,cw,ch);
      win_aud.play();
    },1000);
    
    
  }
  else if(s<MaxScore && t<=0){
    //Gamelost
    
    setTimeout(function() {
      c.drawImage(lose_img, 0, 0, cw, ch);
      lose_aud.play();
    }, 1000);
  }
}

function undef(){
  fru1.x=undefined;
  fru1.y=undefined;
  cube1.x=undefined;
  cube1.y=undefined;
}




var time=setInterval(animate,250);

function animate() {
  //window.requestAnimationFrame(animate);
  scb.innerHTML="Score:"+score;
  tmb.innerHTML="Time left:"+timeC;
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  fru1.draw();
  
  cube1.update();
  
  
  var p=distcount(cube1.x,cube1.y,fru1.x,fru1.y);
  if(p==0){
    score++;
    fru1.x=getRnd();
    fru1.y=getRnd();
  }
  if (score == MaxScore || timeC <= 0) {
      isgamefinished(score, timeC);
    }
  

}
animate();
