/*/
Game Project
Rhythm Swipe

Legends:
- !!!: Variable restart in Finish or Failed function
/*/

//------------MainMenu--------------
let BackgroundImage; //Main menu background
var NPCS; 
let rectWidthMainMenu = 30;
let rectHeightMainMenu = 500;
let xMainMenu = rectWidthMainMenu; //!!!
let yMainMenu = 575;
let MainMenuTheme;
let MainMenuThemeSwitch = false;
//----------------------------------

//---------------Creating the Board-------------------
var boardSize = 600; //How big the board is
let tileSize = boardSize/10; //The grid
//----------------------------------------------------



//-----------------The Character----------------------
let moveWidth = 0; //!!!
let moveHeight = 0; //!!!
let player; //The player !!!
let playerAnimation = []; //List of images to use for the character
var playerCounter = 0; //!!!
let backgroundColor = 210; //The background color of the board. !!!
//----------------------------------------------------



//------------------Enemies (Work in progress)-------------------------------
let enemy = []; //!!!
let enemy2 = []; //!!!
let guard = []; //Images of the guard
let flipBooleanX = false; //!!!
let enemyMoveMaxX = 240; //Can move up to 240 in the X position
var enemyMovingX = 0; //Incrment 60 for moving; !!!
let enemyMoveMaxLockX = false; //Lock the increment and decrement back to its original position !!!
//Use these variables to check collision with a player

let flipBooleanY = false; //!!!
let enemyMoveMaxY = 240; //Can move up to 240 in the Y
var enemyMovingY = 0; //Incrment 60 for moving; !!!
let enemyMoveMaxLockY = false; //Lock the increment and decrement back to its original position !!!
//---------------------------------------------------------------------------



//-------------------------------The bar that detects the beat in game. (Work in progress)-------------------
let pressByBeat = 500;
var cubeDetector; //The box that detects the red cube
//The red cube
var cubeBeat;
let rectWidth = 30;
let rectHeight = 500;
//position of red cube
let x2start = tileSize*3.25;
let x2 = x2start; //!!!
let y2 = 575;
//-----------------------------------------------------------------------------------------------------------



//--------------------Timer for Master Mode---------------------------
//Timer used to see how long the player takes to complete a level.
//Will be used in the Master Mode!!!!!
let timer = 0; //!!!
let worldRecord = null;
let masterModeTimer = false; //!!!
//--------------------------------------------------------------------



//------------------------Items in game-------------------------------
let coins = []; //!!!
let diamonds = []; //Our 'coins' images
let blocks = []; //!!!

let points = 0; //!!!
let i = 0; //!!!
let level = -1; //Can change any level for testing purposes
//--------------------------------------------------------------------


//------------------Green block (Finish line)-------------------------
let finishLine = []; //!!!
let endBlock; //!!!
//--------------------------------------------------------------------




//-----------------------Music for all 4 levels!----------------------
var easySound;
var normalSound;
var hardSound;
var masterSound;

var amplitude;
let volHistory = []; //!!! in main menu
//--------------------------------------------------------------------


//--------Resize window---------
let redrawLock = false; //Create the buttons once in the setup
//--------------------------------------------------------------------


//-----------------------------Buttons---------------------------
let StartGameButton;

let button;
let button2;
let button3;
let button4;

let buttonStart;
let button2Start;
let button3Start;
let button4Start;

let buttonBack;
let buttonW;
//--------------------------------------------------------------------
var messageError = document.getElementById("Error");
let resizeLock = false;

//--------------------------------------------------------------PRELOAD----------------------------------------------------------------------------
function preload() {
    //*/Sounds//
    easySound = loadSound('../sounds/A_Punchup_at_a_Wedding_8-bit.mp3');
    //*/
    //*/Sounds//
    normalSound = loadSound('../sounds/There_There_8-bit.mp3');
    //*/
    //*/Sounds//
    hardSound = loadSound('../sounds/Where_I_End_You_Begin_8-bit.mp3');
    //*/
    //*/Sounds//
    masterSound = loadSound('../sounds/Super_Mario_Galaxy.mp3');
    //*/

    //*/Sounds//
    MainMenuTheme = loadSound('../sounds/Main8-bit.mp3');
    //*/



    //Thief Images
    for (let i = 0; i < 12; i++){
        if (i === 0){
            playerAnimation[i] = loadImage("asset/thief/Thief"+i+".gif");
        }else if (i === 3){
            playerAnimation[i] = loadImage("asset/thief/Thief"+i+".gif");
        }else if (i === 6){
            playerAnimation[i] = loadImage("asset/thief/Thief"+i+".gif");
        }else if (i === 9){
            playerAnimation[i] = loadImage("asset/thief/Thief"+i+".gif");
        }else{
            playerAnimation[i] = loadImage("asset/thief/Thief"+i+".png");
        }
        console.log("Sprite Thief loaded");
    }

    //Guard Images
    for (let i = 0; i < 16; i++){
        if (i >= 12){
            guard[i] = loadImage("asset/guard/Guard"+i+".gif");
        }else{
            guard[i] = loadImage("asset/guard/Guard"+i+".png");
        }
        console.log("Sprite Guard loaded");
    }

    //Diamond Images
    for (let i = 0; i < 4; i++){
        diamonds[i] = loadImage("asset/gems/gem"+i+".png");
        console.log("Items loaded");
    }

    //Main Menu
    BackgroundImage = loadImage('asset/MainMenu.gif');
}





