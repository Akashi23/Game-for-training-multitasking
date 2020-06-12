var player;
var walls;

function startGame(){
    player = new component(30, 30, "red", myGameArea.canvas.width/2, myGameArea.canvas.height-30);
    walls = new component(200, 10, "green", 10, 10);
    myGameArea.start(); 
}


var myGameArea = {
    canvas: document.getElementById("myCanvas"),
    start : function(){
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })    
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
    if (player.crashWith(walls)) {
        myGameArea.stop();
    } else {
        myGameArea.clear();
        walls.update();
        player.speedX = 0;
        if (myGameArea.key && myGameArea.key == 37) {player.speedX = -25; }
        if (myGameArea.key && myGameArea.key == 39) {player.speedX = 25; }
        walls.y += 2;
        player.newPos();
        player.update();
    }
}
