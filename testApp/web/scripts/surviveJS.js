//alert("I'm ALive!");

var player = ["nickname","class","traits"];
var playerActionStats = {AttackBonus:3, DefenceBonus:3, ComfortBonus:3, CargoBonus:0, OnlyCriticalHits:false, UnlimitedHealth:false};

var minX = 0;
var maxX = (screen.width/1.65);
var minY = 0;
var maxY = 565;

//Game Interaction AI Variables.
var foodPos = [10,10];
    foodPos[0] = Math.floor((Math.random()) * maxX)+1; 
    foodPos[1] = Math.floor((Math.random()) * maxY)+1; 
var waterPos = [10,540];
    waterPos[0] = Math.floor((Math.random()) * maxX)+1; 
    waterPos[1] = Math.floor((Math.random()) * maxY)+1; 
var fortifyPos = [maxX-25,500];
//enemy types
var Enemy = {Defence:5,Attack:3,RangeAttack:false,X:100,Y:0};
var rangeEnemy = {Defence:20,Attack:3,RangeAttack:true,X:130,Y:10};
var meleeEnemy = {Defence:12,Attack:5,RangeAttack:false,X:150,Y:0};
//enemy opposition
function fromEdge(){
    //need to find some way to set both x and y, not just the second equality which happens to be y here.
    var newX = Math.floor((Math.random()) * maxX)+1; 
    var newY = Math.floor((Math.random()) * maxY)+1;
    console.log(newX+"::"+newY);
    console.log(maxX+":"+maxY);
    return newX,newY;
}
function fromEdgeX(){
    var newX = Math.floor((Math.random()) * maxX)+1;
    return newX;
}
function fromEdgeY(){
    var newY = Math.floor((Math.random()) * maxY)+1;
    return newY;
}
var Enemies = {Opp1: Enemy, Opp2: rangeEnemy, Opp3: meleeEnemy};
Enemies.Opp1.X = fromEdgeX(), Enemies.Opp1.Y = fromEdgeY();
Enemies.Opp2.X = fromEdgeX(), Enemies.Opp2.Y = fromEdgeY();
Enemies.Opp3.X = fromEdgeX(), Enemies.Opp3.Y = fromEdgeY();
    

window.addEventListener('mouseup', function (e) {
            var onX = e.pageX - 23;
            var onY = e.pageY - 55;
            
            if(((onX)>=(Enemies.Opp1.X-40))&&((onX)<=(Enemies.Opp1.X+10+40))&&((onY)>=(Enemies.Opp1.Y-40))&&((onY)<=(Enemies.Opp1.Y+10+40))){
                        console.log("enemy down...");
                        score += 10;
                        console.log("generating new location...");
                        //Enemies.Opp1.X, Enemies.Opp1.Y = fromEdge();
                        //fromEdge(Enemies.Opp1.X, Enemies.Opp1.Y);
                        Enemies.Opp1.X = fromEdgeX(), Enemies.Opp1.Y = fromEdgeY();
                        putPlayer();
                    }
            if(((onX)>=(Enemies.Opp2.X-40))&&((onX)<=(Enemies.Opp2.X+10+40))&&((onY)>=(Enemies.Opp2.Y-40))&&((onY)<=(Enemies.Opp2.Y+10+40))){
                        console.log("enemy down...");
                        score += 100;
                        console.log("generating new location...");
                        //Enemies.Opp2.X, Enemies.Opp2.Y = fromEdge();
                        //fromEdge(Enemies.Opp2.X, Enemies.Opp2.Y);
                        Enemies.Opp2.X = fromEdgeX(), Enemies.Opp2.Y = fromEdgeY();
                        putPlayer();
                    }
             if(((onX)>=(Enemies.Opp3.X-40))&&((onX)<=(Enemies.Opp3.X+10+40))&&((onY)>=(Enemies.Opp3.Y-40))&&((onY)<=(Enemies.Opp3.Y+10+40))){
                        console.log("enemy down...");
                        score += 150;
                        console.log("generating new location...");
                        //Enemies.Opp3.X, Enemies.Opp3.Y = fromEdge();
                        //fromEdge(Enemies.Opp3.X, Enemies.Opp3.Y);
                        Enemies.Opp3.X = fromEdgeX(), Enemies.Opp3.Y = fromEdgeY();
                        putPlayer();
                    }
            //console.log("x,y click at "+onX+" , "+onY);
        });

var x = 0; x=maxX/2;
var y = 0; y=maxY/2;
var hp = 100; var score = 0; var df = 60; var food = 10; var water = 15; var comfort = 10;

moves = 0;

