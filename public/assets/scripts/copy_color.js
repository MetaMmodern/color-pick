/*THIS FUNCTION is activated when user clicks inside the grid of colors*/
function copyToClip() {
  const x = event.clientX,
    y = event.clientY; //Here we get the position of mouse when click is done.
  const elementMouseIsOver = document.elementFromPoint(x, y); //Here we get the element from that position.
  let style;
  if (elementMouseIsOver.className == "color") {
    //Here we check if the click was on the .color element
    style = window.getComputedStyle(elementMouseIsOver); //and save all the styles from that element.
  } else if (elementMouseIsOver.className == "color_text") {
    //Here we check if the click was on the .color_text element
    style = window.getComputedStyle(elementMouseIsOver.parentNode); //and save all the styles from his parents element
  } //because its parent is always .color.
  else if (elementMouseIsOver.id == "colors") {
    //All other cases.
    return;
  }
  const color = style.getPropertyValue("background-color"); //Here we get the value of background-color.
  const hexColor = RGBParser(color); //Here we save the color as hexademical;
  let dummy = $("<input>")
    .val(hexColor)
    .appendTo("body")
    .select(); //here we create a temporary input field to paste
  document.execCommand("copy"); //and copy the color from it.
  dummy.remove(); //Here we remove the temporary field.
  console.log(color + " copied in HEX!"); //info for developers.
  popup(color);
}

/*THIS FUNCTION converts a part of rgb(r, g or b) into a hexademical number*/

function rgbElementToHex(c) {
  var hex = c.toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
}

/*THIS FUNCTION constructs a hexademical value of the color from rgb*/
function RGBtoHEX(Array) {
  return (
    "#" +
    rgbElementToHex(Array[0]) +
    rgbElementToHex(Array[1]) +
    rgbElementToHex(Array[2])
  );
}

/*THIS FUNCTION parses the string in format 'rgb(x, x, x)' and makes an array [x, x, x], consisting of red, green and blue colors as integers */
function RGBParser(rgb) {
  const parts = rgb.slice(4, rgb.length - 1);
  const colorsArray = parts.split(", ");
  const colorsNums = [
    parseInt(colorsArray[0]),
    parseInt(colorsArray[1]),
    parseInt(colorsArray[2])
  ];
  return RGBtoHEX(colorsNums);
}

function popup(color) {
  const popupScreen = document.getElementsByClassName("copy_notif");
  popupScreen[0].style.opacity = "1";
  popupScreen[0].style.zIndex = "99999";
  popupScreen[0].style.backgroundColor = color;
  setTimeout(() => {
    popupScreen[0].style.opacity = "0";
    setTimeout(() => {
      popupScreen[0].style.zIndex = "-1";
    }, 125);
  }, 250);
}