//--------------------------------------------------------------------SETUP---------------------------------------------------------------------------------
//Creation of the Canvas, the buttons, and the sounds
function setup() {
    //Center the game on the page

    let div = createCanvas(boardSize, boardSize);
    div.position(100, 101);
    div.center('horizontal');


    //Check to see if it supports the game
    if ((windowWidth <= 620)){
        level = -2;
        messageError.style.display = "block";
        resizeLock = true;
        div.hide();
    }else if ((windowWidth > 620) && resizeLock === true){
        level = -1;
        messageError.style.display = "none";
        resizeLock = false;
        div.show();
    }

    //StartGame
    background("darkgray");
    if (redrawLock == false){
        StartGameButton = createButton('Start');
        StartGameButton.style('color', 'blueviolet');
        StartGameButton.style('font-size', 'large');
        StartGameButton.size(200, 75);
        //StartGameButton.position(250, windowHeight/2);
        StartGameButton.mousePressed(mainMenu); //Goes to Main Menu


        //-------------Back button-----------
        buttonBack = createButton('Back');
        buttonBack.style('color', 'white');
        buttonBack.style('font-size', 'large');
        buttonBack.size(200, 75);
        //buttonBack.position(250, windowHeight/1.3);
        buttonBack.mousePressed(mainMenu); //Goes to Main Menu
        //-----------------------------------

        //-----------Easy Button-------------
        button = createButton('Easy');
        button.style('color', 'green');
        button.style('font-size', 'large');
        button.size(200, 75);
        //button.position(250, windowHeight/3);
        button.mousePressed(easyIntermission); //Goes to Intermission

        buttonStart = createButton('Start');
        buttonStart.style('color', 'green');
        buttonStart.style('font-size', 'large');
        buttonStart.size(200, 75);
        //buttonStart.position(250, windowHeight/1.53);
        buttonStart.mousePressed(easyLevel); //Play Easy Mode
        //-----------------------------------

        //-----------Normal Button-----------
        button2 = createButton('Normal');
        button2.style('color', 'orange');
        button2.style('font-size', 'large');
        button2.size(200, 75);
        //button2.position(250, windowHeight/2.2);
        button2.mousePressed(normalIntermission); //Goes to Intermission

        button2Start = createButton('Start');
        button2Start.style('color', 'orange');
        button2Start.style('font-size', 'large');
        button2Start.size(200, 75);
        //button2Start.position(250, windowHeight/1.53);
        button2Start.mousePressed(normalLevel); //Play Normal Mode
        //-----------------------------------

        //------------Hard button------------
        button3 = createButton('Hard');
        button3.style('color', 'red');
        button3.style('font-size', 'large');
        button3.size(200, 75);
        //button3.position(250, windowHeight/1.74);
        button3.mousePressed(hardIntermission); //Goes to Intermission

        button3Start = createButton('Start');
        button3Start.style('color', 'red');
        button3Start.style('font-size', 'large');
        button3Start.size(200, 75);
        //button3Start.position(250, windowHeight/1.53);
        button3Start.mousePressed(hardLevel); //Play Hard Mode
        //------------------------------------

        //-----------Master button (Used to see the world record)----------
        button4 = createButton('Master');
        button4.style('color', 'blueviolet');
        button4.style('font-size', 'large');
        button4.size(200, 75);
        //button4.position(250, windowHeight/1.43);
        button4.mousePressed(masterIntermission); //Goes to Intermission

        button4Start = createButton('Start');
        button4Start.style('color', 'blueviolet');
        button4Start.style('font-size', 'large');
        button4Start.size(200, 75);
        //button4Start.position(250, windowHeight/1.53);
        button4Start.mousePressed(masterLevel); //Play Master Mode
        //-----------------------------------------------------------------


        //---------Return button (For Finish and Fail level)---------------
        buttonW = createButton('Return');
        buttonW.style('color', 'white');
        buttonW.style('font-size', 'large');
        buttonW.size(200, 75);
        //buttonW.position(250, windowHeight/1.3);
        buttonW.mousePressed(mainMenu); //Main menu
        buttonW.hide();
        //-----------------------------------------------------------------


        //----------------------Music Related------------------------------
        amplitude = new p5.Amplitude();

        cubeDetector = new Cube();
        cubeBeat = new Cube();
        //-----------------------------------------------------------------
        redrawLock = true;
    }

}
//----------------------------------------------------------------------------------------------------------------------------------------------------------