function drawEnemy(ctx,x,y){
                   ctx.lineWidth=1; 
                   ctx.strokeStyle="red";
                    ctx.beginPath();
                    
                    ctx.arc(x,y,18,0,Math.PI*2,true);   
                    
                    ctx.closePath();
                    ctx.stroke();
                    ctx.lineWidth=1; ctx.fillStyle="#red";
                    //ctx.beginPath();
                    
                    ctx.arc(x,y,18,0,Math.PI*2,true);
                    
                    ctx.fill();
                    
                    if(x >= (maxX-95)){ df -= 1;}
                    
}

function putPlayer(){
                    if(moves > 10){
                        document.getElementById("currentChallenges").innerText="Collect 3 Water\n";
                    }
                    if(moves > 20){
                        document.getElementById("currentChallenges").innerText = document.getElementById("currentChallenges").innerText+"Defeat 5 Enamies\n";
                    }
                    if(moves > 30){
                        document.getElementById("currentChallenges").innerText = document.getElementById("currentChallenges").innerText+"Fortify Base To 80.\n";
                    }
    
                    ctx = document.getElementById("survive").getContext("2d");
                    
                    //clears the contents.
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    
                    ctx.lineWidth=3; 
                    ctx.strokeStyle="#CCCCCC";
                    ctx.beginPath();
                    //ctx.arc(75+x,75+y,25,0,Math.PI*2,true);
                    ctx.arc(x,y,25,0,Math.PI*2,true);   
                    
                    ctx.closePath();
                    ctx.stroke();
                    ctx.lineWidth=2; ctx.fillStyle="#CCCCCC";
                    ctx.beginPath();
                    //ctx.arc(60+x,65+y,5,0,Math.PI*2,true);
                    ctx.arc(x-10,y-10,5,0,Math.PI*2,true);
                    ctx.moveTo(95+x,65+y);
                    ctx.arc(10+x,10+y,5,0,Math.PI*2,true);
                    
                    ctx.moveTo(95+x,65+y);
                    ctx.arc(10+x,-10+y,5,0,Math.PI*2,true);
                    ctx.moveTo(95+x,65+y);
                    ctx.arc(-10+x,10+y,5,0,Math.PI*2,true);
                    ctx.closePath();
                    ctx.fill();
                    
                    
                    //put food
                    //Create gradient
                    //var grd = ctx.createRadialGradient(80,0,20,90,60,100);
                    var grd = ctx.createRadialGradient(0,0,1000,maxX,maxY,100);
                    grd.addColorStop(0,"brown");
                    grd.addColorStop(1,"beige");
                    // Fill with gradient
                    ctx.fillStyle = grd;
                    //ctx.fillStyle = "brown";
                    ctx.fillRect(foodPos[0],foodPos[1],20,20);
                    
                    //put water
                    var grd = ctx.createRadialGradient(80,0,20,90,60,100);
                    grd.addColorStop(0,"green");
                    grd.addColorStop(1,"blue");
                    //Fill with gradient
                    ctx.fillStyle = grd;
                    //ctx.fillStyle = "lightblue";
                    ctx.fillRect(waterPos[0],waterPos[1],20,20);
                    
                    //put fortify
                    var grd = ctx.createRadialGradient(80,0,20,90,60,100);
                    grd.addColorStop(0,"brown");
                    grd.addColorStop(1,"black");
                    // Fill with gradient
                    ctx.fillStyle = grd;
                    ctx.fillRect(fortifyPos[0],fortifyPos[1],20,20);
                    
                    //put enemies
                    drawEnemy(ctx,Enemies.Opp1.X,Enemies.Opp1.Y);
                    drawEnemy(ctx,Enemies.Opp2.X,Enemies.Opp2.Y);
                    drawEnemy(ctx,Enemies.Opp3.X,Enemies.Opp3.Y);
                    
                    if(((x)>=(foodPos[0]-40))&&((x)<=(foodPos[0]+10+40))&&((y)>=(foodPos[1]-40))&&((y)<=(foodPos[1]+10+40))){
                        console.log("collecting food...");
                        food += (1+playerActionStats.CargoBonus);
                        console.log("generating new food location...");
                        foodPos[0] = Math.floor((Math.random()) * maxX)+1; 
                        foodPos[1] = Math.floor((Math.random()) * maxY)+1; 
                    }
                    if(((x)>=(waterPos[0]-40))&&((x)<=(waterPos[0]+10+40))&&((y)>=(waterPos[1]-40))&&((y)<=(waterPos[1]+10+40))){
                        console.log("collecting water...");
                        water += (1+playerActionStats.CargoBonus);
                        console.log("generating new food location...");
                        waterPos[0] = Math.floor((Math.random()) * maxX)+1; 
                        waterPos[1] = Math.floor((Math.random()) * maxY)+1; 
                    }
                    if(((x)>=(fortifyPos[0]-40))&&((x)<=(fortifyPos[0]+10+40))&&((y)>=(fortifyPos[1]-40))&&((y)<=(fortifyPos[1]+10+40))){
                        console.log("building...");
                        df += (1+playerActionStats.DefenceBonus);
                        
                        if(fortifyPos[1]<=maxY && fortifyPos[1]>=minY) {
                        fortifyPos[1] -= 10;
                        console.log("move up fortification..");
                        }
                    }
        
                    //update stats
                    document.getElementById("score").innerText = score;
                    document.getElementById("hp").innerText = hp;
                    document.getElementById("food").innerText = food;
                    document.getElementById("water").innerText = water;
                    document.getElementById("df").innerText = df;
                    
                    if(food < 10){
                        document.getElementById("findfood").style.color = "red";
                    }
                    else { document.getElementById("findfood").style.color = "black"; }
                    if(water < 10){
                        document.getElementById("findwater").style.color = "red";
                    }
                    else { document.getElementById("findwater").style.color = "black"; }
                    if(df < 65){
                        document.getElementById("fortifybase").style.color = "red";
                    }
                    else { document.getElementById("fortifybase").style.color = "black"; }
}

