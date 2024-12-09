import axios from "axios";
// import iziToast from "izitoast";
export { getPictures, addPages, resetPage };

let page = 1;
const perPage = 15;


const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "47376974-17318822de3408abf70e5a971";


 async function getPictures(query) {
        const response = await axios(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: true,
                page,
                per_page: perPage,
            },
        });
        return response.data;
        
    
    // catch (error) {
    //     iziToast.error({
    //         title: "Error",
    // message: "Something went wrong. Please try again later!",
    // position: "topRight",
    //     })
       
    // }
}

 async function addPages() {
    page += 1;
}

 async function resetPage() {
    page = 1;
}
