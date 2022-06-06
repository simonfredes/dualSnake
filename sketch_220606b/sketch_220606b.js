var s;
var f;
const ancho= 10;
const alto= 10; 

function setup() {
  createCanvas(500, 500);
  s= new Snake();  
  f = new food();
  f.generate();
  c = new collision();
}


function draw() {
  background(50);
  s.update();
  s.show();
  f.show();
  c.detect();
}

function collision(){
  this.detect = function(){
    console.log("Entre");
    if (s.getX() < f.getX() + this.ancho &&
      s.getX() + this.ancho > f.getX() &&
      s.getY() < f.getY() + this.alto &&
      this.alto + s.getY() > f.getY()) {
        console.log("Detecte");
        f.generate();
     }
  }
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
  
  this.getX = function(){
    return this.fX;
  }  
  
  this.getY = function(){
    return this.fY;
  }
  
  this.show = function () {
    fill(250,0,0);
    rect(this.fX, this.fY , alto, ancho);
  }
}

function Snake() {
  this.x=0;
  this.y=0;
  this.speedx=1;  
  this.speedy=0;
  this.longitud=500;
  this.trail = [];
  this.i = 0;
  
  this.getX = function(){
    return this.x;
  }  
  this.getY = function(){
    return this.y;
  }
  
  this.update= function(){
    this.x= this.x + this.speedx;
    this.y= this.y + this.speedy;
    this.i = this.i++;
    this.trail[this.trail.length] = this.x;
    this.trail[this.trail.length+1] = this.y;
  }
  
  this.show = function () {
    fill(255);
    rect(this.x, this.y, ancho, alto); 
    for(let c = this.longitud ; c>0; c--){
      let coorX = this.trail[this.trail.length-c*2];
      let coorY = this.trail[this.trail.length-c*2-1];
      fill(255);
      rect(coorX,coorY,ancho,alto);
    }
  }
  
  this.dir = function(x,y){
   this.speedx= x;
   this.speedy= y;
  }

}
