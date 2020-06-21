var paused = false;

function startUI(){
    var canvas = document.getElementById("game1");
    var ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth/2.07;
    canvas.height = window.innerHeight/1.3;
    ctx.font = "30px Times New Roman";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Push Space for Start Game and R reload!", canvas.width/2, canvas.height/2);

    var canvas = document.getElementById("game2");
    var ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth/2.07;
    canvas.height = window.innerHeight/1.3;
    ctx.font = "30px Times New Roman";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Push Space for Start Game and R reload!", canvas.width/2, canvas.height/2);
}

function togglePause()
{
    if (paused)
    {
        paused = true;
    } else if (!paused)
    {
       paused= false;
    }

}

function appendCard() {
    var txt1 = "<div class='container center card'><form action='/ScoreBoard'>\
    <label for='fname'>Nickname:</label>\
    <input type='text' id='lname' name='lname'><br><br>\
    <input type='submit' value='Submit'>\
  </form></div>";               
    $("body").append(txt1);    
  }
  