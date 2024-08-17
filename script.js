// test flag to overwrite validname and validbirthday
/** @todo change this to false */
const test = true;
const micTest = false;

let blowed = false;
let ribbonPulled = false;


/**
 * Function to process the form
*/
function process() {
    // make the form not restart the page
    event.preventDefault();
    var nameText = document.getElementById("name").value;
    var dobText = document.getElementById("dob").value;
    var e = document.getElementById("flavour");
    var flavourText = e.options[e.selectedIndex].text;
    var messageText = document.getElementById("message").value;
    var fromText = document.getElementById("from").value;


    if ((validname(nameText) && validname(fromText) && validbirthday(dobText)) || test) {
        // change animation to slide out
        let card = document.getElementById("Card");
        card.style.animation = "slideOut 2s";
        card.style.animationFillMode = "forwards";
    } else {
        invalidAnim();
    }

    var cake = document.getElementById("cake");

    // Calculate the age of the person
    let dob = new Date(dobText);
    let today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    if (age < 1) {
        age = 1;
    }

    // Change the banner message to have the name of the person
    let name = document.getElementById("bannerMessage");
    // Capitalize the first letter of the name
    nameText = nameText.charAt(0).toUpperCase() + nameText.slice(1);
    name.innerHTML = "Happy Birthday <br>" + nameText + "!";

    let content_header = document.getElementById("content_header");
    // change the content header to have the name of the person
    content_header.innerHTML = "Happy Birthday <br>" + nameText + ",";

    let content_message = document.getElementById("content_message");
    // change the content message to have the message of the person
    content_message.innerHTML = messageText;

    let content_from = document.getElementById("content_from");
    // change the content from to have the from of the person
    content_from.innerHTML = "From " + fromText;


    // Flavor the cake
    flavorCake(flavourText);
    // add candles to the cake
    ageCandles(age);

    // wait for the candles to be added before starting the audio
    if (micTest == false) {
        setTimeout(function () {
            webaudio_tooling_obj();
        }, 200 * age);
    }
}

