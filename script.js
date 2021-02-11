let date = new Date();

let currentBg;

let fadeInStart;
let fadeOutStart;

let bg1 = document.getElementById(1);
let bg2 = document.getElementById(2);

let clock = document.getElementById("clock");
clock.innerHTML = addZero(date.getHours()) + ":" + addZero(date.getMinutes());

let quote = document.getElementById("text");
let author = document.getElementById("author");

function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

function randInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function fadeIn(timestamp) {
    if (fadeInStart === undefined)
        fadeInStart = timestamp;
    const elapsed = timestamp - fadeInStart;

    if (currentBg == 1) {
        bg2.style.opacity = Math.min(0.0005 * elapsed, 1);
    } else {
        bg1.style.opacity = Math.min(0.0005 * elapsed, 1);
    }

    if (elapsed < 2000) {
        window.requestAnimationFrame(fadeIn);
    } else {
        change();
        fadeInStart = undefined;
    }
}

function fadeOut(timestamp) {
    if (fadeOutStart === undefined)
        fadeOutStart = timestamp;
    const elapsed = timestamp - fadeOutStart;

    if (currentBg == 1) {
        bg1.style.opacity = 1 - Math.min(0.0005 * elapsed, 1);
    } else {
        bg2.style.opacity = 1 - Math.min(0.0005 * elapsed, 1);
    }

    if (elapsed < 2000) {
        window.requestAnimationFrame(fadeOut);
    } else {
        change();
        fadeOutStart = undefined;
    }
}

function change(start) {

    var imgName;
    var imgNum = randInt(1190);

    if (imgNum > 1190 || imgNum < 1) {
        imgNum = 1;
    }

    if (imgNum < 10) {
        imgName = "000" + imgNum;
    } else if (imgNum >= 10 && imgNum < 100) {
        imgName = "00" + imgNum;
    } else if (imgNum >= 100 && imgNum < 1000) {
        imgName = "0" + imgNum;
    } else {
        imgName = imgNum;
    }

    if (currentBg == 1 || start == 1) {
        bg1.style.backgroundImage = "url(/img/img_" + imgName + ".jpg)";
        // bg1.style.backgroundImage = "url(https://source.unsplash.com/random/3840x2160?random="+imgNum+")";
        
    } else {
        bg2.style.backgroundImage = "url(/img/img_" + imgName + ".jpg)";
        // bg2.style.backgroundImage = "url(https://source.unsplash.com/random/3840x2160?random="+imgNum+")";
    }

}

// Update to a random quote from the Quotable API
async function updateQuote() {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    if (response.ok) {
      quote.innerHTML = data.content;
      author.innerHTML = data.author;
    } else {
      quote.textContent = "An error occured";
      author.innerHTML = "A wise man";
    }
  }

function draw() {
    date = new Date();
    clock.innerHTML = addZero(date.getHours()) + ":" + addZero(date.getMinutes());

    requestAnimationFrame(fadeIn);
    requestAnimationFrame(fadeOut);
    if(currentBg == 1){
        currentBg = 0;
    }else{
        currentBg = 1;
    }
}

//change first backgrounds to random
change();
setTimeout(change(1),2000);

//change first quote to random
updateQuote(); 

setInterval(draw, 10000);

setInterval(updateQuote, 60000);