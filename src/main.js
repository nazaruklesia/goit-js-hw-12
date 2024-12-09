import "./css/styles.css";

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
btnLoadMore.addEventListener("click", handlerLoadMore);

async function handlerSearch(event) {
    event.preventDefault();

    const query = event.target.elements.query.value.trim();

     if (!query) {
    iziToast.error({
      title: "Error",
      message: "Please enter a search query!",
      position: "topRight",
    });
       
    return;
     }
    
 clearGallery(gallery);
  showLoader(loader);
    resetPage();
    
  try {
    const data = await getPictures(query);
  if (!data.hits.length) { 
                iziToast.info({
                    title: "No Results",
                  message: "Sorry, there are no images matching your search query. Please try again!",
                    position: "topRight",
                });
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
 
  } finally {
      hideLoader(loader);
  }

} 

 async function handlerLoadMore() {
    try {
        await addPages();

        const query = formSearch.elements.query.value.trim();

        if (!query) {
            iziToast.error({
                title: "Error",
                message: "Search query is empty!",
                position: "topRight",
            });
            return;
        }

        const data = await getPictures(query);

        if (data.hits.length >= data.totalHits) {
            btnLoadMore.style.display = "none";
            iziToast.info({
                message: "You've reached the end of search results.",
                position: "topRight",
            });
            return;
        }

        gallery.insertAdjacentHTML("beforeend", reflectionPictures(data.hits));
        lightbox.refresh();

        const cardHeight = gallery.firstElementChild.getBoundingClientRect().height;
        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
        });
     } catch(error) { error => console.log(error.message); } 
    
    
}




