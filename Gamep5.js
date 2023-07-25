/*/
Game Project
Rhythm Swipe

This game is protected under the AGPL-3.0 license.

Legends:
- //!!!: Variable restart in Finish or Failed function
/*/



//----------------------MainMenu----------------------
let BackgroundImage; //Main menu background
var NPCS; 
let rectWidthMainMenu = 30;
let rectHeightMainMenu = 500;

//Characters in the Main Menu (Decoration)
let xMainMenu = rectWidthMainMenu; 

let xMainMenuCop = rectWidthMainMenu; 
let xMainMenuRobber = rectWidthMainMenu; 

let yMainMenu = 575;

//Audio for the Main Menu
let MainMenuTheme;
let MainMenuThemeSwitch = false;

let IntermissionThemeSwitch = false;
//----------------------------------------------------

//---------------Creating the Board-------------------
var boardSize = 600; //How big the board is
let tileSize = boardSize/10; //The grid
//----------------------------------------------------



//-----------------The Character----------------------
let moveWidth = 0; //!!!
let moveHeight = 0; //!!!
let player; //The player //!!!
let playerAnimation = []; //List of images to use for the character
var playerCounter = 0; //!!!
let backgroundColor = 250; //The background color of the board. //!!!
let playerAttempts = 3; //!!!
let beatColorBoolean = false; //!!!
//----------------------------------------------------



//------------------Enemies---------------------------
let enemyJ = [];
let guard = []; //Images of the guard
let enemyMovePattern = 0; //!!! In reset enemies
let lockPattern = false; //!!! In reset enemies
let lockPatternUsed = false; //!!! In reset enemies
//Use these variables to check collision with a player above
//----------------------------------------------------



//------------------Pause-----------------------------
let pauseTime = 0.0;
let pauseTimeLag = 0.0;
let isPaused = false;

//---------The bar that detects the beat in game------
let pressByBeat = 500;
var cubeDetector; //The box that detects the red cube
//The red cube
var cubeBeat;
let rectWidth = 30;
let rectHeight = 500;
let widthMinusCube = boardSize - rectWidth;

// time for cubes and music
let realPrevMusicTime = 0.0; //!!!
let realMusicTime = 0.0; //!!!
let isStartTime = false; //!!!
let realStartTime = 0.0; //!!!

let oldMusicRate = 1; //!!!
let musicRate = 1;

//position of red cubes
let x2tWait = 0.0; // no reset required
let x2t = 0.0; //!!!
let x2totalDistance = 0.0;
let x2totalTime = 0.0;
let x2wait = 0.0; //!!!
let x2start = 0.0;//!!! tileSize-(rectWidth/2);
// Above positioned on 1st/2nd tile border.
// IF there was 5 cubes it might be perfect position.
// let x2start = tileSize*2+((tileSize-rectWidth)/2);
// Above positioned in center of 3rd tile

// All visible x values are within [0, boardSize (600 if it's not changed)].
let x2temp = -rectWidth; //!!!
// let x2 = x2start - 100; //!!!
let x2 = [
    x2start - 100, // old x2 --> x2[0]
    x2start, // old x22 --> x2[1]
    x2start + 100, // old x23
    x2start + 200, // ...
    x2start + 300, //
    x2start + 400 //
];

let y2 = 575; //!!!
//----------------------------------------------------



//--------------------Timer for all levels---------------------------
//Timer used to see how long the player takes to complete a level.
let timer = 0; //!!!

let easyworldRecord = null;
let normalworldRecord = null;
let hardworldRecord = null;
let masterworldRecord = null;

let easyModeTimer = false; //!!!
let normalModeTimer = false; //!!!
let hardModeTimer = false; //!!!
let masterModeTimer = false; //!!!
let trophies = [];
//--------------------------------------------------------------------



//------------------------Items in game-------------------------------
let coins = []; //!!!
let diamonds = []; //Our 'coins' images
let blocks = []; //!!!

let points = 0; //!!!
let i = 0; //!!!
let level = -1; //Can change any level for testing purposes (Default: -1)
let levelRetry; //Retry Level
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

//Sound effects
var coinSound; //!!!
var VictorySound;
var FailSound;
var PlayerJumpSound; //!!!
var ButtonSound;
//--------------------------------------------------------------------


//--------Resize window---------
let redrawLock = false; //Create the buttons once in the setup
//------------------------------

//------Others---------
let OtherImg = [];
//---------------------

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
let buttonRetry;
//--------------------------------------------------------------------
var messageError = document.getElementById("Error");
let resizeLock = false;

//--------------------------------------------------------------PRELOAD----------------------------------------------------------------------------
function preload() {

    //Level Sounds

    //*/Sounds//
    easySound = loadSound('sounds/LevelSounds/A_Punchup_at_a_Wedding_8-bit.mp3');
    //*/
    //*/Sounds//
    normalSound = loadSound('sounds/LevelSounds/There_There_8-bit.mp3');
    //*/
    //*/Sounds//
    hardSound = loadSound('sounds/LevelSounds/Where_I_End_You_Begin_8-bit.mp3');
    //*/
    //*/Sounds//
    masterSound = loadSound('sounds/LevelSounds/Super_Smash_Bros.mp3');
    //*/

    //*/Sounds//
    MainMenuTheme = loadSound('sounds/Main8-bit.mp3');
    //*/


    //Sound Effects
    //*/Sounds//
    coinSound = loadSound('sounds/SoundEffects/CoinSound.mp3');
    VictorySound = loadSound('sounds/SoundEffects/VictorySound.mp3');
    FailSound = loadSound('sounds/SoundEffects/FailSound.mp3');
    PlayerJumpSound = loadSound('sounds/SoundEffects/PlayerJumpSound.mp3');
    ButtonSound = loadSound('sounds/SoundEffects/ButtonSound.mp3');
    //*/


    //Thief Images
    for (let i = 0; i <= 12; i++){
        if (i === 0 || i === 3 || i === 6 || i === 9){
            playerAnimation[i] = loadImage("asset/thief/Thief"+i+".gif");
        }else if (i === 12){ //Main Menu Thief
            playerAnimation[i] = loadImage("asset/thief/ThiefMainMenu.gif");
        }else{
            playerAnimation[i] = loadImage("asset/thief/Thief"+i+".png");
        }
        console.log("Sprite Thief loaded");
    }

    //Guard Images
    for (let i = 0; i < 12; i++){
        guard[i] = loadImage("asset/guard/Guard"+i+".png");
        console.log("Sprite Guard loaded");
    }
    for (let i = 12; i < 16; i++){
        guard[i] = loadImage("asset/guard/Guard"+i+".gif");
        console.log("Animated Sprite Guard loaded");
    }

    //Diamond Images
    for (let i = 0; i < 4; i++){
        diamonds[i] = loadImage("asset/gems/gem"+i+".png");
        console.log("Items loaded");
    }

    //Other Images (For Mission Failed/Success screen)
    for (let i = 1; i <= 2; i++){
        OtherImg[i] = loadImage("asset/OtherImg/OtherImg"+i+".gif");
    }

    //Trophies
    for (let i = 0; i < 3; i++){
        trophies[i] = loadImage("asset/Trophies/Trophy"+i+".png");
    }

    //Main Menu
    BackgroundImage = loadImage('asset/MainMenu.gif');

    //Start
    StartBackgroundImage = loadImage('asset/Start.gif');

    //TESTING Master Mode background specifically
    MasterModeBackgroundImage = loadImage('asset/MasterModeBackground.jpg');

    //TESTING level background
    LevelBackgroundImage = loadImage('asset/LevelBackground.jpg');

    //TESTING music background
    MusicBackgroundImage = loadImage('asset/Music.gif');


    MissionFailedBackground = loadImage('asset/MissionFailedBackground.jpg');
    MissionSuccessBackground = loadImage('asset/MissionSuccessBackground.jpg');
}





