function process (form) {
    var nameText = form.name.value;
    var dobText = form.birthday.value;
    var e = document.getElementById("flavour");
    var flavourText = e.options[e.selectedIndex].text;
    var messageText = form.message.value;
    alert ("Name: " + nameText + "\nBirthday: " + dobText + "\nFlavour: " + flavourText + "\nMessage: " + messageText);

}