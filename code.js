/* Remove target # on page refresh */
window.onload = function(){
    document.location.hash = "";
}

/* Set clicked on image as modal popup source */
function setModalSource(event){
    image.src = event.target.src;
}