//--------------------------------------------------------------------SETUP---------------------------------------------------------------------------------
//Creation of the Canvas, the buttons, and the sounds
function setup() {
    //Center the game on the page

    let div = createCanvas(boardSize, boardSize);
    div.position(100, 101);
    div.center('horizontal');
    div.style("border", "5px solid cyan");

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
        StartGameButton.style('border', '5px solid cyan');
        StartGameButton.style('cursor', 'pointer');
        StartGameButton.size(200, 75);
        StartGameButton.mousePressed(mainMenu); //Goes to Main Menu


        //-------------Back button-----------
        buttonBack = createButton('Back');
        buttonBack.style('color', 'black');
        buttonBack.style('font-size', 'large');
        buttonBack.style('border', '5px solid cyan');
        buttonBack.style('cursor', 'pointer');
        buttonBack.size(200, 75);
        buttonBack.mousePressed(mainMenu); //Goes to Main Menu
        //-----------------------------------

        //-----------Easy Button-------------
        button = createButton('💎 Easy 💎');
        button.style('color', 'green');
        button.style('font-size', 'large');
        button.style('border', '5px solid green');
        button.style('cursor', 'pointer');
        button.size(200, 75);
        button.mousePressed(easyIntermission); //Goes to Intermission

        buttonStart = createButton('Start');
        buttonStart.style('color', 'green');
        buttonStart.style('font-size', 'large');
        buttonStart.style('border', '5px solid green');
        buttonStart.style('cursor', 'pointer');
        buttonStart.size(200, 75);
        buttonStart.mousePressed(easyLevel); //Play Easy Mode
        //-----------------------------------

        //-----------Normal Button-----------
        button2 = createButton('💎💎 Normal 💎💎');
        button2.style('color', 'orange');
        button2.style('font-size', 'large');
        button2.style('border', '5px solid orange');
        button2.style('cursor', 'pointer');
        button2.size(200, 75);
        button2.mousePressed(normalIntermission); //Goes to Intermission

        button2Start = createButton('Start');
        button2Start.style('color', 'orange');
        button2Start.style('font-size', 'large');
        button2Start.style('border', '5px solid orange');
        button2Start.style('cursor', 'pointer');
        button2Start.size(200, 75);
        button2Start.mousePressed(normalLevel); //Play Normal Mode
        //-----------------------------------

        //------------Hard button------------
        button3 = createButton('💰 Hard 💰');
        button3.style('color', 'red');
        button3.style('font-size', 'large');
        button3.style('border', '5px solid red');
        button3.style('cursor', 'pointer');
        button3.size(200, 75);
        button3.mousePressed(hardIntermission); //Goes to Intermission

        button3Start = createButton('Start');
        button3Start.style('color', 'red');
        button3Start.style('font-size', 'large');
        button3Start.style('border', '5px solid red');
        button3Start.style('cursor', 'pointer');
        button3Start.size(200, 75);
        button3Start.mousePressed(hardLevel); //Play Hard Mode
        //------------------------------------

        //-----------Master button (Used to see the world record)----------
        button4 = createButton('💰👑 Master 👑💰');
        button4.style('color', 'blueviolet');
        button4.style('font-size', 'large');
        button4.style('border', '5px solid blueviolet');
        button4.style('cursor', 'pointer');
        button4.size(200, 75);
        button4.mousePressed(masterIntermission); //Goes to Intermission

        button4Start = createButton('Start');
        button4Start.style('color', 'blueviolet');
        button4Start.style('font-size', 'large');
        button4Start.style('border', '5px solid blueviolet');
        button4Start.style('cursor', 'pointer');
        button4Start.size(200, 75);
        button4Start.mousePressed(masterLevel); //Play Master Mode
        //-----------------------------------------------------------------


        //---------Return button (For Finish and Fail level)---------------
        buttonW = createButton('Return');
        buttonW.style('color', 'black');
        buttonW.style('font-size', 'large');
        buttonW.style('border', '5px solid cyan');
        buttonW.style('cursor', 'pointer');
        buttonW.size(200, 75);

        buttonW.mousePressed(mainMenu); //Main menu
        buttonW.hide();

        //-----------------------------------------------------------------

        //---------Retry button (For Fail level)---------------
        buttonRetry = createButton('Retry');
        buttonRetry.style('color', 'black');
        buttonRetry.style('font-size', 'large');
        buttonRetry.style('border', '5px solid cyan');
        buttonRetry.style('cursor', 'pointer');
        buttonRetry.size(200, 75);

        buttonRetry.mousePressed(mainMenuRetry); //Main menu
        buttonRetry.hide();

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
    buttonW.position(250, 590);
    buttonW.center('horizontal');

    buttonRetry.position(250, 505);
    buttonRetry.center('horizontal');
    

    //Switch through rooms based on the 'level' variable. Functionality for buttons mainly
    switch(level){
        case -2:
            //Hide all buttons
            buttonHide();
            buttonBack.hide();
            buttonW.hide();
            buttonRetry.hide();
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

            //*/Sounds//
            coinSound.stop();
            VictorySound.stop();
            FailSound.stop();
            PlayerJumpSound.stop();
            //*/

            //Reset everything
            failed();
            break;
        case -1:
            //Start Game
            buttonHide();
            buttonBack.hide();
            StartGameButton.show();
            tint(200);
            image(StartBackgroundImage, 0, 0, boardSize, boardSize);
            break;
        //---------------Main Menu------------------
        case 0:
            IntermissionThemeSwitch = false;
            buttonBack.hide();
            StartGameButton.hide();
            buttonW.hide();
            buttonRetry.hide();
            buttonStart.hide();
            button2Start.hide();
            button3Start.hide();
            button4Start.hide();

            //*/Sounds//
            easySound.stop();
            normalSound.stop();
            hardSound.stop();
            masterSound.stop();

            coinSound.stop();
            VictorySound.stop();
            FailSound.stop();
            PlayerJumpSound.stop();
            //*/

            //*/Sounds//
            if (MainMenuThemeSwitch === false && !MainMenuTheme.isPlaying()){
                setup();
                MainMenuTheme.play();
                MainMenuTheme.setVolume(0.4);
                MainMenuTheme.loop();
                MainMenuThemeSwitch = true;
                console.log("play")
// below line might not be needed. git merge v1.0.0 + my PR
                realStartTime = getAudioContext().currentTime;
            }
            //*/
            //background('black');
            tint(200);
            image(BackgroundImage, 0, 0, boardSize, boardSize);
            showNPC(); //A nice seeing of a cop running to the robber
            fill('cyan');
            textSize(50);
            text("R h y t h m  S w i p e", 77, 100);
            textSize(15);

            //*/VERSION/
            fill("white");
            text("Alpha v1.1.0", 5, 15);

            buttonShow();
            break;
        //------------------------------------------



        //--------------Easy Mode-------------------
        case 0.5: //Level 1 Overview
	    setup();
            //*/Sounds//
            MainMenuTheme.stop();
            //*/
            MainMenuThemeSwitch = false;

            tint(100);
            image(MusicBackgroundImage, 0, 0, boardSize, boardSize);
            //background('gray');
            buttonHide();
            //Show the Start and Back button
            buttonBack.show();
            buttonStart.show();
            fill('white');
            textSize(25);
            text("Difficulty: Easy", 25, 100);
            textSize(17);
            text("Music: A Punch Up at a Wedding 8-bit", 25, 150);
            text("By RGYDK", 25, 200);

            if (easyworldRecord === null){
                text("Current Record Time: ???", 20, 570);
            }else{
                //Display appropriate Trophy (Need Refining)
                if (easyworldRecord <= 100){
                    text("Current Record Time: "+easyworldRecord+"s", 20, 570);
                    tint(230);
                    image(trophies[0], 185, 50, 75, 75);
                }else if (easyworldRecord > 100 && easyworldRecord < 150){
                    text("Current Record Time: "+easyworldRecord+"s", 20, 570);
                    tint(230);
                    image(trophies[1], 185, 50, 75, 75);
                }else{
                    text("Current Record Time: "+easyworldRecord+"s", 20, 570);
                    tint(230);
                    image(trophies[2], 185, 50, 75, 75);
                }
            }
            visualAudio(); //Show the audio visually
            break;
        case 1: //Easy Mode Game
            buttonHide();
            FailSound.stop();
            if (!player){
                //*/Sounds//
                // easySound.play();
                //*/
                player = new Player(1, 6, "right");
            }

            tint(backgroundColor);
            image(LevelBackgroundImage, 0, 0, boardSize, boardSize);
            levelRetry = level;
            //background(backgroundColor);
            level1();
            board();
            level1Beat();
            finished();
            break;
        //-----------------------------------------



        //-------------Normal Mode-----------------
        case 1.5: //Level 2 overview
	    setup();
            //*/Sounds//
            MainMenuTheme.stop();
            //*/
            MainMenuThemeSwitch = false;

            tint(100);
            image(MusicBackgroundImage, 0, 0, boardSize, boardSize);
            //background('gray');
            buttonHide();
            buttonBack.show();
            button2Start.show();
            fill('white');
            textSize(25);
            text("Difficulty: Normal", 25, 100);
            textSize(17);
            text("Music: There There 8-bit", 25, 150);
            text("By RGYDK", 25, 200);

            if (normalworldRecord === null){
                text("Current Record Time: ???", 20, 570);
            }else{
                //Display appropriate Trophy (Need Refining)
                if (normalworldRecord <= 100){
                    text("Current Record Time: "+normalworldRecord+"s", 20, 570);
                    tint(230);
                    image(trophies[0], 205, 50, 75, 75);
                }else if (normalworldRecord > 100 && normalworldRecord < 150){
                    text("Current Record Time: "+normalworldRecord+"s", 20, 570);
                    tint(230);
                    image(trophies[1], 205, 50, 75, 75);
                }else{
                    text("Current Record Time: "+normalworldRecord+"s", 20, 570);
                    tint(230);
                    image(trophies[2], 205, 50, 75, 75);
                }
            }
            visualAudio();
            break;
        case 2: //Normal Mode Game
            buttonHide();
            FailSound.stop();
            if (!player){
                //*/Sounds//
                // normalSound.play();
                //*/
                player = new Player(2, 2, "up");
                playerCounter = 1;
                // player.turn(90);
            }

            tint(backgroundColor);
            image(LevelBackgroundImage, 0, 0, boardSize, boardSize);
            //background(backgroundColor);
            levelRetry = level;
            level2();
            board();
            level2Beat();
            finished();
            break;
        //-----------------------------------------





        //---------------Hard Mode-----------------
        case 2.5: //Hard intermission
	    setup();
            //*/Sounds//
            MainMenuTheme.stop();
            //*/
            MainMenuThemeSwitch = false;

            tint(100);
            image(MusicBackgroundImage, 0, 0, boardSize, boardSize);
            //background('gray');
            buttonHide();
            buttonBack.show();
            button3Start.show();
            fill('white');
            textSize(25);
            text("Difficulty: Hard", 25, 100);
            textSize(17);
            text("Music: Where I End and You Begin 8-bit", 25, 150);
            text("By RGYDK", 25, 200);

            if (hardworldRecord === null){
                text("Current Record Time: ???", 20, 570);
            }else{
                //Display appropriate Trophy (Need Refining)
                if (hardworldRecord <= 100){
                    text("Current Record Time: "+hardworldRecord+"s", 20, 570);
                    tint(230);
                    image(trophies[0], 180, 50, 75, 75);
                }else if (hardworldRecord > 100 && hardworldRecord < 150){
                    text("Current Record Time: "+hardworldRecord+"s", 20, 570);
                    tint(230);
                    image(trophies[1], 180, 50, 75, 75);
                }else{
                    text("Current Record Time: "+hardworldRecord+"s", 20, 570);
                    tint(230);
                    image(trophies[2], 180, 50, 75, 75);
                }
            }

            visualAudio();
            break;
        case 3: //Hard Mode
            buttonHide();
            FailSound.stop();
            if (!player){
                //*/Sounds//
                // hardSound.play();
                //*/
                player = new Player(6, 9, "down");
                // playerCounter = 3;
                // player.turn(-90);
            }

            tint(backgroundColor);
            image(LevelBackgroundImage, 0, 0, boardSize, boardSize);
            levelRetry = level;
            //background(backgroundColor);
            level3();
            board();
            level3Beat();
            finished();
            break;
         //----------------------------------------

        //Either win or lose
        case 4: //Mission accomplished with Stats (Competition used Testing)
            //background('green');
            tint(100);
            image(MissionSuccessBackground, 0, 0, boardSize, boardSize);

            fill('cyan');
            textSize(45);
            text("M i s s i o n  S u c c e s s", boardSize/25, 100);

            //Timers
            if (easyModeTimer === true){
                text("Finish Time: "+timer+"s", boardSize/5, 200);
                if (easyworldRecord > timer || easyworldRecord === null){
                    text("New World Record!", boardSize/6.5, 300);
                }else{
                    textSize(25);
                    text("World Record: "+easyworldRecord+"s", boardSize/12, 300);
                }
            }else if (normalModeTimer === true){
                text("Finish Time: "+timer+"s", boardSize/5, 200);
                if (normalworldRecord > timer || normalworldRecord === null){
                    text("New World Record!", boardSize/6.5, 300);
                }else{
                    textSize(25);
                    text("World Record: "+normalworldRecord+"s", boardSize/12, 300);
                }
            }else if (hardModeTimer === true){
                text("Finish Time: "+timer+"s", boardSize/5, 200);
                if (hardworldRecord > timer || hardworldRecord === null){
                    text("New World Record!", boardSize/6.5, 300);
                }else{
                    textSize(25);
                    text("World Record: "+hardworldRecord+"s", boardSize/12, 300);
                }
            }else if (masterModeTimer === true){
                text("Finish Time: "+timer+"s", boardSize/5, 200);
                if (masterworldRecord > timer || masterworldRecord === null){
                    text("New World Record!", boardSize/6.5, 300);
                }else{
                    textSize(25);
                    text("World Record: "+masterworldRecord+"s", boardSize/12, 300);
                }
            }else{
                tint(255);
                image(OtherImg[2], 102, 125);
            }
            //----


            buttonW.show();
            buttonHide();
            break;
        case 5: //Mission Failed
            //background('#D9544D');
            tint(100);
            image(MissionFailedBackground, 0, 0, boardSize, boardSize);
            fill('red');
            textSize(50);
            text("M i s s i o n  F a i l e d", boardSize/10.3, 100);

            tint(255);
            image(OtherImg[1], 54.5, 125);
            buttonRetry.show(); //Retry option
            buttonW.show();
            buttonHide();
            failed();
            break;
        //------------------



        //--------------Master Mode-------------------
        case 5.5: //Master Mode Intermssion
	    setup();
            //*/Sounds//
            MainMenuTheme.stop();
            //*/
            MainMenuThemeSwitch = false;

            tint(100);
            image(MusicBackgroundImage, 0, 0, boardSize, boardSize);
            //background('gray');
            buttonHide();
            buttonBack.show();
            button4Start.show();
            fill('white');
            textSize(25);
            text("Difficulty: Master", 25, 100);
            textSize(17);
            text("Music: Galeem and Dharkon (8-Bit Remix) - Super Smash Bros. Ultimate", 25, 150);
            text("By Tater-Tot Tunes", 25, 200);
            if (masterworldRecord === null){
                text("Current Record Time: ???", 20, 570);
            }else{
                //Display appropriate Trophy (Need Refining)
                if (masterworldRecord <= 100){
                    text("Current Record Time: "+masterworldRecord+"s", 20, 570);
                    tint(230);
                    image(trophies[0], 205, 50, 75, 75);
                }else if (masterworldRecord > 100 && masterworldRecord < 150){
                    text("Current Record Time: "+masterworldRecord+"s", 20, 570);
                    tint(230);
                    image(trophies[1], 205, 50, 75, 75);
                }else{
                    text("Current Record Time: "+masterworldRecord+"s", 20, 570);
                    tint(230);
                    image(trophies[2], 205, 50, 75, 75);
                }
            }
            visualAudio();
            break;
        case 6: //Master Mode Game
            buttonHide();
            FailSound.stop();
            if (!player){
                //*/Sounds//
                // masterSound.play();
                //*/
                player = new Player(1, 6, "right");
            }

            //TESTING Image
            tint(backgroundColor);
            image(MasterModeBackgroundImage, 0, 0, boardSize, boardSize);
            //background(backgroundColor);
            levelRetry = level;

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
    let tilePos = {x: player.x, y: player.y};
    let finishedPos = {x: finishLine[0], y: finishLine[1]}
    if (coins.length === points && finishedPos.x == tilePos.x && finishedPos.y == tilePos.y){ //If it collides with the endBlock
        console.log("Winner!");
        level = 4;
        VictorySound.setVolume(0.3);
        VictorySound.play();


        //Clear everything when level complete
        player = null; //
        realPrevMusicTime = 0;
        realMusicTime = 0;
        realStartTime = 0;
        oldMusicRate = 1; // not perfect. fixes some situations.
        isStartTime = false;
        x2wait = 0; 
        x2t = 0;
        x2temp = -rectWidth; //
        y2 = 575; //
        i = 0; //
        finishLine = []; //
        coins = []; //
        blocks = []; //
        endblock = null; //
        moveWidth = 0; //
        moveHeight = 0; //
        points = 0; //
        backgroundColor = 250; //
        tint(backgroundColor) //
        playerAttempts = 3; //
        beatColorBoolean = false; //
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
        coinSound.stop();
        PlayerJumpSound.stop();
        //*/

        playerCounter = 0; //
        // enemyMovingX = 0; //Incrment 60 for moving;
        // enemyMoveMaxLockX = false; //Lock the increment and decrement back to its original position
        //flipBoolean = false; //

        // enemyMovingY = 0; //Incrment 60 for moving;
        // enemyMoveMaxLockY = false; //Lock the increment and decrement back to its original position
        //flipbooleany = false; //

    }
}
function failed(){
    //console.log("Winner!");
    //Clear everything when level complete
    player = null; //
    realPrevMusicTime = 0;
    realMusicTime = 0;
    realStartTime = 0;
    oldMusicRate = 1; // not perfect. fixes some situations.
    isStartTime = false;
    x2t = 0;
    x2temp = -rectWidth; //
    x2wait = 0; //
    y2 = 575; //
    i = 0; //
    finishLine = []; //
    coins = []; //
    blocks = []; //
    endblock = null; //
    moveWidth = 0; //
    moveHeight = 0; //
    // enemy = []; //
    // enemy2 = []; //
    points = 0; //
    backgroundColor = 250; //
    tint(backgroundColor) //
    playerAttempts = 3; //
    beatColorBoolean = false; //
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
    coinSound.stop();
    PlayerJumpSound.stop();
    //*/

    playerCounter = 0; //
    // enemyMovingX = 0; //Incrment 60 for moving;
    // enemyMoveMaxLockX = false; //Lock the increment and decrement back to its original position


    // enemyMovingY = 0; //Incrment 60 for moving;
    // enemyMoveMaxLockY = false; //Lock the increment and decrement back to its original position

    //flipBoolean = false; //
    //flipbooleany = false; //

    //Do not record the time if failed
    masterModeTimer = false;
    easyModeTimer = false; 
    normalModeTimer = false; 
    hardModeTimer = false; 
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------



//--------------------------------------------------------------------LEVEL Intermission => Actual Level-------------------------------------------------------------------------------
//Transition to different levels. Used in a button
function intermissionSetup(_level, _button, _sound) {
    level = _level;
    _button.show();
    //*/Sounds//
    if (IntermissionThemeSwitch === false && !_sound.isPlaying()){
    	_sound.setVolume(0.3);
    	_sound.play();
	_sound.loop();
	IntermissionThemeSwitch = true;
    }

    ButtonSound.setVolume(1);
    ButtonSound.play();
    //*/
}

//-------------EASY-----------------
function easyLevel() {
    level = 1;
    //*/Sounds//
    easySound.stop();

    ButtonSound.setVolume(1);
    ButtonSound.play();
    //*/
}
function easyIntermission(){
    intermissionSetup(0.5, buttonStart, easySound);
}
//----------------------------------

//-------------NORMAL---------------
function normalLevel() {
    level = 2;
    //*/Sounds//
    normalSound.stop();

    ButtonSound.setVolume(1);
    ButtonSound.play();
    //*/
}
function normalIntermission(){
    intermissionSetup(1.5, button2Start, normalSound);
}
//----------------------------------

//---------------HARD---------------
function hardLevel() {
    level = 3;
    //*/Sounds//
    hardSound.stop();

    ButtonSound.setVolume(1);
    ButtonSound.play();
    //*/
}
function hardIntermission(){
    intermissionSetup(2.5, button3Start, hardSound);
}
//----------------------------------



//-------------MASTER---------------
function masterLevel() {
    level = 6;
    //*/Sounds//
    masterSound.stop();

    ButtonSound.setVolume(1);
    ButtonSound.play();
    //*/
}
function masterIntermission(){
    intermissionSetup(5.5, button4Start, masterSound);
}
//----------------------------------


//Show the audio throughout all Difficulty Levels
function visualAudio(){
    let vol = amplitude.getLevel();
  
    volHistory.push(vol);
  
    if(volHistory.length > width*1) volHistory.splice(0,1); //width map
  
    stroke('cyan');
    noFill();
    beginShape();
    for(let i=0; i<volHistory.length; i++) {
        let y = map(volHistory[i], 0, 1, height/2, 0); //position map
        vertex(i, y);
    }
    endShape();
  
    stroke(11, 37, 52);
    line(volHistory.length, 0, volHistory.length, height);
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



//----------------------------------------------------------------BUTTON HIDE AND SHOW--------------------------------------------------------------
function mainMenu(){
    volHistory = [] //Reset the visual for music
    level = 0; //Main Menu
    buttonW.hide();
    buttonRetry.hide();
    buttonBack.hide();
    resetEnemies();
    //Temporary for now
    if (easyModeTimer === true){
        if (easyworldRecord > timer || easyworldRecord === null){
            easyworldRecord = timer;
        }
    }else if (normalModeTimer === true){
        if (normalworldRecord > timer || normalworldRecord === null){
            normalworldRecord = timer;
        }
    }else if (hardModeTimer === true){
        if (hardworldRecord > timer || hardworldRecord === null){
            hardworldRecord = timer;
        }
    }else if (masterModeTimer === true){
        if (masterworldRecord > timer || masterworldRecord === null){
            masterworldRecord = timer;
        }
    }
    easyModeTimer = false; 
    normalModeTimer = false; 
    hardModeTimer = false; 
    masterModeTimer = false;
    timer = 0;
    //-----------------
    ButtonSound.setVolume(1);
    ButtonSound.play();
}

function mainMenuRetry(){
    volHistory = [] //Reset the visual for music
    level = levelRetry; //Retry the level
    buttonW.hide();
    buttonRetry.hide();
    buttonBack.hide();
    resetEnemies();
    //Temporary for now
    if (easyModeTimer === true){
        if (easyworldRecord > timer || easyworldRecord === null){
            easyworldRecord = timer;
        }
    }else if (normalModeTimer === true){
        if (normalworldRecord > timer || normalworldRecord === null){
            normalworldRecord = timer;
        }
    }else if (hardModeTimer === true){
        if (hardworldRecord > timer || hardworldRecord === null){
            hardworldRecord = timer;
        }
    }else if (masterModeTimer === true){
        if (masterworldRecord > timer || masterworldRecord === null){
            masterworldRecord = timer;
        }
    }

    easyModeTimer = false; 
    normalModeTimer = false; 
    hardModeTimer = false; 
    masterModeTimer = false;
    timer = 0;
    //-----------------
    ButtonSound.setVolume(1);
    ButtonSound.play();
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
function buttonHideW(){ //Not used?
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

function resetEnemies(){
    enemyJ = [];
    lvl2EnemyFlag = false;
    lvl3EnemyFlag = false;
    lvl4EnemyFlag = false;
    lockPattern = false;
    lockPatternUsed = false;
    
    
    enemyMovePattern = 0;
}

//---------------------------------------------------------LEVEL DESIGN-------------------------------------------------------------------

//Shows all the levels on screen when button is clicked!
function level1(){ //Done
    finishLine[0] = 540;
    finishLine[1] = 240;
    
    //randomCoinX = random([30, 90, 150, 210, 270, 330, 390, 450, 510, 570]);
    //randomCoinY = random([30, 90, 150, 210, 270, 330, 390, 450, 510, 570]);
    

    //coins display
    //I am not sure why the loop needs to be here
    //since it will not work if there is no loop here.

    //Best guess: It requires to update in a scope scene since
    //The player needs to collect the coins and the coins will position
    //else where.
    while(i != 1){
        coins[0] = new Coins(90, 90, random(0,3));
        coins[1] = new Coins(150, 390, random(0,3));
        coins[2] = new Coins(570, 90, random(0,3));
        coins[3] = new Coins(570, 510, random(0,3));
        i++;
    }

    //The blocks does not need a loop since it is in a static position
    //Points boarder (Coins)
    blocks[0] = new Block(30, 30);
    blocks[1] = new Block(90, 30);
    blocks[2] = new Block(150, 30);



    //Borders [30, 90, 150, 210, 270, 330, 390, 450, 510, 570]
    blocks[3] = new Block(30, 210);
    blocks[4] = new Block(30, 330);
    blocks[5] = new Block(90, 330);
    blocks[6] = new Block(150, 330);
    blocks[7] = new Block(210, 330);
    blocks[8] = new Block(390, 330);
    blocks[9] = new Block(450, 330);
    blocks[10] = new Block(510, 330);
    blocks[11] = new Block(570, 330);

    blocks[12] = new Block(90, 210);
    blocks[13] = new Block(150, 210);
    blocks[14] = new Block(210, 210);
    blocks[15] = new Block(390, 210);

    blocks[16] = new Block(450, 210);
    blocks[17] = new Block(510, 210);
    blocks[18] = new Block(570, 210);

    blocks[19] = new Block(210, 390);
    blocks[20] = new Block(210, 450);
    blocks[21] = new Block(150, 450);
    blocks[22] = new Block(90, 450);

    blocks[23] = new Block(390, 390);
    blocks[24] = new Block(390, 510);

    blocks[25] = new Block(330, 390);
    blocks[26] = new Block(510, 510);
    blocks[27] = new Block(510, 450);

    //Borders [30, 90, 150, 210, 270, 330, 390, 450, 510, 570]
    blocks[28] = new Block(390, 150);
    blocks[29] = new Block(210, 150);
    blocks[30] = new Block(210, 30);
    blocks[31] = new Block(90, 150);

    blocks[32] = new Block(570, 150);
    blocks[33] = new Block(390, 90);



    //The goal line
    endBlock = new FinishBlock(finishLine[0], finishLine[1]);

    //We time the player
    easyModeTimer = true;
    if (frameCount % 60 == 0 && timer >= 0) {
        timer++;
    }

}


let lvl2EnemyFlag = false;
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
    if(!lvl2EnemyFlag){
        //reorganized them based on y level
        enemyJ[0] = new EnemyJ(6, 10, "right", "horizontal");
        enemyJ[1] = new EnemyJ(2, 8, "right", "horizontal");
        enemyJ[2] = new EnemyJ(1, 5, "right", "horizontal");
        enemyJ[3] = new EnemyJ(5, 2, "right", "horizontal");
        lvl2EnemyFlag = true;
    }
    // enemy[0] = new Enemy(30, 330); //1, 5
    // enemy[1] = new Enemy(270, 510); //5, 2
    // enemy[2] = new Enemy(90, 150); //2, 8
    // enemy[3] = new Enemy(330, 30); //6, 10
    


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

    blocks[18] = new Block(390, 270);
    blocks[19] = new Block(390, 330);
    blocks[20] = new Block(390, 390);
    blocks[21] = new Block(390, 450);
    blocks[22] = new Block(390, 210);

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

    //We time the player
    normalModeTimer = true;
    if (frameCount % 60 == 0 && timer >= 0) {
        timer++;
    }


}


let lvl3EnemyFlag = false;
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
    if(!lvl3EnemyFlag){
        //reorganized them based on y level
        enemyJ[0] = new EnemyJ(1, 7, "right", "horizontal");
        enemyJ[1] = new EnemyJ(6, 7, "right", "horizontal");
        enemyJ[2] = new EnemyJ(4, 7, "down", "vertical");
        enemyJ[3] = new EnemyJ(8, 7, "down", "vertical");
        enemyJ[4] = new EnemyJ(5, 3, "right", "horizontal");
        lvl3EnemyFlag = true;
    }

    // enemy[0] = new Enemy(270, 450); //5, 3
    // enemy[1] = new Enemy(30, 210); //1, 7 
    // enemy[2] = new Enemy(330, 210); //6, 7

    // // vertical enemies
    // enemy2[0] = new Enemy(210, 210); //4, 7
    // enemy2[1] = new Enemy(450, 210); //8, 7


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

    //We time the player
    hardModeTimer = true;
    if (frameCount % 60 == 0 && timer >= 0) {
        timer++;
    }


}


let lvl4EnemyFlag = false;
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

    if(!lvl4EnemyFlag){
        //reorganized them based on y level
        enemyJ[0] = new EnemyJ(9, 10, "down", "vertical");
        enemyJ[1] = new EnemyJ(4, 10, "right", "horizontal");
        enemyJ[2] = new EnemyJ(5, 8, "down", "vertical");
        enemyJ[3] = new EnemyJ(1, 8, "right", "horizontal");
        enemyJ[4] = new EnemyJ(9, 6, "down", "vertical");
        enemyJ[5] = new EnemyJ(4, 2, "right", "horizontal");


        lvl4EnemyFlag = true;
    }


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
    //Enemy display
    for (var i = 0; i < enemyJ.length; i++){
        enemyJ[i].display();
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



function playJumpSound() {
    PlayerJumpSound.setVolume(0.4);
    PlayerJumpSound.play();
    pressByBeat = 'red';
}




//Moving correlates to Canvas size. Ex: If Canvas is 600x600, then the
//block moves 60. 500x500 is 50, etc.
function keyPressed() {
    if(player != null){
        // if (key === "p") {
        //     isPaused = !isPaused;
        //     // console.log(`(p Pressed) offset f musicobj: ${easySound.currentTime() - realMusicTime}`)
        // }
        // if (isPaused) return;
        
        switch (key) {
            case "w":
            case "i":
                player.face("up");
                player.move(0, 1);
                playJumpSound();
                break;
            case "a":
            case "j":
                player.face("left");
                player.move(-1, 0);
                playJumpSound();
                break;
            case "s":
            case "k":
                player.face("down");
                player.move(0, -1);
                playJumpSound();
                break;
            case "d":
            case "l":
                player.face("right");
                player.move(1, 0);
                playJumpSound();
                break;
        }
    }
    
}
//---------------------------------------------------------LEVEL DESIGN-------------------------------------------------------------------









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
    constructor(startPosX, startPosY, facing){
        this.facingOLD = 0;
        this.facing = facing;
        this.xy = tileAt(startPosX,startPosY);
        this.currentTile = {x: startPosX, y: startPosY};
        this.x = this.xy.x;
        this.y = this.xy.y;
        this.playerCounter = playerCounter;
        this.prevX = this.x;
        this.prevY = this.y;
        this.playerWidth = 50;
        this.playerHeight = 82;
        this.currentImg;
    }

    //Show the character in a certain direction
    display(){
        this.showImg(this.facing);
    }
    showImg(str){
        let offsetX = tileSize*0.5-this.playerWidth*0.5;
        let offsetY = (this.y+tileSize)-(this.y + this.playerHeight);
        
        if (!beatColorBoolean){
            fill(255, 204, 0, 120);
        }else{
            fill(100, 120);
        }
        rect(this.x, this.y, width / 10, height / 10);

        if(str === "right"){
            this.currentImg = playerAnimation[6];
        }
        if(str === "up"){
            this.currentImg = playerAnimation[3];
            offsetY = (this.y+tileSize +3)-(this.y + this.playerHeight);
        }
        if(str === "left"){
            this.currentImg = playerAnimation[9];
        }
        if(str === "down"){
            this.currentImg = playerAnimation[0];
            offsetY = (this.y+tileSize +3)-(this.y + this.playerHeight);
        }
        image(this.currentImg, this.x+offsetX, this.y+offsetY);
    }

    face(str){
        this.facing = str;
    }

    move(x, y){
        let tileRequested = {x: this.currentTile.x + x, y: this.currentTile.y + y}
        if(!this.isBlocked(tileRequested.x, tileRequested.y)){
            this.xy = tileAt(tileRequested.x, tileRequested.y);
            this.currentTile = {x: tileRequested.x, y: tileRequested.y};
            this.x = this.xy.x;
            this.y = this.xy.y;
            this.collectCoin();
        }
        //finished();
    }

    isBlocked(x, y){
        if(x<1 || x>10 || y<=1 || y>10){
            return true;
        }
        let tileRequested = tileAt(x, y);
        let tilePos = {x: tileRequested.x+tileSize*0.5, y: tileRequested.y+tileSize*0.5};
        for (var i = 0; i < blocks.length; i++){
            let blockPos = {x: blocks[i].rpos, y: blocks[i].rpos2};
            if (blockPos.x == tilePos.x && blockPos.y == tilePos.y){
                return true;
            }
        }
        return false;
    }

    collectCoin(){
        let tilePos = {x: this.x+tileSize*0.5, y: this.y+tileSize*0.5};
        for (var i = 0; i < coins.length; i++){
            let coinPos = {x: coins[i].rpos, y: coins[i].rpos2};
            if (coinPos.x == tilePos.x && coinPos.y == tilePos.y){
                coins[i].rpos = 1;
                coins[i].rpos2 = 1;
                points++;
                coinSound.setVolume(0.2);
                coinSound.play();
            }
        }
    }

}
//-----------------------------------------------------------------------------------------------------------------





//-------------------------------------------------------ENEMY CLASS-----------------------------------------------
class EnemyJ{
    constructor(startPosX, startPosY, facing, dir){
        //dir is which way the enemy will be moving: horizontal or vertical
        //facing is which way the enemy is facing upon startup: left, right, up, or down

        /*NOTE:
            Having opposite parameters will result in only the enemy image change and NO movement
            ex: EnemyJ(3, 5, "left", "vertical");
            result: every 5 beats, the image will turn around, but stay in place
            
            RULE OF THUMB:
                "left" and "right" belongs with "horizontal"
                "up" and "down" belongs to "vertical"
        */
        this.imgLeft = guard[13];
        this.imgRight = guard[14];
        this.imgUp = guard[15];
        this.imgDown = guard[12];
        this.currentImg;
        this.img1;
        this.img2;
        this.dir = dir;
        this.currentTile = {x: startPosX, y: startPosY};
        this.xy = tileAt(startPosX,startPosY);
        this.x = this.xy.x;
        this.y = this.xy.y;
        //height and width are based on pixels of the png
        this.enemyHeight = 89;
        this.enemyWidth = 50;

        this.moveX = 0;
        this.moveY = 0;
        
        //Sets up how the enemy starts and moves
        if(facing === "right" || facing === "left"){
            this.moveX = facing === "right"? 1:-1;
            this.img1 = facing === "right"? this.imgRight:this.imgLeft;
            this.img2 = facing === "right"? this.imgLeft:this.imgRight;
        }else if(facing === "up" || facing === "down"){
            this.moveY = facing === "up"? 1:-1;
            this.img1 = facing === "up"? this.imgUp:this.imgDown;
            this.img2 = facing === "up"? this.imgDown:this.imgUp;
        }
        this.currentImg = this.img1;
    }

    display(){
        let offsetX = tileSize*0.5-this.enemyWidth*0.5;
        let offsetY = (this.y+tileSize)-(this.y + this.enemyHeight);
        if(this.dir === "horizontal"){
            if(enemyMovePattern < 5){
                this.move(this.moveX, 0);
                this.currentImg = this.img1;
            }else{
                //enemy flips and goes opposite (horizontal) direction
                this.move(-this.moveX, 0);
                this.currentImg = this.img2;
            }
        }else if(this.dir === "vertical"){
            if(enemyMovePattern < 5){
                this.move(0, this.moveY);
                this.currentImg = this.img1;
            }else{
                //enemy flips and goes opposite (vertical) direction
                this.move(0, -this.moveY);
                this.currentImg = this.img2;
            }
        }
        image(this.currentImg, this.x+offsetX, this.y+offsetY);

        //Detect if player collides with enemy
        let playerPos = {x: player.x, y: player.y};
        if (this.x == playerPos.x && this.y == playerPos.y){
            level = 5; //Mission Failed
            FailSound.setVolume(0.3);
            FailSound.play();
        }
    }

    move(x, y){
        if(!lockPattern){
            return;
        }
        let tileRequested = {x: this.currentTile.x + x, y: this.currentTile.y + y}
        this.xy = tileAt(tileRequested.x, tileRequested.y);
        this.currentTile = {x: tileRequested.x, y: tileRequested.y};
        this.x = this.xy.x;
        this.y = this.xy.y;

    }
    
}


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
    constructor(){
        this.__x2 = 0;
        this.tempoChange = 0;

        // music tempos
        this.easyTempo = [ 
            [0, 133.8], // 133.7 - 133.9 (it's possible this is wrong)
            // sends -999 signal to restart song at duration
            [easySound.duration() || -1, -999],
        ]
        this.normalTempo = [
            [0, 212.67], // (212.63, 212.7)
            [normalSound.duration() - 21.267, -998],
            [normalSound.duration() || -1, -999],
        ]
        this.hardTempo = [
            [0, 175],
            [11.4, 185],
            [18.2, 205.07], // (205, 205.1)
            [hardSound.duration(), -998], // 20.507 is too big (2 is temporarily there) guess
            [hardSound.duration() || -1, -999],
            // [-2, -998], // game will auto set these values
            // [0 || -1, -999],
        ]
        // New music: Super_Smash_Bros.mp3
        this.masterTempo = [
            [0, 236], // (236, 236.?) // tempo might be changing
            [masterSound.duration() - 2, -998],
            [masterSound.duration() || -1, -999],
        ]
    }

    displayDetector(){
        fill('black');
        rect(0, 540, 600 ,60); //Whole bar
        fill(pressByBeat);
        rect(470, 540, 80 , 60); //Beat detector?
        // now see if distance between two is less than sum of two radius'

        //Show player attempts on the bar
        fill('gold');
        textSize(50);
        text(playerAttempts, 496, 590);

        //Are you in sync?
        //*/Debug/
        this.beatSync();
        //*/

        if (pressByBeat === 'red'){
            pressByBeat = 500;
        }


        //-----Enemy moving in the X and Y-------
        if (lockPattern) {
            lockPattern = false;
            lockPatternUsed = true;
        }else if(x2[0] <= 530 || x2[0] > 560) {
            lockPattern = false;
            lockPatternUsed = false;
        }else if(!lockPatternUsed) { 
            enemyMovePattern = (enemyMovePattern+1)%8;
            if(enemyMovePattern == 0){
                enemyMovePattern = 8;
            }
            lockPattern = true; // only should be true once per red cube cycle
        }


    }

    beatSync(){

        // x2temp = -rectWidth;
        // x2[0] = -rectWidth;
        // x2[1] = -rectWidth;
        // x2[2] = -rectWidth;
        // x2[3] = -rectWidth;
        // x2[4] = -rectWidth;
        // x2[5] = -rectWidth;

        beatColorBoolean = (x2[0] > 540 || x2[0] < 470) && (x2[1] > 540 || x2[1] < 470) && (x2[2] > 540 || x2[2] < 470) && (x2[3] > 540 || x2[3] < 470) && (x2[4] > 540 || x2[4] < 470) && (x2[5] > 540 || x2[5] < 470)
        if (pressByBeat === 'red'){
            if ((x2[0] > 540 || x2[0] < 470) && (x2[1] > 540 || x2[1] < 470) && (x2[2] > 540 || x2[2] < 470) && (x2[3] > 540 || x2[3] < 470) && (x2[4] > 540 || x2[4] < 470) && (x2[5] > 540 || x2[5] < 470)){ //If you miss the beat
                backgroundColor -= 50;
                playerAttempts -= 1;
                y2 -= 12;
            }else{
                console.log("Perfect!");
            }
        }

        if (playerAttempts === 0){
            level = 5;
            FailSound.setVolume(0.3);
            FailSound.play();
        }
    }


    displayMainMenu(){ //Shows a Cop and a Thief Running
        noStroke();
        //rect(xMainMenu, yMainMenu, rectWidthMainMenu, rectHeightMainMenu);
        image(playerAnimation[12], xMainMenu - 550, yMainMenu - 53, 0, 0);
        textSize(20);
        fill('white');
        text("Now playing: 2+2=5 8-bit (By RGYDK)", xMainMenu - 500, 575);
        //rect(xMainMenu, yMainMenu, rectWidthMainMenu, rectHeightMainMenu);
        image(guard[14], xMainMenu - 650, yMainMenu - 60, 0, 0);

        //Cop and Robber running (Funny decoration)
        image(playerAnimation[12], xMainMenuRobber, yMainMenu - 53, 0, 0);
        image(guard[14], xMainMenuCop - 100, yMainMenu - 60, 0, 0);

        if(xMainMenu > width + 700) {
            xMainMenu = -rectWidthMainMenu - 1000;
        }
        if(xMainMenuRobber > width + 100) {
            xMainMenuRobber = -rectWidthMainMenu - 1000;
        }
        if(xMainMenuCop > width + 110) {
            xMainMenuCop = -rectWidthMainMenu - 700;
        }


        xMainMenu+=2; //Change when needed

        xMainMenuCop+=2.5;
        xMainMenuRobber+=3;
    }

    x2calculate(offset){
        for (let i = 0; i < x2.length; i++) {
            x2[i] = i * 100 + offset;
        }
        console.log(x2);
    }

    x2tNoSkip(x2check, realTempo, _offset = 0){
        // if 0 (or false), use previous value
        // remove x2check by x2wait when audioContext is not 0
        if (realTempo === 0) {
            x2t = 0;
            return;
        }

        if (x2check === 0) {
            x2t = realTempo / 60;
            x2wait += x2t;
//            if (x2wait > 80) {
//            }
        } else {

            if (x2wait === 0) {
                x2t = x2check;
            } else {
                x2t = x2check - x2wait;
                // if (x2wait > 22) {
                //    console.log(`laggier waiting: x2wait=${x2wait} original x2t=${x2check}`)
                // }
                x2wait = 0;
            }
        }
    }

    restartMusic(restartThis, txt = `Restarting music... tempoChange: ${this.tempoChange}`) {
        console.log(txt);
        isStartTime = false;
        restartThis.stop();
    }

    //Rhythm beat based on speed of the cube
    displayLevelSetup(musicLevel, _x2, musicOffset = -23){
        
        // console.log("p5js: " + musicLevel.currentTime());
        // console.log("js: " + getAudioContext().currentTime);
        // p5js currentTime() is a bit jittery.
            // 1. Cubes are gone and reappear for short gists of time when switching songs. Not usable.
            // 2. When using it the first time, the cubes for short periods of times switch to a very different position; about 80 secounds foreward and back.
            // 3. When AFK, the cubes disappear for some time. Don't know why.
        if (isStartTime) {

            if (typeof this.tempoChange === "undefined") {
                return this.restartMusic(false, "WARNING: tempoChange is undefined. Restarting...");
            }

            realPrevMusicTime = realMusicTime;
            realMusicTime = getAudioContext().currentTime * musicRate - realStartTime;
            if (!isPaused && pauseTime === 0) {

                // Experimental feature. Changable in browser console.
                // It will probably stop working in the future
                // I especially like 1.5 speed in Master mode
                // Currently out of sync on music restart.
                // For some reason decreasing musicRate breaks the cubes right now.
                // Workaround for above: Set musicRate to 0.5 when song starts. Offset out of sync though.
                if (musicRate !== oldMusicRate) {
                    oldMusicRate = musicRate;
                    musicLevel.rate(musicRate);
                    console.log("jump to realMusicTime or 0 (scary), whichever is bigger. realMusicTime=" + realMusicTime);
                    if (realMusicTime > 0) {
                        musicLevel.jump(realMusicTime);
                    } else {
                        musicLevel.jump(0);
                    }
                }
            }

            // if (isPaused) {
// Postponed du to audio losing sync offset after pause
            //    if (pauseTime === 0) {
            //        // pauseTime = realMusicTime; // -0.06 - -0.07, -0.12 - -0.13
            //        // p5js is about -0.07 seconds behind every pause,
            //        // so sync with p5js duration
            //        // MAIN pauseTime = musicLevel.currentTime() * musicRate;
            //        pauseTime = realMusicTime; // - (musicLevel.currentTime() - realStartTime);
            //        // offset is very messy pauseTime = getAudioContext().currentTime * musicRate;

            //        musicLevel.pause();
            //        console.log(`(Paused) realMusicTime vs realMusicTime after pause: ${realMusicTime} vs ${(getAudioContext().currentTime * musicRate - realStartTime)} `)
            //        console.log(`(Paused) offset f musicobj: ${musicLevel.currentTime() - realMusicTime}`) // realStartTime: ${realStartTime} realMusicTime: ${realMusicTime} realPrevMusicTime: ${realPrevMusicTime} pauseTime: ${pauseTime}`);
            //        // console.log(x2);

            //    }
            //    // console.log(`(isPaused) realStartTime: ${realStartTime} realMusicTime: ${realMusicTime} realPrevMusicTime: ${realPrevMusicTime} pauseTime: ${pauseTime}`);
            //    
            //    console.log(`(isPaused): ${musicLevel.currentTime()}`) // realStartTime: ${realStartTime} realMusicTime: ${realMusicTime} realPrevMusicTime: ${realPrevMusicTime} pauseTime: ${pauseTime}`);
            //    background(0, 0, 0, 128);
            //    fill('cyan');
            //    textSize(50);
            //    textAlign(CENTER);
            //    text("Mission Paused", boardSize*0.5, boardSize*0.5);
            //    textSize(20);
            //    text("Pause screen is experimental. Use at your own risk.", boardSize*0.5, boardSize*0.5 + 35);
            //    textAlign(LEFT, BASELINE); // default textAlign
            //    // console.log(`(isPaused) realStartTime: ${realStartTime} realMusicTime: ${realMusicTime} realPrevMusicTime: ${realPrevMusicTime} pauseTime: ${pauseTime}`);
            //    return;
            // } else if (!isPaused && pauseTime !== 0) {
            //    // realMusicTime -= pauseTime;
            //    // maybe w/ live multiplayer? --> realStartTime -= realMusicTime - pauseTime;
            //    
            //    //console.log(`realStartTime: ${realStartTime} realMusicTime: ${realMusicTime} realPrevMusicTime: ${realPrevMusicTime} pauseTime: ${pauseTime}`);
            //    //console.log(`realMusicTime - pausedTime: ${realMusicTime} - ${pauseTime}`);
            //    
            //    // let pauseDuration = realMusicTime - pauseTime
            //    // let pauseLag = musicLevel.currentTime() - pauseTimeLag
            //    // let pauseLag = musicLevel.currentTime() - pauseTime
            //    let pauseDuration = realMusicTime - pauseTime; // not used rn except console log will error
            //    // let pauseDuration = -(musicLevel.currentTime() - realMusicTime); // not used rn except console log will error
            //    
            //    realStartTime += pauseDuration;
            //    realMusicTime -= pauseDuration;
            //    realPrevMusicTime -= pauseDuration;
            //    // realStartTime += pauseLag;
            //    // realMusicTime -= pauseLag;
            //    // realPrevMusicTime -= pauseLag;
            //    //
            //    // console.log(`(Resumed) pauseDuration: ${pauseDuration} oldPauseDuration: ${realMusicTime - pauseTime}`);
            //    // console.log(`(Resumed) x2 values below; pauseTimeLag: ${pauseTimeLag} realStartTime: ${realStartTime} realMusicTime: ${realMusicTime} realPrevMusicTime: ${realPrevMusicTime} pauseDuration: ${pauseDuration}`);
            //    console.log(x2);
            //    pauseTime = 0;
            //    // musicLevel.jump(realMusicTime);
            //    musicLevel.play();
            //    console.log(`(Resumed) offset f musicobj: ${musicLevel.currentTime() - realMusicTime}`) // realStartTime: ${realStartTime} realMusicTime: ${realMusicTime} realPrevMusicTime: ${realPrevMusicTime} pauseTime: ${pauseTime}`);
            // } else {
            //     console.log(`offset f musicobj: ${musicLevel.currentTime() - realMusicTime}`) // realStartTime: ${realStartTime} realMusicTime: ${realMusicTime} realPrevMusicTime: ${realPrevMusicTime} pauseTime: ${pauseTime}`);
            // }

            if (!isPaused && (this.tempoChange + 1 < _x2.length) && (realMusicTime >= _x2[this.tempoChange + 1][0])) {
                this.tempoChange++;
                console.log(`new tempo! ${this.tempoChange}`);
                
                if (_x2[this.tempoChange][1] === -999) {
                    this.restartMusic(musicLevel);
                } 
        //  } else {
        //      console.log("this should never be called from now on since it loops");
            }
        } else {
            isStartTime = true;

            // rarely: musicLevel.duration() can return 0
            if (_x2[_x2.length - 1][0] === -1) {
                isStartTime = false;
                let durationFix = musicLevel.duration() || -1;
                _x2[_x2.length - 2][0] += durationFix;
                _x2[_x2.length - 1][0] = durationFix;
                console.log(`Failed to set song length earlier. Value now set to ${durationFix}`)
                return;
            }
            console.log(`Restarted song. realMusicTime: ${realMusicTime} startTime: ${realStartTime} musicOffset: ${musicOffset} tempoChange: ${this.tempoChange}`);
            musicLevel.rate(musicRate);
            
            this.tempoChange = 0;
            this.x2calculate(musicOffset); // x start positions
            realStartTime = getAudioContext().currentTime;
            musicLevel.play();

            realPrevMusicTime = 0;
            realMusicTime = 0;
        }

        let tempo = _x2[this.tempoChange][1]


        noStroke();
        fill('cyan'); //The beat that allow the Guard to move
        if (tempo !== -998) { // regular loop
            // speed of cube (maybe change speed to position in future)
            this.x2tNoSkip((realMusicTime - realPrevMusicTime) * tempo * musicRate, tempo);
            // in theory: this.x2tNoSkip(x2totalTime * tempo, tempo, musicOffset);
            
            rect(x2[0], y2, rectWidth, rectHeight);
            if(x2[0] > widthMinusCube){
                rect(x2temp, y2, rectWidth, rectHeight);
                x2temp+=x2t;
                // console.log(_x2[0][1])
            }

            fill('red'); //Red boxes
            if((x2[1] > widthMinusCube) || (x2[2] > widthMinusCube) || (x2[3] > widthMinusCube) || (x2[4] > widthMinusCube) || (x2[5] > widthMinusCube)) {
                rect(x2temp, y2, rectWidth, rectHeight);
                x2temp+=x2t;
            }

            for (let i = 0; i < x2.length; i++) {
                if(x2[i] > width) {
                    x2[i] %= 600;
                    x2temp = -rectWidth;
                }
                x2[i]+=x2t;
            }

        } else { // towards end of song
            // speed of cube (maybe change speed to position in future)
            let realTempo = _x2[this.tempoChange - 1][1]
            // this.x2tNoSkip(x2totalTime * realTempo * musicRate, realTempo, musicOffset);
            this.x2tNoSkip((realMusicTime - realPrevMusicTime) * realTempo * musicRate, realTempo);
            rect(x2[0], y2, rectWidth, rectHeight);

            fill('red'); //Red boxes

            for (let i = 0; i < x2.length; i++) {
                x2[i]+=x2t; // replace with x2[i] = x2totalTime * x2[this.tempoChange][1] - offsetForLastTimeTempoChanged
            }
        }
        // x2totalDistance+=x2t;
        // x2totalTime=realMusicTime;
        // console.log(x2totalDistance + " t*60=" + x2totalTime * _x2[this.tempoChange][1]);

        for (let i = 1; i < x2.length; i++) {
            rect(x2[i], y2, rectWidth, rectHeight);
        }
    }

    // In web broswer console, paste this to jump to a part of the song:
    // Note: Cubes might be off. Doesn't even seem to follow the tempo if after a tempo change.
// let sxa = 95; let sxaSound = masterSound; sxaSound.jump(sxa); realMusicTime -= sxa;
    displayLevel1(){
        this.displayLevelSetup(easySound, this.easyTempo, -12);
    }

    displayLevel2(){
        this.displayLevelSetup(normalSound, this.normalTempo, -15);
    }

    displayLevel3(){
        this.displayLevelSetup(hardSound, this.hardTempo, -425);
    }

    displayLevel4(){
        this.displayLevelSetup(masterSound, this.masterTempo, -155);
    }
}
//-----------------------------------------------------------------------------------------------------------------

