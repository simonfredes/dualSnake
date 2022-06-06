var s;
var f;
const ancho= 10;
const alto= 10; 

function setup() {
  createCanvas(500, 500);
  s= new Snake();  
  f = new food();
  f.generate();
}


function draw() {
  background(50);
  s.update();
  s.show();
  f.show();
}

function keyPressed(){
  key_pressed = event.key;
    switch (key_pressed){
     case 'ArrowUp' : s.dir(0,-1);break;
     case 'ArrowDown' : s.dir(0,1);break;
     case 'ArrowRight' : s.dir(1,0);break;
     case 'ArrowLeft' : s.dir(-1,0);break;
    }
}
function food(){
  this.fX=0;
  this.fY=0;
  
  this.generate = function() {
    this.fX= random(width)
    this.fY= random(height);
  }
  
  this.show = function () {
    fill(250,0,0);
    rect(this.fX, this.fY , ancho, alto);

  }
}

function Snake() {
  this.x=0;
  this.y=0;
  this.speedx=1;  
  this.speedy=0;
  
  this.update= function(){
    this.x= this.x + this.speedx;
    this.y= this.y + this.speedy;
  }
  
  this.show = function () {
    fill(255);
    rect(this.x, this.y, ancho, alto); 
  }

  this.dir = function(x,y){
   this.speedx= x;
   this.speedy= y;
  }

  

  
}