/**
 * Function to add the candles with the amount of age the person is turning
*/
async function ageCandles(age) {

    // calculate the spread of the candles depending on the age
    let spread = 300 / (age + 1);

    let cakeRect = cake.getBoundingClientRect();

    for (let i = 0; i < age; i++) {
        let candle = document.createElement("div");
        candle.classList.add("candle");
        let wick = document.createElement("div");
        wick.classList.add("wick");
        let flame = document.createElement("div");
        flame.classList.add("flame");
        flame.style.visibility = "visible";
        let candleTop = document.createElement("div");
        candleTop.classList.add("candleTop");
        let candleBottom = document.createElement("div");
        candleBottom.classList.add("candleBottom");

        candle.appendChild(wick);
        candle.appendChild(flame);
        candle.appendChild(candleTop);
        candle.appendChild(candleBottom);

        // add the candle to the cake at the position of the click
        candle.style.position = "absolute";
        // adjust the position of the candle by x and add a random margin to make the candles look more natural
        let margin = Math.floor(Math.random() * 10) - 5;
        candle.style.left = spread + (spread * i) + margin + "px";
        // make the top position of the candle random between the top and bottom of the cake
        // separate the cke to 3 horizontal layers, with the first and last layer random from 0 to 25, the middle layer from 0 to 45
        let y = Math.floor(Math.random() * 40) - 40;
        if (spread * i < 50 || spread * i > 250) {
            // random between -15 and -25
            y = Math.floor(Math.random() * 10) - 25;
        }

        let yPos = -cakeRect.top;

        let id = setInterval(frame, 1);
        function frame() {
            if (yPos >= y) {
                clearInterval(id);
            } else {
                yPos += 3;
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
                    <div class = "wick">
                    </div>
                    <div class = "flame">
                    </div>
                    <div class = "candleTop">
                    </div>
                    <div class = "candleBottom">
                    </div>
                </div>
*/

/**
 * Function to add a candle to the cake
 * @param {Event} eventData
 */
function addCandle(eventData) {
    let second_message = document.getElementById("second_message");
    second_message.style.visibility = "visible";
    let ribbon = document.getElementById("ribbon");
    if (ribbonPulled == false) {
        ribbon.style.animation = "pullRibbon 2s";
        if (window.innerWidth < 800) {
            ribbon.style.left = "0vw";
        } else {
            ribbon.style.left = "-20vw";
        }
        ribbonPulled = true;
    }


    // find the relative position of the click relative to the cake
    let cakeRect = cake.getBoundingClientRect();
    let x = eventData.x - cakeRect.left;
    let y = eventData.y - cakeRect.top;

    let candle = document.createElement("div");
    candle.classList.add("candle");
    let wick = document.createElement("div");
    wick.classList.add("wick");
    let flame = document.createElement("div");
    flame.classList.add("flame");
    flame.style.visibility = "visible";
    let candleTop = document.createElement("div");
    candleTop.classList.add("candleTop");
    let candleBottom = document.createElement("div");
    candleBottom.classList.add("candleBottom");

    candle.appendChild(wick);
    candle.appendChild(flame);
    candle.appendChild(candleTop);
    candle.appendChild(candleBottom);



    // add the candle to the cake at the position of the click
    candle.style.position = "absolute";
    // adjust the position of the candle by x
    candle.style.left = x - 2.5 + "px";

    //make sure that the candle is placed on the top layer ONLY
    if (x < 10 || x > 290) {
        if (y > 25) {
            y = 25;
        }
    }

    if (x < 25 || x > 275) {
        if (y > 28) {
            y = 28;
        }
    }

    if (x < 75 || x > 225) {
        if (y > 35) {
            y = 35;
        }
    }

    // check if the candle is too low on the cake
    if (y > 40) {
        y = 40;
    }

    var yPos = -cakeRect.top;

    let id = setInterval(frame, 1);
    function frame() {
        if (yPos >= y) {
            clearInterval(id);
        } else {
            yPos += 3;
            candle.style.top = yPos - 40 + 'px';
        }
    }
    cake.appendChild(candle);
    webaudio_tooling_obj();
}

/**
 * Function to turn off a candle
 */
function turnCandleOFF() {
    //randomise which candle is turned off
    let candles = document.getElementsByClassName("candle");
    let candle = candles[Math.floor(Math.random() * candles.length)];
    let flame = candle.getElementsByClassName("flame")[0];
    flame.style.visibility = "hidden";
}

/**
 * Function to check if all candles are off
 * @returns {Boolean} true if all candles are off, false otherwise
 */
function checkCandlesOFF() {
    let candles = document.getElementsByClassName("candle");
    for (let i = 0; i < candles.length; i++) {
        let candle = candles[i];
        let flame = candle.getElementsByClassName("flame")[0];
        if (flame.style.visibility == "visible") {
            return false;
        }
    }
    return true;
}

/* Banner functions ---------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------
*/

/**
 * Function to push down the banner
 */
function pushDownBanner() {
    let banner = document.getElementById("banner");
    let yPos = -200;
    let id = setInterval(frame, 1);
    function frame() {
        if (yPos >= 0) {
            clearInterval(id);
        } else {
            yPos += 2;
            banner.style.top = yPos + 'px';
        }
    }
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
    setTimeout(function () {
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
        top.style.backgroundImage = "url(\"./cakes/Vanilla-top.jpg\")";
        top.style.backgroundSize = "cover";
        layer1.style.background = "linear-gradient(bisque, #f5f5dc)";
        layer2.style.backgroundColor = "#f5f5dc";
        layer3.style.background = "#f5f5dc";
    }
}


/* Baloons functions ---------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

/**
 * Function to randomize the speed of the balloons
 * @param {*} balloon 
 */
function randomizeBalloonSpeed(balloon) {
    // Random speed between 5s and 10s
    const speed = Math.random() * 5 + 15;
    balloon.style.animationDuration = speed + "s";
}

/**
 * Function to create a balloon
 * @returns {Element} balloon
 */
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

/**
 * Function to generate balloons
 */
function generateBalloons() {
    const container = document.getElementById('balloonContainer');

    // Random number of balloons
    // if mobile generate between 5 and 8 balloons
    // if desktop generate between 15 and 20 balloons
    const isMobile = window.innerWidth <= 800;

    // Random number of balloons
    if (isMobile){
        var balloonCount = Math.floor(Math.random() * 3) + 5;
    }
    else{
        var balloonCount = Math.floor(Math.random() * 5) + 15;
    }
    for (let i = 0; i < balloonCount; i++) {
        const balloon = createBalloon();
        container.appendChild(balloon);
    }
}



/* MIC Functions -------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

/* Setting up global variables for microphone*/
let media_stream = null,
    audioContext = null,
    micStream = null,
    analyserNode = null,
    scriptProcessor = null;

/**
 * Function to set up the microphone
 * Uses getUserMedia to get the microphone input
 * Uses the analyser node to get the frequency data
 * Uses the script processor to process the frequency data
 */
function webaudio_tooling_obj() {

    // check if audiocontext is null and or if is running
    if (audioContext) {
        if (audioContext.state === "running") {
            // console.log("audio is running already");
            return;
        }
    }
    audioContext = new AudioContext();

    // console.log("audio is starting up ...");

    // Check if the browser supports getUserMedia and get the microphone input
    if (!navigator.getUserMedia)
        navigator.getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;

    if (navigator.getUserMedia) {
        navigator.getUserMedia(
            { audio: true },
            start_microphone, () => {
                console.log("error getting microphone input");
            }
        );
    } else {
        alert("getUserMedia not supported in this browser.");
    }

    // ---

    /**
     * Function to show the data from the microphone
     * If the value is greater than 180, turn off the candles
     * If all candles are off, generate balloons and push down the banner in the first blow
     * If the candles are off, show the remove candles button and stop the microphone
     * @param {Array} array
     * @param {Number} rows
     * @param {String} label
     */
    function showData(array, rows, label) {
        // console.log("__________ " + label);
        array.slice(0, rows).forEach(value => {
            if (value > 180) {
                // console.log("Loud sound detected!" + value);
                turnCandleOFF();
            }
        });
        if (checkCandlesOFF()) {
            // console.log("All candles are off!");
            if (blowed == false) {
                blowed = true;
                generateBalloons();
                pushDownBanner();
            }
            stop_microphone();
            let remove = document.getElementById("removeCandles");
            remove.style.visibility = "visible";
            explode();
        }

    }

    /**
     * Function to start the microphone
     * @param {*} stream 
     */
    function start_microphone(stream) {
        media_stream = stream;
        const gainNode = audioContext.createGain();
        gainNode.connect(audioContext.destination);

        micStream = audioContext.createMediaStreamSource(stream);
        analyserNode = audioContext.createAnalyser();
        scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

        analyserNode.smoothingTimeConstant = 0;
        analyserNode.fftSize = 2048;

        micStream.connect(analyserNode);
        analyserNode.connect(scriptProcessor);
        scriptProcessor.connect(gainNode);

        scriptProcessor.onaudioprocess = function () {
            // get the average for the first channel
            const array = new Uint8Array(analyserNode.frequencyBinCount);
            analyserNode.getByteFrequencyData(array);
            showData(array, 100, "from fft");

        };
    }
}


/**
 * Function to stop the microphone
 * Disconnects all the nodes and stops the tracks
 * Closes the audio context
 */
function stop_microphone() {
    if (media_stream) {
        media_stream.getTracks().forEach(track => track.stop());
        // console.log("Microphone stopped.");
    }

    if (scriptProcessor) {
        scriptProcessor.disconnect();
        scriptProcessor.onaudioprocess = null; // remove the event handler
    }

    if (analyserNode) {
        analyserNode.disconnect();
    }

    if (micStream) {
        micStream.disconnect();
    }

    if (audioContext) {
        audioContext.close().then(() => {
            // console.log("Audio context closed.");
        });
    }
}

/*After the blow ---------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

/**
 * Function for the remove candles button
 */
function removeCandles() {
    let candles = document.getElementsByClassName("candle");
    while (candles.length > 0) {
        candles[0].remove();
    }
    let remove = document.getElementById("removeCandles");
    remove.style.visibility = "hidden";
    let first_message = document.getElementById("first_message");
    let instructions = document.getElementById("instruct");

    // Display the instructions and the first message
    instructions.style.display = "block";
    first_message.style.visibility = "visible";

    // Add the addCandle event listener to the cake
    // From now on the user can add candles to the cake by clicking on it
    cake.addEventListener("click", addCandle);
}

/**
 * Function to make the message card appear
 */
function messageCardAppear() {
    let messageContainer = document.getElementById("cardContainer");
    messageContainer.style.display = "block";
    messageContainer.style.animation = "slideInCard 2s";
    messageContainer.style.animationFillMode = "forwards";
    explode();
}

/**
 * Function to for ribbon button
 */
function ribbonButton() {
    const cardContainer = document.querySelector('#cardContainer');
    cardContainer.style.display = "block";
    cardContainer.classList.toggle('appear');
}

/* Drag ribbon ---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

// Make the DIV element draggable:
document.addEventListener("DOMContentLoaded", function () {
    dragElement(document.getElementById("ribbon"), -25, 0, false, 0, 0);
    dragElement(document.getElementById("messageCard"), 0, 90, true, 10, 100);
});

/**
 * Function to make an element draggable
 * @param {Element} elmnt
 * @param {Number} min
 * @param {Number} max
 * @param {Boolean} vertical
 * @param {Number} verticalmin
 * @param {Number} verticalmax
 */
function dragElement(elmnt, min, max, vertical, verticalmin, verticalmax) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    var initialLeft = 0;
    var initialTop = 0;
    if (document.getElementById(elmnt.id + "Header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    /**
     * Function to start dragging the element
     * @param {Event} e 
     */
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    /**
     * Function to drag the element
     * @param {Event} e
     */
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:

        if (window.getComputedStyle(elmnt).position == "absolute") {

            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            if (vertical) {
                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            }
        } else {

            initialLeft = initialLeft - pos1;

            elmnt.style.left = initialLeft + "px";
            if (vertical) {
                initialTop = initialTop - pos2;
                elmnt.style.top = initialTop + "px";
            }
        }

        // make a maximum and minimum position for the ribbon



        let vw = window.innerWidth / 100;

        if (elmnt.offsetLeft < (min * vw)) {
            if (window.getComputedStyle(elmnt).position == "absolute") {
                elmnt.style.left = min + "vw";
            } else {
                initialLeft = 0;
                elmnt.style.left = initialLeft + "px";
            }
        }
        if (elmnt.offsetLeft > max * vw) {
            if (window.getComputedStyle(elmnt).position == "absolute") {
                elmnt.style.left = max + "vw";
                // make the message card appear
                messageCardAppear();
                // hide the ribbon
                elmnt.style.display = "none";
            } else {
                initialLeft = 0;
                elmnt.style.left = initialLeft + "px";
            }
        }
        if (vertical) {
            let vh = window.innerHeight / 100;
            if (elmnt.offsetTop < (verticalmin * vh)) {
                if (window.getComputedStyle(elmnt).position == "absolute") {
                    elmnt.style.top = verticalmin + "vh";
                } else {
                    initialTop = 0;
                    elmnt.style.top = initialTop + "px";
                }
            }
            if (elmnt.offsetTop > verticalmax * vh) {
                if (window.getComputedStyle(elmnt).position == "absolute") {
                    elmnt.style.top = verticalmax + "vh";
                } else {
                    initialTop = 0;
                    elmnt.style.top = initialTop + "px";
                }
            }
        }

    }

    /**
     * Function to stop dragging the element
     */
    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


/* Confetti ---------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/
const colors = ['#D8589F', '#EE4523', '#FBE75D', '#4FC5DF'];
const bubbles = 100;

/**
 * Function to explode the confetti
 * The confetti will come from the left and right side of the screen
 */
function explode() {
    const x = window.innerWidth;
    const y = window.innerHeight;

    let particles1 = [];
    let particles2 = [];
    let ratio = window.devicePixelRatio;
    let c1 = document.createElement('canvas');
    let c2 = document.createElement('canvas');
    let ctx1 = c1.getContext('2d');
    let ctx2 = c2.getContext('2d');

    c1.style.position = 'fixed';
    c1.style.left = (0 - (x / 2)) + 'px'; // Position the canvas at the right edge
    c1.style.top = (0 - (y / 15)) + 'px'; // Adjust the top position to center around (x, y)
    c1.style.pointerEvents = 'none';
    c1.style.width = x + 'px';
    c1.style.height = y + 'px';
    c1.style.zIndex = 9999;
    c1.width = x * ratio;
    c1.height = y * ratio;
    document.body.appendChild(c1);

    c2.style.position = 'fixed';
    c2.style.left = (x / 2) + 'px'; // Position the canvas at the left edge
    c2.style.top = (0 - (y / 15)) + 'px'; // Adjust the top position to center around (x, y)
    c2.style.pointerEvents = 'none';
    c2.style.width = x + 'px';
    c2.style.height = y + 'px';
    c2.style.zIndex = 9999;
    c2.width = x * ratio;
    c2.height = y * ratio;
    document.body.appendChild(c2);

    for (let i = 0; i < bubbles; i++) {
        const angle = Math.random() * 90 - 45;
        const speed = r(5, 10);

        particles1.push({
            x: c1.width / 2,
            y: c1.height / 2,
            radius: r(3, 8),
            color: colors[Math.floor(Math.random() * colors.length)],
            angle: angle,
            speed: speed,
            friction: .99,
            fade: .02,
            opacity: r(100, 100, true),
            xVel: speed * Math.cos(angle * Math.PI / 180),
            yVel: speed * Math.sin(angle * Math.PI / 180),
        });

        particles2.push({
            x: c2.width / 2,
            y: c2.height / 2,
            radius: r(3, 8),
            color: colors[Math.floor(Math.random() * colors.length)],
            angle: angle,
            speed: speed,
            friction: .99,
            fade: .02,
            opacity: r(100, 100, true),
            xVel: speed * Math.cos(angle * Math.PI / 180),
            yVel: speed * Math.sin(angle * Math.PI / 180),
        });
    }

    render(particles1, ctx1, c1.width, c1.height, "left");
    render(particles2, ctx2, c2.width, c2.height, "right");
}

/**
 * Function to render the confetti
 * @param {Array} particles
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} width
 * @param {Number} height
 * @param {String} direction
 * @returns {CanvasRenderingContext2D}
 */
function render(particles, ctx, width, height, direction) {
    requestAnimationFrame(() => render(particles, ctx, width, height, direction));
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
        // Move particles based on velocity
        if (direction == "left") {
            p.x += p.xVel; // Move particles to the left
        }
        else {
            p.x -= p.xVel; // Move particles to the right
        }
        p.y += p.yVel;

        // Apply friction and fade to particles
        p.xVel *= p.friction;
        p.yVel *= p.friction;
        p.radius -= p.fade;
        p.opacity -= 0.005;

        if (p.opacity < 0 || p.radius < 0) return;

        ctx.beginPath();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, false);
        ctx.fill();
    });

    return ctx;
}

const r = (a, b, c) => parseFloat((Math.random() * ((a ? a : 1) - (b ? b : 0)) + (b ? b : 0)).toFixed(c ? c : 0));
