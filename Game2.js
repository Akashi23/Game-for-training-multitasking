var player;
var playerSize = 30;
var walls = [];
var speed = 4;
var myScore;

function startGame2(){
    player = new component(playerSize, playerSize, "red", myGameArea.canvas.width/2, myGameArea.canvas.height-30);
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start(); 
}


var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 320;
        this.canvas.style.cursor = "none";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;          
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('mousemove', function (e) {
                    myGameArea.x = e.pageX;
                    myGameArea.y = e.pageY;
        })
    },
    clear: function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type){
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.update = function(){
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
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
        x = width * Math.round(Math.round(Math.random()*10)/3);
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
    if (myGameArea.x && myGameArea.y) {
        player.x = myGameArea.x;
        player.y = myGameArea.y;
    }
    myScore.text = "SCORE: " + myGameArea.frameNo;
    myScore.update();
    player.newPos();
    player.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
  }
