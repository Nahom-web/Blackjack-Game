$$ = sel => document.querySelector(sel);

let metal = $$("#metal");
let currPic;
let clearMetals;
let imgArray = new Array(14);
function setUpMetals() {
    currPic = 0;
    for(let i = 0; i < imgArray.length; i++){
        imgArray[i] = new Image();
        imgArray[i].src = `./images/metals/metal${i}.png`;
    }
    clearMetals = setInterval(animateMetals, 100);
}

function animateMetals() {
    if(currPic === 13){
        clearInterval(clearMetals);
    }
    else
        currPic++;

    metal.src = imgArray[currPic].src;
}

window.addEventListener('load', setUpMetals);