/* Stores gallery id for previous/next buttons in modal view */
let galleryHash = "";

/* Remove target # on page refresh, clears modal view */
window.onload = function(){
    document.location.hash = "";
}

/* Stores gallery id of clicked image. This function is mainly called when setModalSource is triggered
(bubbling) */
function setHash(hashValue){
    galleryHash = hashValue;

    closeModalView();
    underlineItem();
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

function underlineItem(){

   let menuItems =  document.body.querySelectorAll(`.menu a`);
   // let id = elem.split('#')[1];

     for (let elem of menuItems){

       if (elem.href.includes(`#${galleryHash}`)) {
          elem.classList.add(`underline`);
      }
       else {
           elem.classList.remove(`underline`);
        }
   }
}



