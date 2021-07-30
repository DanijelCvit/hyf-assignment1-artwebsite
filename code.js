/* Init global variables */
let galleryHash = "#"; /* Stores gallery id for previous/next buttons in modal view */

/* Remove target # on page refresh, clears modal view */
window.onload = function(){
    document.location.hash = "";
}

/* Check scroll height and switch focus to visible gallery */
window.addEventListener('scroll', switchGalleryFocus);

/* Stores gallery id of clicked image for prevModalImage/nextModalImage. Also updates selected gallery 
in menu and body */
function setHash(hashValue){
    galleryHash = hashValue;
} 

/* Set modal view source to clicked image */
function setModalSource(event){
    image.src = event.target.src;
}

/* On exit of modal view set url location back to originating gallery */
function closeModalView(){
    document.location.hash = galleryHash;
}

/* Finds current image index and descreases it by one to get previous image,
 (wraps around on first image) */
function prevModalImage(){

   let galleryID = galleryHash;
   let galleryItems = document.body.querySelectorAll(`#${galleryID} .gallery-item`);
   let modalImage = modal.querySelector(`img`);
   let currentImageIndex = 0;

   for (let i = 0; i < galleryItems.length; i++) {

    if (galleryItems[i].querySelector(`img`).src == modalImage.src) {
        currentImageIndex = i;
        break;
    }
   }

   if (currentImageIndex == 0 ) {
       modalImage.src = galleryItems[galleryItems.length-1].querySelector(`img`).src;
   }
   else {
       modalImage.src = galleryItems[currentImageIndex-1].querySelector(`img`).src; 
   }
}

/* Finds current image index and increases it by one to get next the image,
 (wraps around on last image) */
 function nextModalImage(){

    let galleryID = galleryHash;
    let galleryItems = document.body.querySelectorAll(`#${galleryID} .gallery-item`);
    let modalImage = modal.querySelector(`img`);
    let currentImageIndex = 0;
 
    for (let i = 0; i < galleryItems.length; i++) {
 
     if (galleryItems[i].querySelector(`img`).src == modalImage.src) {
         currentImageIndex = i;
         break;
     }
    }
 
    if (currentImageIndex == (galleryItems.length-1) ) {
        modalImage.src = galleryItems[0].querySelector(`img`).src;
    }
    else {
        modalImage.src = galleryItems[currentImageIndex+1].querySelector(`img`).src; 
    } 
}

/* Underlines the menu item of the gallery that's in focus */
function underlineItem(menuID, underscore, selector){

   let menuItems =  document.body.querySelectorAll(`.menu a`);

    for (let elem of menuItems){

        if (elem.href.includes(`#${menuID}`)) {
            if (underscore){
                elem.classList.add(selector);
            }
            else {
                elem.classList.remove(selector);
            }
   
         }
    }
}

/* Determines which gallery is at the top of the window and adds a box shadow to it and underlines
it's menu item */
function switchGalleryFocus(){

    let galleries = document.body.querySelectorAll('.gallery-container');

    for (let i = 0; i < galleries.length; i++){

        let coords = galleries[i].getBoundingClientRect();
     
        if ((coords.top <= 50) && (coords.bottom > 30)){
            if (galleries[i].classList.contains(`shadow`) == false){
                galleries[i].classList.add(`shadow`);
                underlineItem(galleries[i].id, true, 'onscroll');
            }
        }
        else {
            if (galleries[i].classList.contains(`shadow`)){
                galleries[i].classList.remove(`shadow`);
                underlineItem(galleries[i].id, false, 'onscroll');
            }
        }
    }
}

function scrollGalleryLeft(galleryID, event){

    let elem = document.body.querySelector(`#${galleryID} .gallery`);
    let timer = setInterval(scrollSmooth, 15);
    let stepCounter = 0;

    function scrollSmooth(){

        stepCounter += 10;
        elem.scrollLeft -= 10;

        if(stepCounter >= 300){
            clearInterval(timer);
        }
    }

    let rightbutton = elem.querySelector(`.next`);
    rightbutton.style.display = '';

   if (elem.scrollLeft <= 0){
    let leftbutton = elem.querySelector(`.prev`);
        leftbutton.style.display = 'none';
    }

    event.stopPropagation();

}

function scrollGalleryRight(galleryID, event){

    let elem = document.body.querySelector(`#${galleryID} .gallery`);
    let timer = setInterval(scrollSmooth, 15);
    let stepCounter = 0;

    function scrollSmooth(){

        stepCounter += 10;
        elem.scrollLeft += 10;

        if(stepCounter >= 300){
            clearInterval(timer);
        }
    }
   
    let leftbutton = elem.querySelector(`.prev`);
    leftbutton.style.display = '';

    if (elem.scrollLeft >= (elem.scrollWidth - elem.clientWidth)){
        let rightbutton = elem.querySelector(`.next`);
        rightbutton.style.display = 'none';
    }

    event.stopPropagation();
}


