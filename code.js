/* Remove target # on page refresh */
window.onload = function(){
    document.location.hash = "";
}

/* Set modal source to clicked image and set close button target to originating gallery */
function setModalSource(event){
    image.src = event.target.src;

    let hash = image.src.split(`#`)[1];

    cbutton.setAttribute("href", `#${hash}`);

}


