/*/
Game Project
Rhythm Swipe

This game is protected under the AGPL-3.0 license.

Legends:
- //!!!: Variable restart in Finish or Failed function
/*/



//---------------Creating the Board-------------------
let boardSize = 600; //How big the board is; should not change

let boardXPos = 490;
let boardYPos = 101;

// From jQuery library source code. ty: https://stackoverflow.com/a/1038781
// Is this reliable enough?
let websiteSize = Math.min(
    Math.max( 
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    ), Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    ) - boardYPos
);

let xBoardSizeZoomed = 600; //How big the board is; changed based on zoom // this variable == width
for (let finalSize = 4800; finalSize >= 75; finalSize/=2) { // max resolution: 4800x4800px
    if (finalSize <= websiteSize) {
        xBoardSizeZoomed = finalSize;
        break;
    } else if (finalSize*0.75 <= websiteSize) {
        xBoardSizeZoomed = finalSize*0.75;
        break;
    }
}
let yBoardSizeZoomed = xBoardSizeZoomed; // this variable == height

document.querySelector("section").style.height = yBoardSizeZoomed + "px";

let tileSize = boardSize/10; //The grid
let boardZoom = xBoardSizeZoomed / boardSize;
//----------------------------------------------------



//----------------------MainMenu----------------------
let BackgroundImage; //Main menu background
var NPCS; 
let rectWidthMainMenu = 30*boardZoom;
let rectHeightMainMenu = 500*boardZoom;

//Characters in the Main Menu (Decoration)
let xMainMenu = rectWidthMainMenu; 

let xMainMenuCop = rectWidthMainMenu; 
let xMainMenuRobber = rectWidthMainMenu; 

let yMainMenu = 575*boardZoom;

//Audio for the Main Menu
let MainMenuTheme;
let MainMenuThemeSwitch = false;

let IntermissionThemeSwitch = false;
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
let keysDebounce = new Set();
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

//---------Time for cubes and music-------------------
let realPrevMusicTime = 0.0; //!!!
let realMusicTime = 0.0; //!!!
let isStartTime = false; //!!!
let realStartTime = 0.0; //!!!

let oldMusicRate = 1; //!!!
let musicRate = 1;

let firstCubeTimestamp = 0.0;

//---------Touches-----------------------------------
let displayMobileText = "";
let oldClientX = 0;
let oldClientY = 0;
let clientX = 0;
let clientY = 0;
let clientDirX = 0;
let clientDirY = 0;
let clientDirMax = true;

//---------The position of red cubes------------------
let x2waitTravel = boardZoom / 60; // if there's a new frameCount, update this
let x2wait = 0.0; //!!!falls back to fps if audioContext == 0. could be improved
            
let x2t = 0.0; //!!!
let x2totalDistance = 0.0;
let x2totalTime = 0.0;
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
let buttonTouchInput;

let pixelFont;
//--------------------------------------------------------------------
var messageError = document.getElementById("Error");
let resizeLock = false;

