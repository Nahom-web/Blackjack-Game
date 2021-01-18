let canvasAnimation = document.querySelector("#basketball");
let content = canvasAnimation.getContext('2d');
document.documentElement.style.overflowX = 'hidden';
document.documentElement.style.overflowY = 'hidden';

let clearNetOne;
let clearNetTwo;
let clearTitle;
let clearBalls;
let clearRebound;
let clearKobe;

function setUp() {
    canvasAnimation.width = window.innerWidth;
    canvasAnimation.height = window.innerHeight - 50;
    clearNetOne = setInterval(basketballNetOne, 70);
} // setUp
window.addEventListener('load', setUp, false);

let currentY = 450;

let img = new Image();
function basketballNetOne() {
    img.src = `./images/basketballNetLeft.png`;
    // https://www.pexels.com/photo/shallow-focus-photography-of-black-metal-outdoor-basketball-hoop-860683/
    if (currentY === 30) {
        clearInterval(clearNetOne);
        img.addEventListener('load', function () {
            content.drawImage(img, -50, 30, 250, 300);
        }, false);
        clearNetTwo = setInterval(basketballNetTwo, 70);
    } else
        currentY -= 4;

    img.addEventListener('load', function () {
        content.clearRect(0, 0, canvasAnimation.width, canvasAnimation.height);
        content.drawImage(img, -50, currentY, 250, 300);
    }, false);
}

let imgTwo = new Image();
function basketballNetTwo() {
    imgTwo.src = `./images/basketballNetRight.png`;
    //https://www.pexels.com/photo/shallow-focus-photography-of-black-metal-outdoor-basketball-hoop-860683/
    if (currentY === 30) {
        clearInterval(clearNetTwo);
        content.drawImage(imgTwo, innerWidth - 195, 30, 200, 300);
        clearTitle = setInterval(movingTitle, 10);
    } else {
        currentY -= 4;
    }
    imgTwo.addEventListener('load', function () {
        content.clearRect(0, 0, 0, 0);
        content.drawImage(imgTwo, innerWidth - 195, currentY, 200, 300);
    }, false);
}

const dx = 2;
const sp = -800;
let cp = sp;

function movingTitle() {
    content.font = "40px 'Kaushan Script', cursive";
    if ((cp >= innerWidth / 3 - 150)) {
        clearInterval(clearTitle);
        clearBalls = setInterval(shootTheBalls, 20);
    } else {
        cp += dx;
    }
    content.clearRect(0, 0, canvasAnimation.width, canvasAnimation.height);
    content.drawImage(img, -50, 30, 250, 300);
    content.drawImage(imgTwo, innerWidth - 195, 30, 200, 300);
    content.fillText("KOBE WILL ALWAYS BE REMEMBERED!", cp, 30);
}

let ballX = innerWidth/2-40;
let ballY = 80;
let ballTwoX = innerWidth/2;
let ballTwoY = 80;

function shootTheBalls() {
    if (ballTwoX >= innerWidth - 120) {
        if(ballY >= 225){
            if(ballTwoY >= innerHeight-300) {
                clearInterval(clearBalls);
                clearRebound = setInterval(reboundHold, 10);
            }
            else{
                ballTwoY+=2;
            }
        }
        else{
            ballY+=2;
        }
    } else {
        ballX-=2;
        ballTwoX+=2;
    }

    content.clearRect(0, 30, canvasAnimation.width, canvasAnimation.height);
    content.drawImage(img, -50, 30, 250, 300);
    content.drawImage(imgTwo, innerWidth - 195, 30, 200, 300);

    content.beginPath();
    content.fillStyle = "black";
    content.arc(ballX, ballY, 25, 0, 2 * Math.PI);
    content.fill();
    content.stroke();
    content.closePath();

    content.beginPath();
    content.fillStyle = "white";
    content.arc(ballTwoX, ballTwoY, 25, 0, 2 * Math.PI);
    content.fill();
    content.stroke();
    content.closePath();
}

function reboundHold() {
    //right hand
    content.beginPath();
    content.moveTo(innerWidth-130, innerHeight-269);
    content.lineTo(innerWidth-90, innerHeight-285);
    content.fillStyle = "black";
    content.fill();
    content.stroke();
    content.closePath();

    content.beginPath();
    content.moveTo(innerWidth-130, innerHeight-269);
    content.lineTo(innerWidth-100, innerHeight -200);
    content.fillStyle = "black";
    content.fill();
    content.stroke();
    content.closePath();

    // left hand
    content.beginPath();
    content.moveTo(innerWidth-100, innerHeight -200);
    content.lineTo(innerWidth-170, innerHeight -170);
    content.fillStyle = "black";
    content.fill();
    content.stroke();
    content.closePath();

    content.beginPath();
    content.moveTo(innerWidth-170, innerHeight -170);
    content.lineTo(innerWidth-175, innerHeight -200);
    content.fillStyle = "black";
    content.fill();
    content.stroke();
    content.closePath();

    //body
    content.beginPath();
    content.moveTo(innerWidth-100, innerHeight -200);
    content.lineTo(innerWidth-100, innerHeight -110);
    content.fillStyle = "black";
    content.fill();
    content.stroke();
    content.closePath();

    // legs
    content.beginPath();
    content.moveTo(innerWidth-100, innerHeight -110);
    content.lineTo(innerWidth-130, innerHeight -67);
    content.fillStyle = "black";
    content.fill();
    content.stroke();
    content.closePath();

    content.beginPath();
    content.moveTo(innerWidth-100, innerHeight -110);
    content.lineTo(innerWidth-70, innerHeight -67);
    content.fillStyle = "black";
    content.fill();
    content.stroke();
    content.closePath();

    // head
    content.beginPath();
    content.moveTo(innerWidth-100, innerHeight -200);
    content.arc(innerWidth-90, innerHeight-220, 20, 0, 2 * Math.PI);
    content.fillStyle = "black";
    content.fill();
    content.stroke();
    content.closePath();

    clearInterval(clearRebound);
    clearKobe = setInterval(setUpKobe, 10);
}

function setUpKobe() {
    content.beginPath();
    content.moveTo(0, innerHeight - 67);
    content.lineTo(innerWidth-10, innerHeight-67);
    content.fillStyle = "black";
    content.fill();
    content.stroke();
    content.closePath();

    let kobeImage = new Image();
    kobeImage.src = "./images/kobe.png";
    //https://cdn.pixabay.com/photo/2020/02/11/07/56/kobe-bryant-4838672_960_720.png
    kobeImage.addEventListener('load', function () {
        content.drawImage(kobeImage, innerWidth / 2, innerHeight / 2, 200, 250);
    });
    let kobeReverseImage = new Image();
    kobeReverseImage.src = "./images/kobeReverse.png";
    //https://cdn.pixabay.com/photo/2020/02/11/07/56/kobe-bryant-4838672_960_720.png
    kobeReverseImage.addEventListener('load', function () {
        content.drawImage(kobeReverseImage, innerWidth / 2 - 200, innerHeight / 2, 200, 250);
    });

    clearInterval(clearKobe);
    setTimeout(skipToIntroPage, 10000);
}

function skipToIntroPage() {
    window.location = "intro.html";
}