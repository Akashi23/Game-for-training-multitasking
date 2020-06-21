var player2;
var playerSize2 = 30;
var walls2 = [];
var speed2 = 4;
var myScore2;

function startGame2(){
    player2 = new component(playerSize2, playerSize2, "red", myGameArea.canvas.width/2, myGameArea.canvas.height-30);
    myScore2 = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start(); 
}


var myGameArea = {
    canvas : document.getElementById("game2"),
    start : function() {
        this.canvas.width = window.innerWidth/2.07;
        this.canvas.height = window.innerHeight;
        this.canvas.style.cursor = "none";
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;          
        this.interval = interval
        window.addEventListener('mousemove', function (e) {
                    myGameArea.x = e.pageX;
                    myGameArea.y = e.pageY;
        })
    },
    clear: function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(interval);
        return true;
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
    for (i = 0; i < walls2.length; i += 1) {
        if (player2.crashWith(walls2[i])) {
            myGameArea.stop();
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(30)) {
        x = myGameArea.canvas.width;
        y = 0;
        width = myGameArea.canvas.width/4;
        x = width * Math.round(Math.round(Math.random()*10)/4);
        walls2.push(new component(width, 10, "green", x, y));
    }
    for (i = 0; i < walls2.length; i += 1) {
        walls2[i].y += speed2;
        walls2[i].update();
        if(speed2 < 10){
            speed2 += 0.0001;
        }
    }

    player2.speedX = 0;
    if (myGameArea.x && myGameArea.y) {
        if (myGameArea.x < myGameArea.canvas.width && myGameArea.y < myGameArea.canvas.height) {
            player2.x = myGameArea.x;
            player2.y = myGameArea.y;
        }
        else{
            
        }
    }
    myScore2.text = "SCORE: " + (myGameArea.frameNo * 50)/1000;
    myScore2.update();
    player2.newPos();
    player2.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
  }
