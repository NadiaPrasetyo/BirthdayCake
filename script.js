function process () {
    var nameText = document.getElementById("name").value;
    var dobText = document.getElementById("birthday").value;
    var e = document.getElementById("flavour");
    var flavourText = e.options[e.selectedIndex].text;
    var messageText = document.getElementById("message").value;
    // alert ("Name: " + nameText + "\nBirthday: " + dobText + "\nFlavour: " + flavourText + "\nMessage: " + messageText);

    let card = document.getElementById("Card");
    card.style.animation = "slideOut 2s";
    card.style.animationFillMode = "forwards";
    // change animation to slide out

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