//--------------------------------------------------------------------DRAW----------------------------------------------------------------------------------
function draw(){

    StartGameButton.position(250, 356.5);
    StartGameButton.center('horizontal');

    button.position(250, 237.66);
    button.center('horizontal');

    button2.position(250, 324);
    button2.center('horizontal');

    button3.position(250, 409.7);
    button3.center('horizontal');

    button4.position(250, 498.6);
    button4.center('horizontal');

    buttonStart.position(250, 469);
    buttonStart.center('horizontal');

    button2Start.position(250, 469);
    button2Start.center('horizontal');
 
    button3Start.position(250, 469);
    button3Start.center('horizontal');

    button4Start.position(250, 469);
    button4Start.center('horizontal');



    buttonBack.position(250, 552);
    buttonBack.center('horizontal');
    buttonW.position(250, 552);
    buttonW.center('horizontal');
    

    //Switch through rooms based on the 'level' variable. Functionality for buttons mainly
    switch(level){
        case -2:
            //Hide all buttons
            buttonHide();
            buttonBack.hide();
            buttonW.hide();
            buttonStart.hide();
            button2Start.hide();
            button3Start.hide();
            button4Start.hide();
            StartGameButton.hide();

            //Stop all music
            //*/Sounds//
            easySound.stop();
            //*/
            //*/Sounds//
            normalSound.stop();
            //*/
            //*/Sounds//
            hardSound.stop()
            //*/
            //*/Sounds//
            masterSound.stop();
            //*/
            //*/Sounds//
            MainMenuTheme.stop();
            MainMenuThemeSwitch = false;
            //*/
            //Reset everything
            failed();
            break;
        case -1:
            //Start Game
            buttonHide();
            buttonBack.hide();
            StartGameButton.show();

            break;
        //---------------Main Menu------------------
        case 0:
            buttonBack.hide();
            StartGameButton.hide();
            buttonW.hide();
            buttonStart.hide();
            button2Start.hide();
            button3Start.hide();
            button4Start.hide();
            //*/Sounds//
            easySound.stop();
            normalSound.stop();
            hardSound.stop();
            masterSound.stop();
            //*/
            //*/Sounds//
            if (MainMenuThemeSwitch === false && !MainMenuTheme.isPlaying()){
                MainMenuTheme.play();
                MainMenuTheme.loop();
                MainMenuThemeSwitch = true;
            }
            //*/
            background('black');
            image(BackgroundImage, 0, 0, boardSize, boardSize);
            showNPC(); //A nice seeing of a cop running to the robber
            fill('gold');
            textSize(50);
            text("Rhythm Swipe", 140, 100);
            textSize(15);

            //*/VERSION/
            fill("white");
            text("v1.2.1", 5, 15);

            buttonShow();
            break;
        //------------------------------------------



        //--------------Easy Mode-------------------
        case 0.5: //Level 1 Overview
            //*/Sounds//
            MainMenuTheme.stop();
            //*/
            MainMenuThemeSwitch = false;
            background('gray');
            buttonHide();
            //Show the Start and Back button
            buttonBack.show();
            buttonStart.show();
            fill('white');
            textSize(25);
            text("Difficulty: Easy", 25, 100);
            textSize(20);
            text("Music: A Punch Up at a Wedding 8-bit", 25, 150);
            text("By RGYDK", 25, 200);
            visualAudio(); //Show the audio visually
            break;
        case 1: //Easy Mode Game
            buttonHide();
            if (!player){
                player = new Player(1,6);
                //*/Sounds//
                easySound.play();
                //*/
            }
            background(backgroundColor);
            level1();
            board();
            level1Beat();
            finished();
            break;
        //-----------------------------------------



        //-------------Normal Mode-----------------
        case 1.5: //Level 2 overview
            //*/Sounds//
            MainMenuTheme.stop();
            //*/
            MainMenuThemeSwitch = false;
            background('gray');
            buttonHide();
            buttonBack.show();
            button2Start.show();
            fill('white');
            textSize(25);
            text("Difficulty: Normal", 25, 100);
            textSize(20);
            text("Music: There There 8-bit", 25, 150);
            text("By RGYDK", 25, 200);
            visualAudio();
            break;
        case 2: //Normal Mode Game
            buttonHide();
            if (!player){
                player = new Player(2,2);
                playerCounter = 1;
                player.turn(90);
                //*/Sounds//
                normalSound.play();
                //*/
            }
            background(backgroundColor);
            level2();
            board();
            level2Beat();
            finished();
            break;
        //-----------------------------------------





        //---------------Hard Mode-----------------
        case 2.5: //Hard intermission
            //*/Sounds//
            MainMenuTheme.stop();
            //*/
            MainMenuThemeSwitch = false;
            background('gray');
            buttonHide();
            buttonBack.show();
            button3Start.show();
            fill('white');
            textSize(25);
            text("Difficulty: Hard", 25, 100);
            textSize(20);
            text("Music: Where I End and You Begin 8-bit", 25, 150);
            text("By RGYDK", 25, 200);
            visualAudio();
            break;
        case 3: //Hard Mode
            buttonHide();
            if (!player){
                player = new Player(6, 9);
                playerCounter = 3;
                player.turn(-90);
                //*/Sounds//
                hardSound.play();
                //*/
            }
            background(backgroundColor);
            level3();
            board();
            level3Beat()
            finished();
            break;
         //----------------------------------------

        //Either win or lose
        case 4: //Mission accomplished with Stats (Competition used Testing)
            background('green');
            fill('gold');
            textSize(50);
            text("Mission Success", boardSize/5, 100);
            //Master code
            if (masterModeTimer === true){
                if (worldRecord > timer || worldRecord === null){
                    text("Finish Time: "+timer+"s", boardSize/5, 200);
                    text("New World Record!", boardSize/6.5, 300);
                }else{
                    text("Finish Time: "+timer+"s", boardSize/5, 200);
                    textSize(25);
                    text("Creative Coding Exhibition World Record: "+worldRecord+"s", boardSize/12, 300);
                }
            }
            //----
            buttonW.show();
            buttonHide();
            break;
        case 5: //Mission Failed
            background('red');
            fill('black');
            textSize(50);
            text("Mission Failed", boardSize/4.3, 100);
            buttonW.show();
            buttonHide();
            failed();
            break;
        //------------------



        //--------------Master Mode-------------------
        case 5.5: //Master Mode Intermssion
            //*/Sounds//
            MainMenuTheme.stop();
            //*/
            MainMenuThemeSwitch = false;
            background('gray');
            buttonHide();
            buttonBack.show();
            button4Start.show();
            fill('white');
            textSize(25);
            text("Difficulty: Master", 25, 100);
            textSize(20);
            text("Music: Super Mario Galaxy: Staff Roll 8 Bit Remix", 25, 150);
            text("By Vahkiti", 25, 200);
            if (worldRecord === null){
                text("Creative Coding Current Record Time: None", 20, 570);
            }else{
                text("Creative Coding Current Record Time: "+worldRecord+"s", 20, 570);
            }
            visualAudio();
            break;
        case 6: //Master Mode Game
            buttonHide();
            if (!player){
                player = new Player(1, 6);
                //*/Sounds//
                masterSound.play();
                //*/
            }
            background(backgroundColor);
            level4();
            board();
            level4Beat();
            finished(); //Might change
            break;
        //-------------------------------------------
    }
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------

//Refresh everything
function windowResized() {
    setup();
}







//--------------------------------------------------------------------Display the Music Beat Bar------------------------------------------------------------
function showNPC(){
    NPCS = new Cube();
    NPCS.displayMainMenu();
}
//Beat based on the theme of the song
function level1Beat(){
    cubeBeat.displayLevel1();
}
//Level2
function level2Beat(){
    cubeBeat.displayLevel2();
}
//Level3
function level3Beat(){
    cubeBeat.displayLevel3();
}
//Levelmaster
function level4Beat(){
    cubeBeat.displayLevel4();
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------



//-------------------------------------------------------------------------FINISH OR FAILED LEVEL-------------------------------------------------------------------------------
//Finish the level or not, clear everything!
function finished(){
    if (round(moveWidth) === finishLine[0] && round(moveHeight) === finishLine[1] && coins.length === points){ //If it collides with the endBlock
        //console.log("Winner!");
        level = 4;


        //Clear everything when level complete
        player = null; //
        x2 = x2start; //
        i = 0; //
        finishLine = []; //
        coins = []; //
        blocks = []; //
        endblock = null; //
        moveWidth = 0; //
        moveHeight = 0; //
        enemy = []; //
        enemy2 = []; //
        points = 0; //
        backgroundColor = 210; //
        //*/Sounds//
        easySound.stop();
        //*/
        //*/Sounds//
        normalSound.stop();
        //*/
        //*/Sounds//
        hardSound.stop()
        //*/
        //*/Sounds//
        masterSound.stop();
        //*/
        playerCounter = 0; //
        enemyMovingX = 0; //Incrment 60 for moving;
        enemyMoveMaxLockX = false; //Lock the increment and decrement back to its original position
        flipBooleanX = false; //

        enemyMovingY = 0; //Incrment 60 for moving;
        enemyMoveMaxLockY = false; //Lock the increment and decrement back to its original position
        flipBooleanY = false; //

    }
}
function failed(){
    //console.log("Winner!");
    //Clear everything when level complete
    player = null; //
    x2 = x2start; //
    i = 0; //
    finishLine = []; //
    coins = []; //
    blocks = []; //
    endblock = null; //
    moveWidth = 0; //
    moveHeight = 0; //
    enemy = []; //
    enemy2 = []; //
    points = 0; //
    backgroundColor = 210; //
    //*/Sounds//
    easySound.stop();
    //*/
    //*/Sounds//
    normalSound.stop();
    //*/
    //*/Sounds//
    hardSound.stop()
    //*/
    //*/Sounds//
    masterSound.stop();
    //*/
    playerCounter = 0; //
    enemyMovingX = 0; //Incrment 60 for moving;
    enemyMoveMaxLockX = false; //Lock the increment and decrement back to its original position


    enemyMovingY = 0; //Incrment 60 for moving;
    enemyMoveMaxLockY = false; //Lock the increment and decrement back to its original position

    flipBooleanX = false; //
    flipBooleanY = false; //

    //Do not record the time if failed
    masterModeTimer = false;
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------



//--------------------------------------------------------------------LEVEL Intermission => Actual Level-------------------------------------------------------------------------------
//Transition to different levels. Used in a button

//-------------EASY-----------------
function easyLevel() {
    level = 1;
    //*/Sounds//
    easySound.stop();
    //*/
}
function easyIntermission(){
    level = 0.5;
    buttonStart.show();
    //*/Sounds//
    easySound.play();
    easySound.loop();
    //*/
}
//----------------------------------

//-------------NORMAL---------------
function normalLevel() {
    level = 2;
    //*/Sounds//
    normalSound.stop();
    //*/
}
function normalIntermission(){
    level = 1.5;
    button2Start.show();
    //*/Sounds//
    normalSound.play();
    normalSound.loop();
    //*/
}
//----------------------------------

//---------------HARD---------------
function hardLevel() {
    level = 3;
    //*/Sounds//
    hardSound.stop();
    //*/
}
function hardIntermission(){
    level = 2.5;
    button3Start.show();
    //*/Sounds//
    hardSound.play();
    hardSound.loop();
    //*/
}
//----------------------------------



//-------------MASTER---------------
function masterLevel() {
    level = 6;
    //*/Sounds//
    masterSound.stop();
    //*/
}
function masterIntermission(){
    level = 5.5;
    button4Start.show();
    //*/Sounds//
    masterSound.play();
    masterSound.loop();
    //*/
}
//----------------------------------


//Show the audio throughout all Difficulty Levels
function visualAudio(){
    let vol = amplitude.getLevel();
  
    volHistory.push(vol);
  
    if(volHistory.length > width*1) volHistory.splice(0,1); //width map
  
    stroke(255);
    noFill();
    beginShape();
    for(let i=0; i<volHistory.length; i++) {
        let y = map(volHistory[i], 0, 1, height/2, 0); //position map
  	    vertex(i, y);
    }
    endShape();
  
    stroke(255,0,0);
    line(volHistory.length, 0, volHistory.length, height);
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



//----------------------------------------------------------------BUTTON HIDE AND SHOW--------------------------------------------------------------
function mainMenu(){
    volHistory = [] //Reset the visual for music
    level = 0;
    buttonW.hide();
    buttonBack.hide();
    //Temporary for now
    if (masterModeTimer === true){
        if (worldRecord > timer || worldRecord === null){
            worldRecord = timer;
        }
    }
    masterModeTimer = false;
    timer = 0;
    //-----------------
}

//----------Hide the Buttons-----------
function buttonHide(){
    buttonBack.hide();

    //Easy
    button.hide();
    buttonStart.hide();
    
    //Normal
    button2.hide();
    button2Start.hide();

    //Hard
    button3.hide();
    button3Start.hide();

    //Master
    button4.hide();
    button4Start.hide();
}

//Win or Lose button RETURN
function buttonHideW(){
    buttonW.hide();
}
//------------------------------------

//Showing the buttons on screen
function buttonShow(){
    button.show();
    button2.show();
    button3.show();
    button4.show();
}
//-------------------------------------------------------------------------------------------------------------------------------------





//---------------------------------------------------------LEVEL DESIGN-------------------------------------------------------------------

//Shows all the levels on screen when button is clicked!
function level1(){ //Done
    finishLine[0] = 540;
    finishLine[1] = 300;
    
    //randomCoinX = random([30, 90, 150, 210, 270, 330, 390, 450, 510, 570]);
    //randomCoinY = random([30, 90, 150, 210, 270, 330, 390, 450, 510, 570]);
    

    //coins display
    //I am not sure why the loop needs to be here
    //since it will not work if there is no loop here.

    //Best guess: It requires to update in a scope scene since
    //The player needs to collect the coins and the coins will position
    //else where.
    while(i != 1){
        coins[0] = new Coins(150, 210, random(0,3));
        coins[1] = new Coins(150, 330, random(0,3));
        coins[2] = new Coins(570, 270, random(0,3));
        i++;
    }

    //The blocks does not need a loop since it is in a static position
    //Points boarder (Coins)
    blocks[0] = new Block(30, 30);
    blocks[1] = new Block(90, 30);
    blocks[2] = new Block(150, 30);

    //Borders
    blocks[3] = new Block(570, 210);
    blocks[4] = new Block(90, 270);
    blocks[5] = new Block(150, 270);
    blocks[6] = new Block(210, 270);
    blocks[7] = new Block(270, 270);
    blocks[8] = new Block(330, 270);
    blocks[9] = new Block(390, 270);
    blocks[10] = new Block(450, 270);
    blocks[11] = new Block(510, 270);
    blocks[12] = new Block(510, 210);
    blocks[13] = new Block(510, 330);
    blocks[14] = new Block(90, 210);
    blocks[15] = new Block(90, 330);

    //The goal line
    endBlock = new FinishBlock(finishLine[0], finishLine[1]);
}



function level2(){ //Normal mode
    finishLine[0] = 540;
    finishLine[1] = 300;
    while (i != 1){
        //array = random([30, 90, 150, 210, 270, 330, 390, 450, 510, 570]);
        //array2 = random([30, 90, 150, 210, 270, 330, 390, 450, 510, 570]);
        coins[0] = new Coins(570, 450, random(0,3));
        coins[1] = new Coins(270, 270, random(0,3));
        coins[2] = new Coins(210, 30, random(0,3));
        i++;
    }


    //Enemies
    enemy[0] = new Enemy(30, 330);
    enemy[1] = new Enemy(270, 510);
    enemy[2] = new Enemy(90, 150);
    enemy[3] = new Enemy(330, 30);
    


    //Points boarder (Coins)
    blocks[0] = new Block(30, 30);
    blocks[1] = new Block(90, 30);
    blocks[2] = new Block(150, 30);


    //borders
    blocks[3] = new Block(150, 390);
    blocks[4] = new Block(150, 450);
    blocks[5] = new Block(150, 510);
    blocks[6] = new Block(30, 390);
    blocks[7] = new Block(30, 450);
    blocks[8] = new Block(30, 510);
    
    blocks[9] = new Block(30, 210);
    blocks[10] = new Block(90, 210);
    blocks[11] = new Block(150, 210);
    blocks[12] = new Block(210, 210);
    blocks[13] = new Block(270, 210);
    blocks[14] = new Block(330, 210);

    blocks[15] = new Block(330, 270);
    blocks[16] = new Block(330, 330);
    blocks[17] = new Block(330, 390);
    blocks[18] = new Block(330, 450);

    blocks[19] = new Block(390, 270);
    blocks[20] = new Block(390, 330);
    blocks[21] = new Block(390, 390);
    blocks[22] = new Block(390, 450);
    blocks[23] = new Block(390, 210);

    blocks[23] = new Block(30, 90);
    blocks[24] = new Block(90, 90);
    blocks[25] = new Block(150, 90);
    blocks[26] = new Block(210, 90);
    blocks[27] = new Block(270, 90);
    blocks[28] = new Block(330, 90);

    blocks[29] = new Block(390, 210);
    blocks[30] = new Block(390, 150);
    blocks[31] = new Block(390, 90);


    blocks[32] = new Block(510, 270);
    blocks[33] = new Block(510, 330);
    blocks[34] = new Block(510, 390);
    blocks[35] = new Block(510, 450);
    blocks[36] = new Block(510, 210);
    blocks[37] = new Block(510, 150);
    blocks[38] = new Block(510, 90);

    blocks[39] = new Block(570, 390);
    blocks[40] = new Block(30, 150);


    endBlock = new FinishBlock(finishLine[0], finishLine[1]);


}



function level3(){ // Hard Mode
    finishLine[0] = 300;
    finishLine[1] = 300;

    while(i != 1){
        coins[0] = new Coins(90, 90, random(0,3));
        coins[1] = new Coins(30, 450, random(0,3));
        coins[2] = new Coins(510, 90, random(0,3));
        coins[3] = new Coins(570, 450, random(0,3));
        coins[4] = new Coins(330, 510, random(0,3));
        i++;
    }
    //[30, 90, 150, 210, 270, 330, 390, 450, 510, 570]
    enemy[0] = new Enemy(270, 450);
    enemy[1] = new Enemy(30, 210);
    enemy[2] = new Enemy(330, 210);


    enemy2[0] = new Enemy(210, 210);
    enemy2[1] = new Enemy(450, 210);



    //Points boarder (Coins)
    blocks[0] = new Block(30, 30);
    blocks[1] = new Block(90, 30);
    blocks[2] = new Block(150, 30);

    blocks[3] = new Block(210, 30);
    blocks[4] = new Block(270, 30);
    blocks[5] = new Block(330, 30);
    blocks[6] = new Block(390, 30);
    blocks[7] = new Block(450, 30);
    blocks[8] = new Block(510, 30);
    blocks[9] = new Block(570, 30);

    blocks[10] = new Block(210, 90);
    blocks[11] = new Block(450, 90);

    blocks[12] = new Block(210, 150);
    blocks[13] = new Block(450, 150);

    blocks[14] = new Block(150, 150);
    blocks[15] = new Block(510, 150);

    blocks[16] = new Block(450, 510);
    blocks[17] = new Block(510, 510);
    blocks[18] = new Block(570, 510);

    blocks[19] = new Block(30, 510);
    blocks[20] = new Block(90, 510);
    blocks[21] = new Block(150, 510);
    blocks[22] = new Block(210, 510);

    //[30, 90, 150, 210, 270, 330, 390, 450, 510, 570]
    blocks[23] = new Block(150, 390);
    blocks[24] = new Block(150, 450);
    blocks[25] = new Block(90, 450);

    blocks[26] = new Block(510, 270);
    blocks[27] = new Block(510, 330);
    blocks[28] = new Block(510, 390);

    blocks[29] = new Block(30, 330);
    blocks[30] = new Block(150, 330);

    blocks[31] = new Block(270, 390);
    blocks[32] = new Block(390, 390);
    blocks[33] = new Block(270, 270);
    blocks[34] = new Block(390, 270);

    //The goal line
    endBlock = new FinishBlock(finishLine[0], finishLine[1]);


}


function level4(){ //MASTER MODE
    finishLine[0] = 540;
    finishLine[1] = 240;

    //[30, 90, 150, 210, 270, 330, 390, 450, 510, 570]
    while(i != 1){
        coins[0] = new Coins(210, 30, random(0,3));
        coins[1] = new Coins(30, 510, random(0,3));
        coins[2] = new Coins(570, 150, random(0,3));
        coins[3] = new Coins(570, 390, random(0,3));
        coins[4] = new Coins(270, 270, random(0,3));
        i++;
    }


    enemy[0] = new Enemy(30, 150);
    enemy[1] = new Enemy(210, 30);
    enemy[2] = new Enemy(210, 510);

    enemy2[0] = new Enemy(270, 150);
    enemy2[1] = new Enemy(510, 30);
    enemy2[2] = new Enemy(510, 270);











    //Points boarder (Coins)
    blocks[0] = new Block(30, 30);
    blocks[1] = new Block(90, 30);
    blocks[2] = new Block(150, 30);

    blocks[3] = new Block(30, 90);
    blocks[4] = new Block(90, 90);
    blocks[5] = new Block(150, 90);

    blocks[6] = new Block(270, 90); //Same value as 7
    blocks[7] = new Block(270, 90);
    blocks[8] = new Block(330, 90);

    blocks[9] = new Block(450, 90);

    blocks[10] = new Block(450, 450);
    blocks[11] = new Block(450, 150);
    blocks[12] = new Block(450, 210);
    blocks[13] = new Block(450, 270);
    blocks[14] = new Block(450, 330);
    blocks[15] = new Block(450, 390);


    blocks[16] = new Block(30, 450);
    blocks[17] = new Block(90, 450);
    blocks[18] = new Block(150, 450);
    blocks[19] = new Block(150, 450);
    blocks[20] = new Block(270, 450);
    blocks[21] = new Block(330, 450);

//[30, 90, 150, 210, 270, 330, 390, 450, 510, 570]
    blocks[22] = new Block(570, 450);

    blocks[23] = new Block(570, 210);

    blocks[24] = new Block(570, 90);
    
    blocks[25] = new Block(570, 330);


    blocks[26] = new Block(330, 330);
    blocks[27] = new Block(210, 210);
    blocks[28] = new Block(210, 330);
    blocks[29] = new Block(330, 210);

    blocks[30] = new Block(390, 270);
    blocks[31] = new Block(90, 270);

    blocks[32] = new Block(90, 210);
    blocks[33] = new Block(90, 330);

    //The goal line
    endBlock = new FinishBlock(finishLine[0], finishLine[1]);

    //We time the player
    masterModeTimer = true;
    if (frameCount % 60 == 0 && timer >= 0) {
        timer++;
    }

}


//The board itself. Is used for all levels
function board(){
    for (var x = 0; x < width; x += width / 10) {
		for (var y = 0; y < height; y += height / 10) {
			stroke(0);
			strokeWeight(1.5);
			line(x, 0, x, height);
            stroke(110);
            strokeWeight(1.5);
            line(x + 1.5, 0, x + 1.5, height);

            stroke(0);
			strokeWeight(1.5);
			line(0, y, width, y);
            stroke(110);
            strokeWeight(1.5);
            line(0, y +1.5, width, y +1.5);

		}
	}
    //coins display
    for (var i = 0; i < coins.length; i++){
        coins[i].display();
    }
    //Block display
    for (var i = 0; i < blocks.length; i++){
        blocks[i].display();
    }
    //EnemyX display
    for (var i = 0; i < enemy.length; i++){
       enemy[i].displayX();
    }
    //EnemyY display
    for (var i = 0; i < enemy2.length; i++){
        enemy2[i].displayY();
    }
    player.display();
    endBlock.finishDisplay();

    stroke(51);
    fill('gray');
    strokeWeight(2);
    rect(0, 0, 180 ,60);
    fill('cyan');
    textSize(35);
    text(" Jewels: "+points, 0, 45);


    cubeDetector.displayDetector();
 
}   




//Moving correlates to Canvas size. Ex: If Canvas is 600x600, then the
//block moves 60. 500x500 is 50, etc.
function keyPressed() {
    if (key === "w" && playerCounter != 1) {
        playerCounter = 1;
        player.turn(90);
    }
    if (key === "a" && playerCounter != 2) {
        playerCounter = 2;
        player.turn(180);

    }
    if (key === "s" && playerCounter != 3) {
        playerCounter = 3;
        player.turn(270);
    }
    if (key === "d" && playerCounter != 0) {
        playerCounter = 0;
        player.turn(0);
    }
    if (key === "w" || key === "a" || key === "s" || key === "d"){
        player.moveForward();
        pressByBeat = 'red';
    }
}
//---------------------------------------------------------LEVEL DESIGN-------------------------------------------------------------------







//*/-------------------------------temporary for player ------------------------
function onCircle(coords, r, deg){
    let t = degToRad(deg);
    return new createVector(r*Math.cos(t)+coords.x,r*Math.sin(t)+coords.y);
}
function degToRad(deg){//Size of the triangle in height
    return -deg*(Math.PI/180);
}
//Making the triangle of the player
function makeTriangle(center, radius, deg){
    let p1 = onCircle(center, radius, deg);
    let p2 = onCircle(center, radius, deg+120);
    let p3 = onCircle(center, radius, deg-120);
    // let bigger = max(p2.x, shift);
    // let smaller = min(p2.x, shift);
    // let shiftX = bigger-smaller;
    // p1.x = max(p1.x, shiftX)-min(p1.x, shiftX);
    // p2.x = max(p2.x, shiftX)-min(p2.x, shiftX);
    // p3.x = max(p3.x, shiftX)-min(p3.x, shiftX);
    return {x1:p1.x, y1:p1.y, x2:p2.x, y2:p2.y, x3:p3.x, y3:p3.y}
}
//--------------------------------------------------------------------------------



//1,1 is the bottom left tile
//Test for out of bounds
function tileAt(x, y){
    let tileMax = boardSize/tileSize;
    if ((x<=0 || x>tileMax) || (y<=0 || y>tileMax)) {
        throw new RangeError("Coordinates should be between 1 and "+tileMax);
    }
    let tileX = x*tileSize;
    let tileY = y*tileSize;
    let xCoords = tileX-tileSize;
    let yCoords = boardSize-tileY;
    return {x: xCoords, y: yCoords}
    
}

//------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES
//------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES
//------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES
//------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES
//------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES
//------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES
//------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES
//------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES
//------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES
//------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES
//------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES
//------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES
//------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES
//------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES
//------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES
//------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES
//------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES
//------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES
//------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES
//------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES
//------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES
//------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES
//------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES------------------CLASSES



//------------------------------------------------------Player Class--------------------------------------------
class Player{
    constructor(startPosX, startPosY){
        this.facing = 0;
        this.xy = tileAt(startPosX,startPosY);
        this.x = this.xy.x;
        this.y = this.xy.y;
        this.center = {x: this.x+tileSize/2, y:this.y+tileSize/2};
        this.playerCounter = playerCounter;
        this.prevX = this.x;
        this.prevY = this.y;
    }

    //Show the character
    display(){
        //X and Y and width, and height
        this.showImage(playerCounter); //Shows the character image

        //Character Debug

        //let test = makeTriangle(this.center, tileSize/2-(tileSize*0.15), this.facing);
        //fill("blueviolet");
        //triangle(test.x1, test.y1, test.x2, test.y2, test.x3, test.y3);
        //fill("red");
        //let test2 = makeTriangle({x:test.x1, y:test.y1}, tileSize/4-(tileSize*0.10), this.facing);
        //triangle(test2.x1, test2.y1, test2.x2, test2.y2, test2.x3, test2.y3);
    }


    //WORK IN PROGRESS
    showImage(counter){
        //There are 0, 3, 6
        this.playerCounter = counter;
        if (counter === -1){
            counter = 3;
            playerCounter = counter;
            this.playerCounter = counter;
        }else if(counter === 4){
            counter = 0;
            playerCounter = counter;
            this.playerCounter = counter;
        }
        if(counter === 0){ //Right side
            image(playerAnimation[6], round(this.x) + 12, round(this.y) - 20, 0, 0);
        }
        if(counter === 1){ //Upper
            image(playerAnimation[3], round(this.x) + 7, round(this.y) -20, 0, 0);
        }
        if(counter === 2){ //LeftSide
            image(playerAnimation[9], round(this.x) + 7, round(this.y) - 20, 0, 0);
        }
        if(counter === 3){ //Front
            image(playerAnimation[0], round(this.x) + 7, round(this.y) -20, 0, 0);
        }
    }


    //Move the character forward
    moveForward(){
        let test = onCircle(this.center, tileSize, this.facing);
        this.updatePosition(test.x-tileSize/2, test.y-tileSize/2, this.facing);
        //image(playerAnimation[0], round(this.x) + 5, round(this.y) + 5, 50, 50);
    }

    //Turn the character
    turn(deg){
        // this.facing = this.facing+deg;
        this.updatePosition(this.x, this.y, deg); //this.facing+deg
    }

    //All the movement is updating its position
    updatePosition(x, y, deg){
        //console.log(round(x));
        //console.log(round(y));
        moveWidth = round(x);
        moveHeight = round(y);
        if (round(x) === -60){
            this.prevX = this.x;
            this.prevY = this.y;

            this.x = 0;
            this.y = y;
            this.center = {x: this.x+tileSize/2, y:this.y+tileSize/2};
            this.facing = deg;
        }else if (round(x) === 600){
            this.prevX = this.x;
            this.prevY = this.y;

            this.x = 540;
            this.y = y;
            this.center = {x: this.x+tileSize/2, y:this.y+tileSize/2};
            this.facing = deg;
        }else if (round(y) === -60){
            this.prevX = this.x;
            this.prevY = this.y;

            this.x = x;
            this.y = 0;
            this.center = {x: this.x+tileSize/2, y:this.y+tileSize/2};
            this.facing = deg;
        }else if (round(y) === 540){
            this.prevX = this.x;
            this.prevY = this.y;

            this.x = x;
            this.y = 480;
            this.center = {x: this.x+tileSize/2, y:this.y+tileSize/2};
            this.facing = deg;
        }else{
            this.prevX = this.x;
            this.prevY = this.y;

            this.x = x;
            this.y = y;
            this.center = {x: this.x+tileSize/2, y:this.y+tileSize/2};
            this.facing = deg;
        }

        //Collect coins
        for (var i = 0; i < coins.length; i++){
            if (coins[i].rpos - 30 === round(this.x) && coins[i].rpos2 - 30 === round(this.y)){
                //Coins gone
                coins[i].rpos = 1;
                coins[i].rpos2 = 1;
                points++;
            }
        }

        //Detect blocks
        for (var i = 0; i < blocks.length; i++){
            if (blocks[i].rpos - 30 === round(this.x) && blocks[i].rpos2 - 30 === round(this.y)){
                this.x = this.prevX;
                this.y = this.prevY;
                this.center = {x: this.x+tileSize/2, y:this.y+tileSize/2};
                this.facing = deg;
            }
        }

    }

}
//-----------------------------------------------------------------------------------------------------------------





//-------------------------------------------------------ENEMY CLASS-----------------------------------------------
class Enemy{
    constructor(enemyblockX, enemyblockY){
        this.posX = enemyblockX;
        this.pos2X = enemyblockY;

        this.posY = enemyblockX;
        this.pos2Y = enemyblockY;


        this.enemyMovingX = enemyMovingX;
        this.enemyMovingY = enemyMovingY;


        this.flip = flipBooleanX; //Flip the sprite when walking back
    }

    displayX(){
        
        fill('blue');
        if (this.enemyMovingX <= enemyMoveMaxX){
            this.posX += enemyMovingX;
        }
        if (this.flip === true){
            image(guard[13], round(this.posX) - 20, round(this.pos2X) - 57, 0, 0);
        }else{
            image(guard[14], round(this.posX) - 20, round(this.pos2X) - 57, 0, 0);
        }
        //rect(this.posX - 20, this.pos2X - 20, width / 15, height / 15);
        

        //Detect enemy
        for (let i = 0; i < enemy.length; i++){
            if(this.posX - 30 === moveWidth && this.pos2X - 30 === moveHeight){
                level = 5;
            }
        }
    }


    displayY(){
        fill('blue');
        if (this.enemyMovingY <= enemyMoveMaxY){
            this.pos2Y += enemyMovingY;
        }

        if (this.flip === true){
            image(guard[15], round(this.posY) - 24, round(this.pos2Y) - 57, 0, 0);
        }else{
            image(guard[12], round(this.posY) - 24, round(this.pos2Y) - 57, 0, 0);
        }
        //rect(this.posX - 20, this.pos2X - 20, width / 15, height / 15);
        

        //Detect enemy
        for (let i = 0; i < enemy2.length; i++){
            if(this.posY - 30 === moveWidth && this.pos2Y - 30 === moveHeight){
                level = 5;
            }
        }
    }
}
//-----------------------------------------------------------------------------------------------------------------


//----------------------------------------------------COINS CLASS--------------------------------------------------
class Coins{
    constructor(randomCoinX, randomCoinY, i){
        this.rpos = randomCoinX;
        this.rpos2 = randomCoinY;
        this.random = i;
    }

    display(){
        push();
        //fill('gold');
        image(diamonds[round(this.random)], this.rpos - 22, this.rpos2 - 20, 45, 43);
        //ellipse(this.rpos, this.rpos2, width / 20, height / 16); //Outer circle
        //ellipse(this.rpos, this.rpos2, width / 40, height / 25); //Inner circle
        pop();
    }
}
//-----------------------------------------------------------------------------------------------------------------


//-----------------------------------------------------BLOCK CLASS-------------------------------------------------
class Block{
    constructor(randomBlockX, randomBlockY){
        this.rpos = randomBlockX;
        this.rpos2 = randomBlockY;
    }

    display(){
        push();
        fill('#2e2e2d');
        rect(this.rpos - 20, this.rpos2 - 20, width / 15, height / 15); //Outer circle
        pop();
    }
}
//-----------------------------------------------------------------------------------------------------------------



//---------------------------------------------------FINISHING BLOCK CLASS-----------------------------------------
class FinishBlock{
    constructor(randomBlockX, randomBlockY){
        this.rpos = randomBlockX;
        this.rpos2 = randomBlockY;
    }


    finishDisplay(){
        push();
        fill('green');
        rect(this.rpos + 10, this.rpos2 + 10, width / 15, height / 15); //Outer circle
        pop();
    }
}
//-----------------------------------------------------------------------------------------------------------------



//----------------------------------------------------MUSIC BEAT CLASS---------------------------------------------
class Cube{ //The red cube
    displayDetector(){
        fill('black');
        rect(0, 540, 600 ,60); //Whole bar
        fill(pressByBeat);
        rect(480, 540, 60 , 60); //Beat detector?
        // now see if distance between two is less than sum of two radius'
       

        //Are you in sync? (COMMENT OUT FOR NOW)
        
        if ((x2 > 540 || x2 < 480) && pressByBeat === 'red'){ //If you miss the beat
            backgroundColor-= 50;
        }else if (backgroundColor <= 60){
            level = 5;
        }

        //If condition for now. Enemy collision




        if (pressByBeat === 'red'){
            pressByBeat = 500;
        }


        //-----Enemy moving in the X-------
        if (x2 < 530 && x2 > 520 && enemyMovingX <= enemyMoveMaxX && enemyMoveMaxLockX === false){
            enemyMovingX+=60;
            flipBooleanX = false;
        }
        //Moving back for the X
        if (x2 < 530 && x2 > 520 && enemyMoveMaxLockX === true){
            enemyMovingX -=60;
            flipBooleanX = true;
            if (enemyMovingX === 0){
                enemyMoveMaxLockX = false;
            }
        }
        //Locks for the X
        if (enemyMovingX === enemyMoveMaxX){ 
            enemyMoveMaxLockX = true;
        }
        //-------------




        //-----Enemy moving in the Y-------
        if (x2 < 530 && x2 > 520 && enemyMovingY <= enemyMoveMaxY && enemyMoveMaxLockY === false){
            enemyMovingY+=60;
        }
        //Moving back for the Y
        if (x2 < 530 && x2 > 520 && enemyMoveMaxLockY === true){
            enemyMovingY -=60;
            flipBooleanY = true;
            if (enemyMovingY === 0){
                enemyMoveMaxLockY = false;
            }
        }
        //Locks for the Y
        if (enemyMovingY === enemyMoveMaxY){ 
            enemyMoveMaxLockY = true;
        }
        //-------------


    }


    displayMainMenu(){ //Shows a Cop and a Thief Running
        noStroke();
        //rect(xMainMenu, yMainMenu, rectWidthMainMenu, rectHeightMainMenu);
        image(playerAnimation[6], xMainMenu, yMainMenu - 53, 0, 0);
        textSize(20);
        fill('white');
        text("Now playing: 2+2=5 8-bit (By RGYDK)", xMainMenu + 50, 575);
        //rect(xMainMenu, yMainMenu, rectWidthMainMenu, rectHeightMainMenu);
        image(guard[14], xMainMenu - 100, yMainMenu - 60, 0, 0);
        if(xMainMenu > width + 100) {
            xMainMenu = -rectWidthMainMenu - 1000;
        }
        xMainMenu+=2; //Change when needed
    }

    displayLevelSetup(_x2){
        noStroke();
        fill('red');
        rect(x2, y2, rectWidth, rectHeight);
        if(x2 > width) {
            x2 = -rectWidth;
        }
        x2+=_x2;
    }
    displayLevel1(){ //Music:
        this.displayLevelSetup(8.047271649); // ..645 - ..650
    }

    displayLevel2(){ //Music:
        this.displayLevelSetup(8.9); // xpos needs to change if it's split in 3 // tempo untouched
    }

    displayLevel3(){ //Music:
        this.displayLevelSetup(10.05); // ..00 - ..10
        // this changes tempo after intro (10.05 --> 120 bpm (12?)) i like it though
    }

    displayLevel4(){ //Music: Super Mario Galaxy 2 
        this.displayLevelSetup(12.52); // ...12.50 - ..12.55
        // starts with 2 16th notes.
        // changes tempo mid-song: ? to about 98 bpm
    }
}
//-----------------------------------------------------------------------------------------------------------------
