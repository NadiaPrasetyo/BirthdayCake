/**
 * Function to process the form
*/
function process () {
    let nameText = document.getElementById("name").value;
    let dobText = document.getElementById("dob").value;
    let e = document.getElementById("flavour");
    let flavourText = e.options[e.selectedIndex].text;
    let messageText = document.getElementById("message").value;
    
    // test flag to overwrite validname and validbirthday
    /** @todo change this to false */
    const test = true;
    
    if ((validname(nameText) && validbirthday(dobText)) || test) {
        // change animation to slide out
        let card = document.getElementById("Card");
        card.style.animation = "slideOut 2s";
        card.style.animationFillMode = "forwards";
    } else {
        invalidAnim();
    }

    
    // make the form not restart the page
    event.preventDefault();
    
    
    let cake = document.getElementById("cake");
    cake.addEventListener("click", addCandle);
    
    // Flavor the cake
    flavorCake(flavourText);
    ageCandles();
}

/**
 * Function to add the candles with the amount of age the person is turning
*/


async function ageCandles() {
    // calculate the age
    let dobText = document.getElementById("dob").value;
    let dob = new Date(dobText);
    let today = new Date();
    let age = today.getFullYear() - dob.getFullYear();

    // calculate the spread of the candles depending on the age
    let spread = 300 / age;

    let cakeRect = cake.getBoundingClientRect();


    for (let i = 0; i < age; i++) {
        let candle = document.createElement("div");
        candle.classList.add("candle");
        let flame = document.createElement("div");
        flame.classList.add("flame");
        let candleTop = document.createElement("div");
        candleTop.classList.add("candleTop");
        let candleBottom = document.createElement("div");
        candleBottom.classList.add("candleBottom");

        candle.appendChild(flame);
        candle.appendChild(candleTop);
        candle.appendChild(candleBottom);

        // add the candle to the cake at the position of the click
        candle.style.position = "absolute";
        // adjust the position of the candle by x
        candle.style.left = (spread * i) + "px";
        // make the top position of the candle random between the top and bottom of the cake
        // separate the cke to 3 horizontal layers, with the first and last layer random from 0 to 25, the middle layer from 0 to 45
        let y = Math.floor(Math.random() *40) - 40;
        if (spread * i < 50 || spread * i > 250){
            // random between -15 and -25
            y = Math.floor(Math.random() *10) - 25;
        }

        let yPos = -cakeRect.top;

        let id = setInterval(frame, 1);
        function frame() {
            if (yPos >= y) {
                clearInterval(id);
            } else {
                yPos+=3;
                candle.style.top = yPos + 'px';
            }
        }
        
        cake.appendChild(candle);
        
        // delay the loop to make the candles appear one by one
        await new Promise(r => setTimeout(r, 200));
    }


}


/* Template for candle
<div class = "candle">
                    <div class = "flame">
                    </div>
                    <div class = "candleTop">
                    </div>
                    <div class = "candleBottom">
                    </div>
                </div>
*/

var id = null;

function addCandle(eventData){
    
    // find the relative position of the click relative to the cake
    let cakeRect = cake.getBoundingClientRect();
    let x = eventData.x - cakeRect.left;
    let y = eventData.y - cakeRect.top;
    
    let candle = document.createElement("div");
    candle.classList.add("candle");
    let flame = document.createElement("div");
    flame.classList.add("flame");
    let candleTop = document.createElement("div");
    candleTop.classList.add("candleTop");
    let candleBottom = document.createElement("div");
    candleBottom.classList.add("candleBottom");

    candle.appendChild(flame);
    candle.appendChild(candleTop);
    candle.appendChild(candleBottom);

    

    // add the candle to the cake at the position of the click
    candle.style.position = "absolute";
    // adjust the position of the candle by x
    candle.style.left = x -2.5 + "px";

    //make sure that the candle is placed on the top layer ONLY
    if (x < 10 || x > 290){
        if (y>25){
            y = 25;
        }
    }

    if (x < 25 || x > 275){
        if (y>28){
            y = 28;
        }
    }

    if (x < 75 || x > 225){
        if (y>35){
            y = 35;
        }
    }

    // check if the candle is too low on the cake
    if (y > 40){
        y = 40;
    }

  var yPos = -cakeRect.top;
  clearInterval(id);
  id = setInterval(frame, 1);
  function frame() {
    if (yPos >= y) {
      clearInterval(id);
    } else {
      yPos+=3;
      candle.style.top = yPos -40 + 'px';
    }
  }
  cake.appendChild(candle);
}

/**
 * Function to validate the name input
 * @param {String} nameText
 * @returns {Boolean}
 */
