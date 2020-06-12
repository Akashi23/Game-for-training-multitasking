var player;
var walls = [];
var speed = 4;

function startGame(){
    player = new component(30, 30, "red", myGameArea.canvas.width/2, myGameArea.canvas.height-30);
    myGameArea.start(); 
}


var myGameArea = {
    canvas: document.getElementById("myCanvas"),
    start : function(){
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;          
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
        this.interval = setInterval(updateGameArea, 20);

             
    },
    clear: function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
        (mytop > otherbottom) ||
        (myright < otherleft) ||
        (myleft > otherright)) {
          crash = false;
        }
        return crash;
    }
}

function updateGameArea(){
    var x, y;
  for (i = 0; i < walls.length; i += 1) {
    if (player.crashWith(walls[i])) {
      myGameArea.stop();
      return;
    }
  }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(30)) {
        x = myGameArea.canvas.width;
        y = 0;
        width = myGameArea.canvas.width/3;
        x = width * Math.floor(Math.floor(Math.random()*10)/3);
        walls.push(new component(width, 10, "green", x, y));
    }
    for (i = 0; i < walls.length; i += 1) {
        walls[i].y += speed;
        walls[i].update();
        if(speed < 10){
            speed += 0.0001;
        }
    }

    player.speedX = 0;
    if (myGameArea.key && myGameArea.key == 37) {player.speedX = -12; }
    if (myGameArea.key && myGameArea.key == 39) {player.speedX = 12; }
    player.newPos();
    player.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
  }
