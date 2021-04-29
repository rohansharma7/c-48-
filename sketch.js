var trail, trailImage;
var snake, snakeImage;
var hawkImage, hawkGroup, hawk, fox, foxGroup, foxImage;
var mouseImage, mouseGroup, mouse;
var END=0;
var PLAY=1;
var gameState = PLAY;
var score;
var dieSound, foodSound;

function preload()
{
    trailImage = loadImage("dirt.png");

    snakeImage = loadImage("snake3.png");

    hawkImage = loadImage("hawk.png");

    foxImage = loadImage("fox2.png");

    mouseImage = loadImage("mouse.png");

    dieSound = loadSound("gameover.wav")
    foodSound = loadSound("point.wav")
}

function setup() 
{
    
    createCanvas(displayWidth,displayHeight);

    trail = createSprite(900,450,1500,900,);
    trail.addImage(trailImage);
   trail.scale = 2;
   trail.y=trail.width/2;
   trail.velocityY=-4;

    snake = createSprite(1000,800,50,60);
    snake.addImage(snakeImage);
    snake.scale = 0.3;

    hawkGroup = new Group();
    mouseGroup = new Group();
    foxGroup = new Group();
    
    score = 0;
}

function draw() 
{ 

   if(gameState === PLAY)
   {
    if(trail.y<100)
    {
        trail.y=trail.width/2;
    }

    if(keyDown(RIGHT_ARROW))
    {
        snake.x = snake.x + 20;
    }

    if(keyDown(LEFT_ARROW))
    {
        snake.x = snake.x - 20;
    }

    if(hawkGroup.isTouching(snake))
    {
        dieSound.play();
        gameState = END;
    }

    if(foxGroup.isTouching(snake))
    {
        dieSound.play();
        gameState = END;
    }

    if(mouseGroup.isTouching(snake))
    {
        score = score + 5;
        mouseGroup.destroyEach();
        foodSound.play();
    }

    if(score > 50)
    {
        spawnFox();
    }

    spawnHawk();
    spawnMouse();

    drawSprites();

   
   }
   else if(gameState === END)
   {
    trail.velocityY = 0;
    snake.visible = false;

    hawkGroup.destroyEach();
    mouseGroup.destroyEach();
    foxGroup.destroyEach();

    drawSprites();

    textSize(100);
    fill("black");
    text("GAMEOVER", 550, 400);

   }

    textSize(40);
    fill("black");
    text("score:" + score, 100, 100);
    
    
  
}

function spawnHawk()
{
    if(frameCount % 50 === 0)
    {
        var hawk = createSprite(750,350,50,50);
        hawk.x = random(0,1500);
        hawk.addImage(hawkImage);
        hawk.scale = 0.3;
        hawk.velocityY = 10;
        hawk.lifetime = 300;
        hawkGroup.add(hawk);
    }
}

function spawnFox()
{
    if(frameCount % 50 === 0)
    {
        var fox = createSprite(750,150,50,50);
        fox.x = random(0,1500);
        fox.addImage(foxImage);
        fox.scale = 0.8;
        fox.velocityY = 10;
        fox.lifetime = 300;
        foxGroup.add(fox);
    }
}

function spawnMouse()
{
    if(frameCount % 75 === 0)
    {
        var mouse = createSprite(750,350,50,50);
        mouse.x = random(0,1500);
        mouse.addImage(mouseImage);
        mouse.scale = 0.3;
        mouse.velocityY = 10;
        mouse.lifetime = 300;
        mouseGroup.add(mouse);
    }
}