//--------------------------------------------------------------PRELOAD----------------------------------------------------------------------------
function preload() {

    //Font(s)
    //https://www.fontspace.com/pixeloid-font-f69232
    pixelFont = loadFont('asset/PixeloidSans-mLxMm.ttf');

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




//----ZOOMED SETUP----
function imageZoomed(img, xPos, yPos, xSize, ySize) {
    image(img, xPos * boardZoom, yPos * boardZoom, xSize * boardZoom, ySize * boardZoom);
}

function rectZoomed(xPos, yPos, xSize, ySize) {
    rect(xPos * boardZoom, yPos * boardZoom, xSize * boardZoom, ySize * boardZoom);
}

function textZoomed(txt, x=0, y=0) {
    text(txt, x * boardZoom, y * boardZoom);
}

function textSizeZoomed(n) {
    textSize(Math.max(n * boardZoom, 9));
}

function createTemplateButton(txt/*, properties*/) {
    let tempButton = createButton(txt);
    
    // minimum font 9px
    tempButton.style('font-size', Math.max((18 * boardZoom), 9) + 'px');

    tempButton.style('cursor', 'pointer');
    tempButton.size(200 * boardZoom, 75 * boardZoom);
    return tempButton;
}

//--------------------------------------------------------------------SETUP---------------------------------------------------------------------------------
//Creation of the Canvas, the buttons, and the sounds
function setup() {
    //Center the game on the page

    let div = createCanvas(xBoardSizeZoomed, yBoardSizeZoomed);
    div.position(-1, boardYPos); // X does nothing with horizontal below
    div.center('horizontal');
    div.style("border", "5px solid cyan");
    //
    // //Check to see if it supports the game
    // if ((windowWidth <= 620)){
    //     level = -2;
    //     messageError.style.display = "block";
    //     resizeLock = true;
    //     div.hide();
    // }else if ((windowWidth > 620) && resizeLock === true){
    //     level = -1;
    //     messageError.style.display = "none";
    //     resizeLock = false;
    //     div.show();
    // }

    //StartGame
    background("darkgray");
    if (redrawLock !== false){
        return;
    }
    StartGameButton = createTemplateButton('Start');
    StartGameButton.style('color', 'blueviolet');
    // minimum font 10px
    StartGameButton.style('border', 5*boardZoom + 'px solid cyan');
    StartGameButton.mousePressed(mainMenu); //Goes to Main Menu


    //-------------Back button-----------
    buttonBack = createTemplateButton('Back');
    buttonBack.style('color', 'black');
    buttonBack.style('border', 5*boardZoom + 'px solid cyan');
    buttonBack.mousePressed(mainMenu); //Goes to Main Menu
    //-----------------------------------

    //-----------Easy Button-------------
    button = createTemplateButton('💎 Easy 💎');
    button.style('color', 'green');
    // button.style('font-size', '18px');
    button.style('border', 5*boardZoom + 'px solid green');
    button.mousePressed(easyIntermission); //Goes to Intermission

    buttonStart = createTemplateButton('Start');
    buttonStart.style('color', 'green');
    buttonStart.style('border', 5*boardZoom + 'px solid green');
    buttonStart.mousePressed(easyLevel); //Play Easy Mode
    //-----------------------------------

    //-----------Normal Button-----------
    button2 = createTemplateButton('💎💎 Normal 💎💎');
    button2.style('color', 'orange');
    button2.style('border', 5*boardZoom + 'px solid orange');
    button2.mousePressed(normalIntermission); //Goes to Intermission

    button2Start = createTemplateButton('Start');
    button2Start.style('color', 'orange');
    button2Start.style('border', 5*boardZoom + 'px solid orange');
    button2Start.mousePressed(normalLevel); //Play Normal Mode
    //-----------------------------------

    //------------Hard button------------
    button3 = createTemplateButton('💰 Hard 💰');
    button3.style('color', 'red');
    button3.style('border', 5*boardZoom + 'px solid red');
    button3.mousePressed(hardIntermission); //Goes to Intermission

    button3Start = createTemplateButton('Start');
    button3Start.style('color', 'red');
    button3Start.style('border', 5*boardZoom + 'px solid red');
    button3Start.mousePressed(hardLevel); //Play Hard Mode
    //------------------------------------

    //-----------Master button (Used to see the High Score)----------
    button4 = createTemplateButton('💰👑 Master 👑💰');
    button4.style('color', 'blueviolet');
    button4.style('border', 5*boardZoom + 'px solid blueviolet');
    button4.mousePressed(masterIntermission); //Goes to Intermission

    button4Start = createTemplateButton('Start');
    button4Start.style('color', 'blueviolet');
    button4Start.style('border', 5*boardZoom + 'px solid blueviolet');
    button4Start.mousePressed(masterLevel); //Play Master Mode
    //-----------------------------------------------------------------


    //---------Return button (For Finish and Fail level)---------------
    buttonW = createTemplateButton('Return');
    buttonW.style('color', 'black');
    buttonW.style('border', 5*boardZoom + 'px solid cyan');

    buttonW.mousePressed(mainMenu); //Main menu
    buttonW.hide();

    //-----------------------------------------------------------------

    //---------Retry button (For Fail level)---------------
    buttonRetry = createTemplateButton('Retry');
    buttonRetry.style('color', 'black');
    buttonRetry.style('border', 5*boardZoom + 'px solid cyan');
    buttonRetry.style('cursor', 'pointer');

    buttonRetry.mousePressed(mainMenuRetry); //Main menu
    buttonRetry.hide();

    //-----------------------------------------------------------------

    //----------Touch Input Button----------------
    buttonTouchInput = createButton("will be invisible later");
    buttonTouchInput.style('font-size', Math.max((18 * boardZoom), 9) + 'px');

    //-----------------------------------------------------------------

    //----------------------Music Related------------------------------
    amplitude = new p5.Amplitude();

    cubeDetector = new Cube();
    cubeBeat = new Cube();
    //-----------------------------------------------------------------
    redrawLock = true;

}
//----------------------------------------------------------------------------------------------------------------------------------------------------------








//--------------------------------------------------------------------DRAW----------------------------------------------------------------------------------
function draw(){

    

    textFont(pixelFont);
    StartGameButton.position(250*boardZoom, boardYPos+255.5*boardZoom);
    StartGameButton.center('horizontal');

    button.position(0, boardYPos+136.66*boardZoom);
    // This is visible barely button.position(0, 237.66*boardZoom*boardZoom);
    button.center('horizontal');

    button2.position(250, boardYPos+223*boardZoom);
    // button2.position(250, 324); // subtract literal by boardYPos, then *
    button2.center('horizontal');

    button3.position(250, boardYPos+308.7*boardZoom);
    button3.center('horizontal');

    button4.position(250, boardYPos+397.6*boardZoom);
    button4.center('horizontal');

    buttonStart.position(250, boardYPos+368*boardZoom);
    buttonStart.center('horizontal');

    button2Start.position(250, boardYPos+368*boardZoom);
    button2Start.center('horizontal');
 
    button3Start.position(250, boardYPos+368*boardZoom);
    button3Start.center('horizontal');

    button4Start.position(250, boardYPos+368*boardZoom);
    button4Start.center('horizontal');


    buttonBack.position(250, boardYPos+451*boardZoom);
    buttonBack.center('horizontal');
    buttonW.position(250, boardYPos+489*boardZoom);
    buttonW.center('horizontal');

    buttonRetry.position(250, boardYPos+404*boardZoom);
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
            image(StartBackgroundImage, 0, 0, xBoardSizeZoomed, yBoardSizeZoomed);
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
                MainMenuTheme.setVolume(0.4);
                MainMenuTheme.loop();
                MainMenuThemeSwitch = true;
                console.log("play")
                realStartTime = getAudioContext().currentTime;
            }
            //*/
            //background('black');
            tint(200);
            image(BackgroundImage, 0, 0, xBoardSizeZoomed, yBoardSizeZoomed);
            showNPC(); //A nice seeing of a cop running to the robber
            fill('cyan');
            textSizeZoomed(43);
            textZoomed("R h y t h m  S w i p e", 77, 100);

            //*/VERSION/
            textSizeZoomed(15);
            fill("white");
            textZoomed("Alpha v2.0.0", 5, 15);

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
            image(MusicBackgroundImage, 0, 0, xBoardSizeZoomed, yBoardSizeZoomed);
            //background('gray');
            buttonHide();
            //Show the Start and Back button
            buttonBack.show();
            buttonStart.show();
            fill('white');
            textSizeZoomed(25);
            textZoomed("Difficulty: Easy", 25, 100);
            textSizeZoomed(15);
            textZoomed("Music: A Punch Up at a Wedding 8-bit", 25, 150);
            textZoomed("By RGYDK", 25, 200);

            if (easyworldRecord === null){
                textZoomed("Personal Best: ???", 20, 570);
            }else{
                //Display appropriate Trophy (Need Refining)
                if (easyworldRecord <= 100){
                    textZoomed("Personal Best: "+easyworldRecord+"s", 20, 570);
                    tint(230);
                    imageZoomed(trophies[0], 215, 50, 75, 75);
                }else if (easyworldRecord > 100 && easyworldRecord < 150){
                    textZoomed("Personal Best: "+easyworldRecord+"s", 20, 570);
                    tint(230);
                    imageZoomed(trophies[1], 215, 50, 75, 75);
                }else{
                    textZoomed("Personal Best: "+easyworldRecord+"s", 20, 570);
                    tint(230);
                    imageZoomed(trophies[2], 215, 50, 75, 75);
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
            image(LevelBackgroundImage, 0, 0, xBoardSizeZoomed, yBoardSizeZoomed);
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
            image(MusicBackgroundImage, 0, 0, xBoardSizeZoomed, yBoardSizeZoomed);
            //background('gray');
            buttonHide();
            buttonBack.show();
            button2Start.show();
            fill('white');
            textSizeZoomed(25);
            textZoomed("Difficulty: Normal", 25, 100);
            textSizeZoomed(15);
            textZoomed("Music: There There 8-bit", 25, 150);
            textZoomed("By RGYDK", 25, 200);

            if (normalworldRecord === null){
                textZoomed("Personal Best: ???", 20, 570);
            }else{
                //Display appropriate Trophy (Need Refining)
                textZoomed("Personal Best: "+normalworldRecord+"s", 20, 570);
                tint(230);
                if (normalworldRecord <= 100){
                    imageZoomed(trophies[0], 245, 50, 75, 75);
                }else if (normalworldRecord > 100 && normalworldRecord < 150){
                    imageZoomed(trophies[1], 245, 50, 75, 75);
                }else{
                    imageZoomed(trophies[2], 245, 50, 75, 75);
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
            image(LevelBackgroundImage, 0, 0, xBoardSizeZoomed, yBoardSizeZoomed);
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
            image(MusicBackgroundImage, 0, 0, xBoardSizeZoomed, yBoardSizeZoomed);
            //background('gray');
            buttonHide();
            buttonBack.show();
            button3Start.show();
            fill('white');
            textSizeZoomed(25);
            textZoomed("Difficulty: Hard", 25, 100);
            textSizeZoomed(15);
            textZoomed("Music: Where I End and You Begin 8-bit", 25, 150);
            textZoomed("By RGYDK", 25, 200);

            if (hardworldRecord === null){
                textZoomed("Personal Best: ???", 20, 570);
            }else{
                //Display appropriate Trophy (Need Refining)
                textZoomed("Personal Best: "+hardworldRecord+"s", 20, 570);
                tint(230);
                if (hardworldRecord <= 100){
                    imageZoomed(trophies[0], 214, 50, 75, 75);
                }else if (hardworldRecord > 100 && hardworldRecord < 150){
                    imageZoomed(trophies[1], 214, 50, 75, 75);
                }else{
                    imageZoomed(trophies[2], 214, 50, 75, 75);
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
            image(LevelBackgroundImage, 0, 0, xBoardSizeZoomed, yBoardSizeZoomed);
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
            image(MissionSuccessBackground, 0, 0, xBoardSizeZoomed, yBoardSizeZoomed);

            fill('cyan');
            textSizeZoomed(42);
            textAlign(CENTER, BASELINE);
            textZoomed("M i s s i o n  S u c c e s s", boardSize/2, 100);
            textAlign(LEFT, BASELINE);

            //Timers
            if (easyModeTimer === true){
                textZoomed("Finish Time: "+timer+"s", boardSize/5, 200);
                if (easyworldRecord > timer || easyworldRecord === null){
                    textAlign(CENTER, BASELINE);
                    textZoomed("New High Score!", boardSize/2, 300);
                }else{
                    textSizeZoomed(25);
                    textZoomed("Personal Best: "+easyworldRecord+"s", boardSize/12, 300);
                }
            }else if (normalModeTimer === true){
                textZoomed("Finish Time: "+timer+"s", boardSize/5, 200);
                if (normalworldRecord > timer || normalworldRecord === null){
                    textAlign(CENTER, BASELINE);
                    textZoomed("New High Score!", boardSize/2, 300);
                }else{
                    textSizeZoomed(25);
                    textZoomed("Personal Best: "+normalworldRecord+"s", boardSize/12, 300);
                }
            }else if (hardModeTimer === true){
                textZoomed("Finish Time: "+timer+"s", boardSize/5, 200);
                if (hardworldRecord > timer || hardworldRecord === null){
                    textAlign(CENTER, BASELINE);
                    textZoomed("New High Score!", boardSize/2, 300);
                }else{
                    textSizeZoomed(25);
                    textZoomed("Personal Best: "+hardworldRecord+"s", boardSize/12, 300);
                }
            }else if (masterModeTimer === true){
                textZoomed("Finish Time: "+timer+"s", boardSize/5, 200);
                if (masterworldRecord > timer || masterworldRecord === null){
                    textAlign(CENTER, BASELINE);
                    textZoomed("New High Score!", boardSize/2, 300);
                }else{
                    textSizeZoomed(25);
                    textZoomed("Personal Best: "+masterworldRecord+"s", boardSize/12, 300);
                }
            }else{
                tint(255);
                image(OtherImg[2], 102*boardZoom, 115*boardZoom, 400*boardZoom, 300*boardZoom);
            }
            //----


            textAlign(LEFT, BASELINE);
            buttonW.show();
            buttonHide();
            break;
        case 5: //Mission Failed
            //background('#D9544D');
            tint(100);
            image(MissionFailedBackground, 0, 0, xBoardSizeZoomed, yBoardSizeZoomed);
            fill('red');
            textSizeZoomed(42);
            textAlign(CENTER, BASELINE);
            textZoomed("M i s s i o n  F a i l e d", boardSize/2, 100);

            textAlign(LEFT, BASELINE); // default textAlign
            tint(255);
            image(OtherImg[1], 51*boardZoom, 115*boardZoom, 498*boardZoom, 278*boardZoom); // this needs to not rely on default size .. unless there's another way
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
            image(MusicBackgroundImage, 0, 0, xBoardSizeZoomed, yBoardSizeZoomed);
            //background('gray');
            buttonHide();
            buttonBack.show();
            button4Start.show();
            fill('white');
            textSizeZoomed(25);
            textZoomed("Difficulty: Master", 25, 100);
            textSizeZoomed(15);
            textZoomed("Music: Galeem and Dharkon (8-Bit Remix) - Super Smash Bros. Ultimate", 25, 150);
            textZoomed("By Tater-Tot Tunes", 25, 200);
            if (masterworldRecord === null){
                textZoomed("Personal Best: ???", 20, 570);
            }else{
                //Display appropriate Trophy (Need Refining)
                textZoomed("Personal Best: "+masterworldRecord+"s", 20, 570);
                tint(230);
                if (masterworldRecord <= 100){
                    imageZoomed(trophies[0], 245, 50, 75, 75);
                }else if (masterworldRecord > 100 && masterworldRecord < 150){
                    imageZoomed(trophies[1], 245, 50, 75, 75);
                }else{
                    imageZoomed(trophies[2], 245, 50, 75, 75);
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
            image(MasterModeBackgroundImage, 0, 0, xBoardSizeZoomed, yBoardSizeZoomed);
            //background(backgroundColor);
            levelRetry = level;

            level4();
            board();
            level4Beat();
            finished(); //Might change
            break;
        //-------------------------------------------
    }

    textSizeZoomed(20);
    textZoomed(displayMobileText, 100, 100);

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
        _sound.loop(); // implicitly calls .play()
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
  
    if(volHistory.length > boardSize*1) volHistory.splice(0,1); //width map
  
    stroke('cyan');
    noFill();
    beginShape();
    for(let i=0; i<volHistory.length; i++) {
        let y = map(volHistory[i], 0, 1, yBoardSizeZoomed/2, 0); //position map
        vertex(i*boardZoom, y);
    }
    endShape();
  
    stroke(11, 37, 52);
    line(volHistory.length*boardZoom, 0, volHistory.length*boardZoom, yBoardSizeZoomed);
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
    for (var x = 0; x < xBoardSizeZoomed; x += xBoardSizeZoomed / 10) {
        for (var y = 0; y < yBoardSizeZoomed; y += yBoardSizeZoomed / 10) {
            stroke(0);
            strokeWeight(1.5);
            line(x, 0, x, yBoardSizeZoomed);
            stroke(110);
            strokeWeight(1.5);
            line(x + 1.5, 0, x + 1.5, yBoardSizeZoomed);

            stroke(0);
            strokeWeight(1.5);
            line(0, y, xBoardSizeZoomed, y);
            stroke(110);
            strokeWeight(1.5);
            line(0, y +1.5, xBoardSizeZoomed, y +1.5);

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
    rectZoomed(0, 0, 180, 60);
    fill('cyan');
    textSizeZoomed(33);
    textZoomed(" Jewels: "+points, 0, 45);


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
    if(player == null){
        return;
    }
    // if (key === "p") {
    //     isPaused = !isPaused;
    //     // console.log(`(p Pressed) offset f musicobj: ${easySound.currentTime() - realMusicTime}`)
    // }
    // if (isPaused) return;

    switch (key) {
        case "w":
        case "i":
            if (keysDebounce.has(1)) break;
            keysDebounce.add(1);
            player.face("up");
            player.move(0, 1);
            playJumpSound();
            break;
        case "a":
        case "j":
            if (keysDebounce.has(2)) break;
            keysDebounce.add(2);
            player.face("left");
            player.move(-1, 0);
            playJumpSound();
            break;
        case "s":
        case "k":
            if (keysDebounce.has(3)) break;
            keysDebounce.add(3);
            player.face("down");
            player.move(0, -1);
            playJumpSound();
            break;
        case "d":
        case "l":
            if (keysDebounce.has(4)) break;
            keysDebounce.add(4);
            player.face("right");
            player.move(1, 0);
            playJumpSound();
            break;
    }
    
}

function touchEnded(e) {
    // Bug: Pressing "Start" counts as a touch
    // If you are below the canvas, ignore touches
    if (e.layerY > (boardYPos + yBoardSizeZoomed) || realPrevMusicTime === 0) {
        // console.log(e.layerY);
        return;
    }
    
 // e.clientX returns undefined on mobile devices I've tested
    clientX = e.layerX;
    clientY = e.layerY;

    displayMobileText = "direction cords: old:" + oldClientX + " " + oldClientY + " new:" + clientX + " " + clientY;
    
    clientDirX = clientX * 2 / xBoardSizeZoomed - 1;
    clientDirY = clientY * 2 / yBoardSizeZoomed - 1;
    clientDirMax = Math.max(Math.abs(clientDirX), Math.abs(clientDirY));

    // if (clientDirMax < 10*boardZoom) {
    //     return;
    // }

    clientDirX /= clientDirMax;
    clientDirY /= clientDirMax;

    displayMobileText += "\ndirection: " + clientDirX + " " + clientDirY;
    
// try this with the timing in between triggering cube deletion instead of rn?
    // nah. that's too complex for no real benefit
    if (clientDirX > clientDirY) {
        if (clientDirX > -clientDirY) {
            if (keysDebounce.has(4)) return;
            keysDebounce.add(4);
            console.log("right");
            player.face("right");
            player.move(1, 0);
            playJumpSound();
        } else {
            if (keysDebounce.has(1)) return;
            keysDebounce.add(1);
            console.log("up");
            player.face("up");
            player.move(0, 1);
            playJumpSound();
        }
    } else {
        if (clientDirX > -clientDirY) {
            if (keysDebounce.has(3)) return;
            keysDebounce.add(3);
            player.face("down");
            player.move(0, -1);
            playJumpSound();
            console.log("down");
        } else {
            if (keysDebounce.has(2)) return;
            keysDebounce.add(2);
            player.face("left");
            player.move(-1, 0);
            playJumpSound();
            console.log("left");
        }
    }

    // todo: sensitivity, test irl

    console.log("direction: " + clientDirX + " " + clientDirY);
    console.log(e)
    // StartGameButton.html("The touchEnded! " + event);
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
        rect(this.x*boardZoom, this.y*boardZoom, xBoardSizeZoomed / 10, yBoardSizeZoomed / 10);

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
        imageZoomed(this.currentImg, this.x+offsetX, this.y+offsetY, 50, 82);
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
        //yBoardSizeZoomed and xBoardSizeZoomed are based on pixels of the png
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
        imageZoomed(this.currentImg, this.x+offsetX, this.y+offsetY, 50, 89);

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
        imageZoomed(diamonds[round(this.random)], this.rpos - 22, this.rpos2 - 20, 45, 43);
        //below will display the same on 600x600 width and height for sure
        //ellipse(this.rpos, this.rpos2, xBoardSizeZoomed / 20, yBoardSizeZoomed / 16); //Outer circle
        //ellipse(this.rpos, this.rpos2, xBoardSizeZoomed / 40, yBoardSizeZoomed / 25); //Inner circle
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
        rect((this.rpos - 20)*boardZoom, (this.rpos2 - 20)*boardZoom, xBoardSizeZoomed / 15, yBoardSizeZoomed / 15); //Outer circle
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
        rect((this.rpos + 10)*boardZoom, (this.rpos2 + 10)*boardZoom, xBoardSizeZoomed / 15, yBoardSizeZoomed / 15); //Outer circle
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
            [easySound.duration() || -1, -999],
        ]
        this.normalTempo = [
            [0, 212.67], // (212.63, 212.7)
            [normalSound.duration() - 21.267, -998],
            [normalSound.duration() || -1, -999],
        ]
        this.hardTempo = [
            // Basics: If it's not a signal, it's a tempo.
            // If blue cube detection is needed, must be on index 0 (-997)
            [2.6, -997], 
            [0, 175],
            [11.4, 185],
            [18.2, 205.07], // (205, 205.1)
            // below must be in -1 and optionally -2 index with respective
            // signal number (-999: restart song and -998: end visible cubes)
            [hardSound.duration(), -998], // 20.507 is too big (2 is temporarily there) guess
            [hardSound.duration() || -1, -999],
            // [-2, -998], // game will auto set these values
            // [0 || -1, -999],
        ]
        // New music: Super_Smash_Bros.mp3
        this.masterTempo = [
            [0.4, -997],
            [0, 236], // (236, 236.?) // tempo might be changing
            [masterSound.duration() - 2, -998],
            [masterSound.duration() || -1, -999],
        ]

        // // Future structure? Should it be stored in Cube, new class
        // (MusicMan.setSong(), etc.) or globally? Worth the time?
        //
        // this.currentSong = this.musicData.easy
        // this.musicData = [
        //     easy = new Map([
        //         // maps are unordered, nested lists are ordered. don't use maps in this case
        //         tempo = [
        //             [0, 133.8],
        //             [(easySound.duration() || -1), 133.8],
        //         ],
        //         signals = /*new Map(*/[
        //             [-997, 0], // start of song (for blue cube detection)
        //             [-998, easySound.duration() - 0], // -998 could be named "endBeats" instead
        //             [-999, easySound.duration() || -1], // -999 could be named "endRestart" instead
        //         ]/*)*/,
        //         title = "",
        //     ]),
        // ]
    }

    displayDetector(){
        fill('black');
        rectZoomed(0, 540, 600, 60); //Whole bar
        fill(pressByBeat);
        rectZoomed(470, 540, 80, 60); //Beat detector?
        // now see if distance between two is less than sum of two radius'

        //Show player attempts on the bar
        fill('gold');
        textSizeZoomed(50);
        textZoomed(playerAttempts, 496, 590);

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
        }else if((x2[0] <= -70 || (x2[0] <= 530 && x2[0] > -40) || x2[0] > 560) && firstCubeTimestamp < realMusicTime){
            // displayDetector is in a different instance ... oof.
            // console.log(` && ${this.firstCubeTimestamp} < ${realMusicTime}`);

            // if (_x2[this.tempoChange][1] == 0) { // wrong value probably
            //     console.log("nahhh");
            // }
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
            let killMe = true;
            let j = 0;
            for (j = 0; j < x2.length; j++){
                if (x2[j] <= 540 && x2[j] >= 470){ //If you miss the beat
                    killMe = false;
                    break;
                }
            }
            if (killMe){
                backgroundColor -= 50;
                playerAttempts -= 1;
                y2 -= 12;
            }else{
                console.log("Perfect!");
                x2[j] -= boardSize;
            }
        }else{
            console.log("Still perfect!");
        }

        if (playerAttempts === 0){
            level = 5;
            FailSound.setVolume(0.3);
            FailSound.play();
        }
    }


    displayMainMenu(){ //Shows a Cop and a Thief Running
        noStroke();
        //rectZoomed(xMainMenu, yMainMenu, rectWidthMainMenu, rectHeightMainMenu);
        image(playerAnimation[12], xMainMenu - 550*boardZoom, yMainMenu - 53*boardZoom, 50*boardZoom, 83*boardZoom); // NPC #3
        textSizeZoomed(20);
        fill('white');
        // textZoomed("Now playing: 2+2=5 8-bit (By RGYDK)", xMainMenu - 500, 575);
        text("Now playing: 2+2=5 8-bit (By RGYDK)", xMainMenu - 500*boardZoom, yMainMenu);
        //rectZoomed(xMainMenu, yMainMenu, rectWidthMainMenu, rectHeightMainMenu);
        image(guard[14], xMainMenu - 650*boardZoom, yMainMenu - 60*boardZoom, 50*boardZoom, 89*boardZoom);

        //Cop and Robber running (Funny decoration)
        image(playerAnimation[12], xMainMenuRobber, yMainMenu - 53*boardZoom, 50*boardZoom, 83*boardZoom);
        image(guard[14], xMainMenuCop - 100*boardZoom, yMainMenu - 60*boardZoom, 50*boardZoom, 89*boardZoom);

        if(xMainMenu > xBoardSizeZoomed + 700*boardZoom) {
            xMainMenu = -rectWidthMainMenu - 1000*boardZoom;
        }
        if(xMainMenuRobber > xBoardSizeZoomed + 100*boardZoom) {
            xMainMenuRobber = -rectWidthMainMenu - 1000*boardZoom;
        }
        if(xMainMenuCop > xBoardSizeZoomed + 110*boardZoom) {
            xMainMenuCop = -rectWidthMainMenu - 700*boardZoom;
        }


        xMainMenu+=2*boardZoom; //Change when needed

        xMainMenuCop+=2.5*boardZoom;
        xMainMenuRobber+=3*boardZoom;
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
            x2t = x2waitTravel * realTempo;
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
        if (isStartTime) {

            if (typeof this.tempoChange === "undefined")
                return this.restartMusic(false,
                    "WARNING: tempoChange is undefined. Restarting...");

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
// Postponed//  to audio losing sync offset after pause
            //     if (pauseTime === 0) {
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
            //    textSizeZoomed(50);
            //    textAlign(CENTER);
            //    textZoomed("Mission Paused", boardSize*0.5, boardSize*0.5);
            //    textSizeZoomed(20);
            //    textZoomed("Text zoom not working.Pause screen is experimental. Use at your own risk.", boardSize*0.5, boardSize*0.5 + 35)
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

            if (_x2[0][1] === -997) {
                firstCubeTimestamp = _x2[0][0];
                this.tempoChange++;
                // console.log(` new tempo! ${this.tempoChange}`);
            }
            console.log(`Restarted song. firstCubeTimestamp ${firstCubeTimestamp} realMusicTime: ${realMusicTime} startTime: ${realStartTime} musicOffset: ${musicOffset} tempoChange: ${this.tempoChange}`);
            musicLevel.rate(musicRate);

            this.tempoChange = 0;
            this.x2calculate(musicOffset); // x start positions
            realStartTime = getAudioContext().currentTime;
            musicLevel.play();

            realPrevMusicTime = 0;
            realMusicTime = 0;
        }

        keysDebounce.clear()
        let tempo = _x2[this.tempoChange][1]


        noStroke();
        fill('cyan'); //The beat that allow the Guard to move
        if (tempo !== -998) { // regular loop
            // speed of cube (maybe change speed to position in future)
            this.x2tNoSkip((realMusicTime - realPrevMusicTime) * tempo * musicRate, tempo);
            // in theory: this.x2tNoSkip(x2totalTime * tempo, tempo, musicOffset);
            
            rectZoomed(x2[0], y2, rectWidth, rectHeight);
            if(x2[0] > widthMinusCube){
                rectZoomed(x2temp, y2, rectWidth, rectHeight);
                x2temp+=x2t;
                // console.log(_x2[0][1])
            } else if((x2[1] > widthMinusCube) || (x2[2] > widthMinusCube) || (x2[3] > widthMinusCube) || (x2[4] > widthMinusCube) || (x2[5] > widthMinusCube)) {
                fill('red'); //Red boxes
                rectZoomed(x2temp, y2, rectWidth, rectHeight);
                x2temp+=x2t;
            }
            fill('red');

            for (let i = 0; i < x2.length; i++) {
                if(x2[i] > boardSize) {
                    x2[i] %= boardSize;
                    x2temp = x2[i] - rectWidth;
                    // x2temp = -rectWidth*boardZoom;
                }
                x2[i]+=x2t;
            }

        } else { // towards end of song
            // speed of cube (maybe change speed to position in future)
            let realTempo = _x2[this.tempoChange - 1][1]
            // this.x2tNoSkip(x2totalTime * realTempo * musicRate, realTempo, musicOffset);
            this.x2tNoSkip((realMusicTime - realPrevMusicTime) * realTempo * musicRate, realTempo);
            rectZoomed(x2[0], y2, rectWidth, rectHeight);

            fill('red'); //Red boxes

            for (let i = 0; i < x2.length; i++) {
                x2[i]+=x2t; // replace with x2[i] = x2totalTime * x2[this.tempoChange][1] - offsetForLastTimeTempoChanged
            }
        }
        // x2totalDistance+=x2t;
        // x2totalTime=realMusicTime;
        // console.log(x2totalDistance + " t*60=" + x2totalTime * _x2[this.tempoChange][1]);

        for (let i = 1; i < x2.length; i++) {
            rectZoomed(x2[i], y2, rectWidth, rectHeight);
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