function validname(nameText) {
    if (nameText == "") {
        // change the color of the input field border
        document.getElementById("name").style.border = "1px solid red";
        return false;
    }
    document.getElementById("name").style.border = "1px solid hsl(266, 59%, 60%)";
    return true;
}

/**
 * Function to validate the birthday input
 * @param {String} dobText
 * @returns {Boolean}
 */
function validbirthday(dobText) {
    if (dobText == "") {
        // change the color of the input field border
        document.getElementById("dob").style.border = "1px solid red";
        return false;
    }
    // check if the date is complete
    let date = new Date(dobText);
    if (date == "Invalid Date") {
        document.getElementById("dob").style.border = "1px solid red";
        return false;
    }
    document.getElementById("dob").style.border = "1px solid hsl(266, 59%, 60%)";
    return true;
}

/**
 * Function to animate the card when the input is invalid
 */
function invalidAnim() {
    let card = document.getElementById("Card");
    card.style.animation = "invalidAnim 0.5s";
    card.style.animationFillMode = "forwards";

    // reset the animation
    setTimeout(function() {
        card.style.animation = "none";
    }, 1000);
}


/**
 * Function to flavor the cake
 * @param {String} flavour
 */
function flavorCake(flavour) {
    let top = document.getElementById("topLayer");
    let layer1 = document.getElementById("layer1");
    let layer2 = document.getElementById("layer2");
    let layer3 = document.getElementsByClassName("bottomLayer")[0];

    if (flavour == "Chocolate") {
        top.style.backgroundColor = "hsl(30, 100%, 20%)";
        layer1.style.backgroundColor = "hsl(30, 100%, 15%)";
        layer2.style.backgroundColor = "hsl(30, 100%, 10%)";
        layer3.style.backgroundColor = "hsl(30, 100%, 5%)";
    } else if (flavour == "Funfetti") {
        top.style.backgroundImage = "url(\"./cakes/Funfetti-top.jpg\")";
        top.style.backgroundSize = "cover";
        layer1.style.backgroundPosition = "center center";
        layer3.style.backgroundImage = "url(\"./cakes/Funfetti-bottom.jpg\")";
        layer3.style.backgroundSize = "cover";
        layer3.style.height = "225px";
        layer3.style.top = "25px";
        layer3.style.borderRadius = "0 0 50% 50% / 25%";
        layer1.style.visibility = "hidden";
        layer2.style.visibility = "hidden";
    } else if (flavour == "Strawberry") {
        top.style.backgroundColor = "#ffb7b7";
        layer1.style.backgroundColor = "#ff8f8f";
        layer2.style.backgroundImage = "url(\"./cakes/Strawberry_Raised.jpg\")";
        layer2.style.backgroundSize = "cover";
        layer3.style.backgroundColor = "#ff8f8f";
    } else if (flavour == "Red Velvet") {
        top.style.backgroundColor = "#c1121f";
        layer1.style.backgroundColor = "#780000";
        layer2.style.backgroundColor = "#F8D6C5";
        layer3.style.backgroundColor = "#780000";
    } else if (flavour == "Rum & Raisin") {
        top.style.backgroundImage = "url(\"./cakes/Rum&Raisin.jpg\")";
        top.style.backgroundSize = "cover";
        layer1.style.backgroundPosition = "center center";
        layer3.style.backgroundImage = "url(\"./cakes/Rum&Raisin-bottom.jpg\")";
        layer3.style.backgroundSize = "cover";
        layer3.style.height = "225px";
        layer3.style.top = "25px";
        layer3.style.borderRadius = "0 0 50% 50% / 25%";
        layer1.style.visibility = "hidden";
        layer2.style.visibility = "hidden";
    } else if (flavour == "Vanilla") {
        
    }
}


/**
 * Baloons functions
 */

function randomizeBalloonSpeed(balloon) {
    // Random speed between 5s and 10s
    const speed = Math.random() * 5 + 15; 
    balloon.style.animationDuration = speed + "s";
}

function createBalloon() {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');

    // Randomize color
    const colors = ['#FF6347', '#FFD700', '#ADFF2F', '#00BFFF', '#FF69B4', '#8A2BE2', '#FF4500'];
    balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    // Randomize position
    const containerWidth = document.querySelector('.container').clientWidth;
    const randomLeft = Math.random() * containerWidth;
    balloon.style.left = randomLeft + "px";

    randomizeBalloonSpeed(balloon);

    return balloon;
}

function generateBalloons() {
    const container = document.getElementById('balloonContainer');
    
    // Random number of balloons
    const balloonCount = Math.floor(Math.random() * 5) + 5; 

    for (let i = 0; i < balloonCount; i++) {
        const balloon = createBalloon();
        container.appendChild(balloon);
    }
}


/* change to when candles are blown up */
window.addEventListener("click", () => {
  generateBalloons();
});