function inCanvasX(xpos, offset){
    xpos += 32;
    offset = 10;
    if(xpos >= (minX + (offset*2)) && xpos <= (maxX - (offset/2))){
        console.log(minX+" , "+maxX+" , "+xpos+" , "+offset+" TRUE");
        return true;
    }
    console.log(minX+" , "+maxX+" , "+xpos+" , "+offset+" FALSE");
    return false;
}
function inCanvasY(ypos, offset){
    ypos += 32;
    offset = 10;
    if(ypos >= (minY + (offset*2)) && ypos <= (maxY - (offset/2))){
        console.log(minY+" , "+maxY+" , "+ypos+" , "+offset+" TRUE");
        return true;
    }
    console.log(minY+" , "+maxY+" , "+ypos+" , "+offset+" FALSE");
    return false;
}

function consumeFoodAndDrink(numMoves){
    if((numMoves%10) == 0){
        food -= 1;
        water -= 1;
    }
    if(food <= 0){
        hp -= 3;
    }
    else { hp += 1; }
    if(water <= 0){
        hp -= 5;
    }
    
}

document.addEventListener("keydown", onKeyDown, false);
document.addEventListener("keyup", onKeyUp, false);

function setCookie(/*cookieName, cookieValue, expirationDays*/){
    var cookieName = "resumeSurviveGameplay"; //nickname
    var cookieValue = '"'+"?nickName="+player[0]+"&classid="+player[1]+"&extra="+player[2]+'"';
    var expirationDays = 3;
    
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate()+expirationDays);
    cookieValue = cookieValue + "; expires="+expirationDate.toUTCString();
    document.cookie = cookieName+"="+cookieValue;
}
function setIndividualCookies(cookieName, cookieValue/*, expirationDays*/){
    //var cookieName = "resumeSurviveGameplay"; //nickname
    //var cookieValue = '"'+"?nickName="+player[0]+"&classid="+player[1]+"&extra="+player[2]+'"';
    var expirationDays = 3;
    
    var expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate()+expirationDays);
    cookieValue = cookieValue + "; expires="+expirationDate.toUTCString();
    document.cookie = cookieName+"="+cookieValue;
}

function onKeyDown(event) {
  var keyCode = event.keyCode;
  //console.log(keyCode);
  switch (keyCode) {
    case 68: //d
      keyD = true;
      break;
    case 83: //s
      keyS = true;
      break;
    case 65: //a
      keyA = true;
      break;
    case 87: //w
      keyW = true;
      break;
    case 81: //q
      console.log("quiting game...");
      alert("Warning : You are about to leave the game.");
      setCookie();
      //// var cookieValue = '"'+"?nickName="+player[0]+"&classid="+player[1]+"&extra="+player[2]+'"';
      //setIndividualCookies("nickName", player[0]);
      //setIndividualCookies("classid", player[1]);
      //setIndividualCookies("extra", player[2]);
      document.location = "test.jsp";
      break;
  }
}

function onKeyUp(event) {
  var keyCode = event.keyCode;

  switch (keyCode) {
    case 68: //d
      keyD = false;
      if(inCanvasX(x+15, 5)){ x+=15;}
      else {  x -= 35;}
      ++score;
      ++moves;
      consumeFoodAndDrink(moves);
      putPlayer();
      break;
    case 83: //s
      keyS = false;
      if(inCanvasY(y+15, 35)){ y+=15;}
      else { y -= 35;}
      ++score;
      ++moves;
      consumeFoodAndDrink(moves);
      putPlayer();
      break;
    case 65: //a
      keyA = false;
      if(inCanvasX(x-15, 5)){ x-=15;}
      else { x += 35;}
      ++score;
      ++moves;
      consumeFoodAndDrink(moves);
      putPlayer();
      break;
    case 87: //w
      keyW = false;
      if(inCanvasY(y-15, 35)){ y-=15;}
      else { y += 35;}
      ++score;
      ++moves;
      consumeFoodAndDrink(moves);
      putPlayer();
      break;
  }
}

