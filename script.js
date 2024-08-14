/**
 * Function to process the form
 */
function process () {
    var nameText = document.getElementById("name").value;
    var dobText = document.getElementById("dob").value;
    var e = document.getElementById("flavour");
    var flavourText = e.options[e.selectedIndex].text;
    var messageText = document.getElementById("message").value;

    // test flag to overwrite validname and validbirthday
    /** @todo change this to false */
    var test = true;

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

function addCandle(eventData){

    console.log('event happened!');
    console.log("X "+eventData.x);
    console.log("Y "+eventData.y);
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
    candle.style.left = x + "px";
    // adjust the position of the candle by y and 40 px for the height of the candle
    candle.style.top = y -40 + "px";

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
        top.style.backgroundImage = "url(\"./cakes/funfetti-birthday-cake.jpg\")";
        top.style.backgroundSize = "cover";
        layer3.style.backgroundImage = "url(\"./cakes/funfetti-birthday-cake.jpg\")";
        layer3.style.backgroundSize = "cover";
        layer3.style.height = "225px";
        layer3.style.top = "25px";
        layer3.style.borderRadius = "0 0 50% 50% / 25%";
        layer1.style.visibility = "hidden";
        layer2.style.visibility = "hidden";
        
    } else if (flavour == "Strawberry") {
        top.style.backgroundColor = "#ffb7b7";
        layer1.style.backgroundColor = "#ff8f8f";
        layer2.style.backgroundColor = "#fd5f5f";
        layer3.style.backgroundColor = "#e53939";
    } else if (flavour == "Red Velvet") {
        top.style.backgroundColor = "#c1121f";
        layer1.style.backgroundColor = "#780000";
        layer2.style.backgroundColor = "#F8D6C5";
        layer3.style.backgroundColor = "#780000";
    } else if (flavour == "Rum & Raisin") {
        top.style.backgroundColor = "#fadbab";
        layer1.style.backgroundColor = "#f2cc8f";
        layer2.style.backgroundColor = "#f2cc8f";
        layer3.style.backgroundColor = "#f2cc8f";
    }
}