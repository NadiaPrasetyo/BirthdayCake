function process () {
    var nameText = document.getElementById("name").value;
    var dobText = document.getElementById("birthday").value;
    var e = document.getElementById("flavour");
    var flavourText = e.options[e.selectedIndex].text;
    var messageText = document.getElementById("message").value;
    // alert ("Name: " + nameText + "\nBirthday: " + dobText + "\nFlavour: " + flavourText + "\nMessage: " + messageText);

    let card = document.getElementById("Card");
    card.style.visibility = "hidden";

    // make the form not restart the page
    event.preventDefault();
    
}