# BirthdayCake
Website to celebrate birthdays

## Contributors
NadiaPrasetyo
Caca-XP
WinaP

## How to Use
The default webpage will display an input form where the user can input specific details such as name (from and to), birthdate, desired cake flavour, and message.
A cake with the appropriate number of candles, calculated from the birthdate, is then animated on the screen and a mic listener is activated. A loud sound coming from the mic, resembling a blow detected by the mic will cause the candles to go out randomly and a happy birthday to [name] message will appear on a pop out banner. 
Once all of the candles are blown out, they can be removed by clicking the remove all candles button, that activates a click listener that allows users to add more candles by clicking on the cake. The subsequently added candles can also be blown out in the same manner.
A pull out tab will also appear on the left of the screen that can be pulled to reveal the message card with 2 images. The default images will be 2 cats, one on the outer part of the card and one on the inner part of the card. The card will open on hover and can be dragged to move across the screen. The birthday message is written on the inside of the card to imitate real birthday cards.

## Motivations
This webpage was developed for our mum's birthday. We decided to create a static website to celebrate her birthday despite being all in different cities.

## Developer notes
This webpage involves html, javascript, and css with no frameworks. 

## Customisations
  ### Birthday Card Images
  The custom images should be stored within the *cakes/* directory and referenced from the **index.html** cover within the message Card element.
  ### Colours
  The colours used in the whole web page can be altered from the **style.css** document.
  ### Cake Flavours
  Adding cake flavours can be done by adding an option value within the myForm in the flavour select element within the form in the **index.html** file. Listeners to the specified new flavor can be added in the flavorCake function in the **scrip.js** file as a continuation of the if else statements.
  ### Cake Textures
  Cake textures should be stored within the *cakes/* directory and referenced from the flavorCake function in the **script.js** file. It is added as a background image of the desired layer of the cake. @see Rum & Raisin or Funfetti cakes as examples in flavorCake.
## References
message card reference: https://www.youtube.com/watch?v=9CAqojHY42o
