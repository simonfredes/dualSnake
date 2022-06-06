
/* To Do
Si entro por arriba, salgo por abajo (espejo)
Si entro por abajo, salgo por arriba
Si entro por izquierda, salgo por derecha(espejo)
Si entro por derecha, salgo por izquierda
Que la comida no se genere en la Serpiente*/

var s;
var f;

const ancho= 10;
const alto= 10; 

var posX = 25;
var posY = 25;
var posX2 = 30;
var posY2 = 25;

function setup() {
  createCanvas(500, 500);
  s= new Snake();  
  f = new food();
  f.generate();
  c = new collision();
  frameRate(9999);
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
    if (s.getX() < f.getX() + ancho &&
      s.getX() + ancho > f.getX() &&
      s.getY() < f.getY() + alto &&
      alto + s.getY() > f.getY()) {
        f.generate();
        s.crecer();
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
    this.fX= random(width-ancho)
    this.fY= random(height-alto);
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
  this.longitud=50;
  this.trail = [];
  this.i = 0;
  this.longitudPorCrecer=0;
  
  this.getX = function(){
    return this.x;
  }  
  this.getY = function(){
    return this.y;
  }
  
  this.update= function(){
    if (this.x + this.speedx > 500) {
      this.x = 0;
    } else {
      this.x= this.x + this.speedx;
    }
    if (this.y + this.speedy > 500) {
      this.y = 0;
    } else {
      this.y= this.y + this.speedy;
    }
    if (this.x + this.speedx < 0) {
      this.x = 500;
    } else {
      this.x= this.x + this.speedx;
    }    
    if (this.y + this.speedy < 0) {
      this.y = 500;
    } else {
      this.y= this.y + this.speedy;
    }

    this.i = this.i++;
    this.trail[this.trail.length] = this.x;
    this.trail[this.trail.length+1] = this.y;
    
    if (this.longitudPorCrecer>0){
      this.longitud = this.longitud +1.5;
      this.longitudPorCrecer--;
    }
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
  
  
  this.crecer = function(){
    this.longitudPorCrecer += 60;
  }
  
  this.dir = function(x,y){
   this.speedx= x;
   this.speedy= y;
  }

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
