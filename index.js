import{a as b,S as v,i as s}from"./assets/vendor-DEenWwFD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function i(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(t){if(t.ep)return;t.ep=!0;const o=i(t);fetch(t.href,o)}})();let p=1;const S=15,q="https://pixabay.com/api/",w="47376974-17318822de3408abf70e5a971";async function f(e){return(await b(q,{params:{key:w,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:p,per_page:S}})).data}async function y(){p+=1}async function E(){p=1}function h(e){return e.map(({webformatURL:r,largeImageURL:i,tags:a,likes:t,views:o,comments:n,downloads:L})=>`
   <a class="gallery-item" href="${i}">
   <div class=all-gallary>
   <img src="${r}" alt="${a}">
   <div class="description">
   <p>Likes: <span>"${t}"</span></p>
   <p>Views: <span>"${o}"</span></p>
   <p>Comments: <span>"${n}"</span></p>
   <p>Downloads: <span>"${L}"</span></p>
   </div>
   </div>
   </a>
    `).join("")}function P(e){e.innerHTML=""}function R(e){e.style.display="block"}function $(e){e.style.display="none"}const u=document.querySelector(".form-search"),c=document.querySelector(".gallery"),d=document.querySelector(".loader"),l=document.querySelector(".js-load-more");u.addEventListener("submit",g);l.addEventListener("click",y);let m=new v(".gallery-item",{captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionDelay:250});u.addEventListener("submit",g);l.addEventListener("click",M);async function g(e){e.preventDefault();const r=e.target.elements.query.value.trim();if(!r){s.error({title:"Error",message:"Please enter a search query!",position:"topRight"});return}P(c),R(d),E();try{const i=await f(r);if(!i.hits.length){s.info({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}c.innerHTML=h(i.hits),m.refresh(),l.style.display="block"}catch{s.error({title:"Error",message:"Something went wrong. Please try again later!",position:"topRight"})}finally{$(d)}}async function M(){try{await y();const e=u.elements.query.value.trim();if(!e){s.error({title:"Error",message:"Search query is empty!",position:"topRight"});return}const r=await f(e);if(r.hits.length>=r.totalHits){l.style.display="none",s.info({message:"You've reached the end of search results.",position:"topRight"});return}c.insertAdjacentHTML("beforeend",h(r.hits)),m.refresh();const i=c.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:i*2,behavior:"smooth"})}catch{s.error({title:"Error",message:"Error fetching more images!",position:"topRight"})}}
//# sourceMappingURL=index.js.map
