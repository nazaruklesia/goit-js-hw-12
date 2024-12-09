
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import "./js/pixabay-api.js";
import { getPictures, addPages, resetPage } from "./js/pixabay-api.js";

import "./js/render-functions.js";
import { reflectionPictures, clearGallery, hideLoader, showLoader } from "./js/render-functions.js";


const formSearch = document.querySelector(".form-search");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const btnLoadMore = document.querySelector(".js-load-more");

formSearch.addEventListener("submit", handlerSearch);
btnLoadMore.addEventListener("click", addPages);



let lightbox = new SimpleLightbox(".gallery-item", {
  captions: true,
  captionSelector: "img",
  captionType: "attr",
  captionsData: "alt",
  captionDelay: 250,
});


formSearch.addEventListener("submit", handlerSearch);

async function handlerSearch(event) {
    event.preventDefault();

  clearGallery(gallery);
  showLoader(loader);

    const inputValue = event.target.elements.query.value.trim();

     if (inputValue === "") {
    iziToast.error({
      title: "Error",
      message: "Please enter a search query!",
      position: "topRight",
    });
       hideLoader(loader);
    return;
     }
    
  resetPage();
 
    
  try {
    const data = await getPictures(inputValue);
  if (data.hits.length === 0) { 
                iziToast.info({
                    title: "No Results",
                  message: "Sorry, there are no images matching your search query. Please try again!",
                    position: "topRight",
                });
    hideLoader(loader);
                return;
  }
   

         gallery.innerHTML = reflectionPictures(data.hits);

    lightbox.refresh();
    btnLoadMore.style.display = "block";

  } catch (error) { 
  iziToast.error({
    title: "Error",
    message: "Something went wrong. Please try again later!",
    position: "topRight",
  });
  return; 
}

} 

  

addPages()

const inputValue = formSearch.element.query.value.trim();

try {
  const data = await getPictures(inputValue);
  gallery.insertAdjacentHTML("beforeend", reflectionPictures(data.hits));
  lightbox.refresh();

  const totalHits = data.totalHits;
  if (gallery.children.length >= totalHits) {
    element.style.display = "none";
 iziToast.info({
                    title: "No Results",
                  message: "We're sorry, but you've reached the end of search results.",
                    position: "topRight",
 })
  }


  
  const cardHeight = gallery.firstElementChild.getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",

  });

}  catch (error) {
      iziToast.error({
        title: "Error",
        message: "Error fetching images!",
         position: "topRight",
      });
    };




  

