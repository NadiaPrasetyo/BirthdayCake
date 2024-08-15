// test flag to overwrite validname and validbirthday
/** @todo change this to false */
const test = true;
const micTest = false;


/**
 * Function to process the form
*/
function process() {
    var nameText = document.getElementById("name").value;
    var dobText = document.getElementById("dob").value;
    var e = document.getElementById("flavour");
    var flavourText = e.options[e.selectedIndex].text;
    var messageText = document.getElementById("message").value;


    if ((validname(nameText) && validbirthday(dobText)) || test) {
        // change animation to slide out
        let card = document.getElementById("Card");
        card.style.animation = "slideOut 2s";
        card.style.animationFillMode = "forwards";
    } else {
        invalidAnim();
    }

    // Calculate the age of the person
    let dob = new Date(dobText);
    let today = new Date();
    let age = today.getFullYear() - dob.getFullYear();

    // make the form not restart the page
    event.preventDefault();
    var cake = document.getElementById("cake");

    // Flavor the cake
    flavorCake(flavourText);
    // add candles to the cake
    ageCandles(age);

    // wait for the candles to be added before starting the audio
    if (micTest == false) {
        setTimeout(function () {
            webaudio_tooling_obj();
        }, 200*age);
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

function addCandle(eventData) {
    let second_message = document.getElementById("second_message");
    second_message.style.visibility = "visible";
    webaudio_tooling_obj();

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
    candle.addEventListener("click", turnCandleOFF);
}

function turnCandleOFF() {
    //randomise which candle is turned off
    let candles = document.getElementsByClassName("candle");
    let candle = candles[Math.floor(Math.random() * candles.length)];
    let flame = candle.getElementsByClassName("flame")[0];
    flame.style.visibility = "hidden";
}

// check if all candles are turned off
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

/*
*/
function pushDownBanner() {

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

    }
}


/* Baloons functions ---------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

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
    const balloonCount = Math.floor(Math.random() * 5) + 15;

    for (let i = 0; i < balloonCount; i++) {
        const balloon = createBalloon();
        container.appendChild(balloon);
    }
}


/* change to when candles are blown up */
if (test == false) {
    window.addEventListener("click", () => {
        generateBalloons();
    });
}



/* MIC Functions -------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------*/

let media_stream = null,
    audioContext = null,
    micStream = null,
    analyserNode = null,
    scriptProcessor = null;

function webaudio_tooling_obj() {
  audioContext = new AudioContext();

  console.log("audio is starting up ...");

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

  function showData(array, rows, label) {
    console.log("__________ " + label);
    array.slice(0, rows).forEach(value => {
      if (value > 180) {
        console.log("Loud sound detected!" + value);
        turnCandleOFF();
      }
    });
    if (checkCandlesOFF()) {
        console.log("All candles are off!");
        generateBalloons();
        pushDownBanner();
        stop_microphone();
        let remove = document.getElementById("removeCandles");
        remove.style.visibility = "visible";
    }

  }


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

function stop_microphone() {
    if (media_stream) {
        media_stream.getTracks().forEach(track => track.stop());
        console.log("Microphone stopped.");
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
            console.log("Audio context closed.");
        });
    }
}


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
    instructions.style.display = "block";
    first_message.style.visibility = "visible";
    cake.addEventListener("click", addCandle);
}
