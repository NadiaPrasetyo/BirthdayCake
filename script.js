/**
 * Function to process the form
 */
function process () {
    var nameText = document.getElementById("name").value;
    var dobText = document.getElementById("dob").value;
    var e = document.getElementById("flavour");
    var flavourText = e.options[e.selectedIndex].text;
    var messageText = document.getElementById("message").value;

    if (validname(nameText) && validbirthday(dobText)) {
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
    console.log(eventData.x);
    console.log(eventData.y);
    
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
    document.getElementById("name").style.border = "1px solid black";
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
    document.getElementById("dob").style.border = "1px solid black";
    return true;
}

/**
 * Function to animate the card when the input is invalid
 */
function invalidAnim() {
    let card = document.getElementById("Card");
    card.style.animation = "invalidAnim 1s";
    card.style.animationFillMode = "forwards";

    // reset the animation
    setTimeout(function() {
        card.style.animation = "none";
    }, 1000);
}