function setCanvasWidth(){
    //document.getElementById("survive").width=1000;
    //document.getElementById("survive").style = "width:65%;height:565px;";
    //console.log(screen.width);
    console.log(document.getElementById("survive").width);
    document.getElementById("survive").width = screen.width/1.65;
    console.log(document.getElementById("survive").width);
    console.log('width:'+screen.width/1.25+'px');
    var panelwidth = 'width:'+screen.width*0.36+'px';
    document.getElementById("homePanel").style = panelwidth; //'width:200px;';
    putPlayer();
    
//apply bonuses on load.
/*********************************************
*                                    Ceo         Doctor      Boxer    Priest      Dreamer     Handicapped     Unknown  
* AttackBonus       : default(3)     +2             -2         +5       =0          =0              -10         99       
* DefenceBonus      : default(3)     -1             -2         +5       +10         =0              -10         99
* ComfortBonus      : default(3)     +3             +5         -10      +10         =0              -10         99
* CargoBonus        : default(0)     +1             +2         +3       +6          =0              -10         99
* OnlyCriticalHits  : false                         
* UnlimitedHealth   : false                                        
* 
* Backpack trait , cargo bonus +5
* EasyMode ,        onlyCritical hits to true
* Invincible ,      unlimited health set to true.
*/////////////////////////////////////////////
    if(player[2].contains("Backpack")){
        playerActionStats["CargoBonus"] += 5;
    }
    if(player[2].contains("EasyMode")){
        playerActionStats["OnlyCriticalHits"] = true;
    }
    if(player[2].contains("Invincibility")){
        playerActionStats["UnlimitedHealth"] = true;
    }
     if(player[2].contains("All")){
        playerActionStats["CargoBonus"] += 5;
        playerActionStats["OnlyCriticalHits"] = true;
        playerActionStats["UnlimitedHealth"] = true;
    }

    if(player[1] == ("Ceo")){
        setPlayerBonus(2,-1,3,1);
    } else if(player[1] == ("Doctor")){
        setPlayerBonus(-2,-2,5,2);
    } else if(player[1] == ("Boxer")){
        setPlayerBonus(5,5,10,3);
    } else if(player[1] == ("Priest")){
        setPlayerBonus(0,10,10,6);
    } else if(player[1] == ("Dreamer")){
       setPlayerBonus(0,0,0,0); 
    } else if(player[1] == ("Handicapped")){
        setPlayerBonus(-10,-10,-10,-0);
    } else if(player[1] == ("Unknown")){
        setPlayerBonus(99,99,99,9);
    } else {
        //no such class exists
        //do nothing.
    }
    console.log("player: "+player);
    console.log("player bonus: "+playerActionStats.AttackBonus+","+playerActionStats.DefenceBonus+","+playerActionStats.ComfortBonus+","+playerActionStats.CargoBonus+".");
    
}

function setPlayerBonus(num1,num2,num3,num4){
     playerActionStats.AttackBonus += (num1);
     playerActionStats.DefenceBonus += (num2);
     playerActionStats.ComfortBonus += (num3);
     playerActionStats.CargoBonus += (num4);
}

function getCanvasWidth(percentage){
    //document.getElementById("surviveContainer").
}

/*
 * 
  public void initGameScreen(PrintWriter pr){
        //pr.println("Hohhhh");
        pr.println("<canvas id=\"survive\"></canvas>");
        pr.println("<script>" +
                    "var canvas = document.getElementById(\"survive\");\n" +
                    "var ctx = canvas.getContext(\"2d\");\n" +
                    " ctx.lineWidth=3; ctx.strokeStyle=\"#CCCCCC\";" +
                    " ctx.beginPath();\n" +
                    "    ctx.arc(75,75,25,0,Math.PI*2,true); // Outer circle\n" +              
                    "    ctx.moveTo(110,75);\n" +                    
                    "    ctx.moveTo(65,65);\n" +
                    "    ctx.closePath();" +
                    "    ctx.stroke();" +
                    "    ctx.lineWidth=2; ctx.fillStyle=\"#CCCCCC\";" +
                    "    ctx.beginPath();"+
                    "    ctx.arc(60,65,5,0,Math.PI*2,true);  // Left eye\n" +
                    "    ctx.moveTo(95,65);\n" +
                    "    ctx.arc(90,65,5,0,Math.PI*2,true);  // Right eye\n" +
                    "    ctx.closePath();" +
                    "    ctx.fill();" 
                    + "</script>");
    }
 * 
 */