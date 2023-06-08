const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

const formEl = document.querySelector("form"); //connect to form
const searchInputEl = document.getElementById("inputSearch");  //connect to input for search
const searchResultsEl = document.querySelector(".search_results"); //connect to result parent div
const searchButton = document.querySelector("#searchButton");

let inputData = ""; //empty input data
let page = 1;

async function searchImages() {
  try{
    inputData = searchInputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
  
    const response = await fetch(url);
    const data = await response.json();
  
    if (page === 1) {
      searchResultsEl.innerHTML = "";
    }
  
    const results = data.results;
      
      results.forEach((result) => {
  
        const imgWrapper = document.createElement("div");
        imgWrapper.classList.add("search-result");
        const img = document.createElement("img");
        img.src = result.urls.small;
        img.alt = result.alt_description;
        const imgLink = document.createElement("a");
        imgLink.href = result.links.html;
        imgLink.target = "_blank";
        imgLink.textContent = result.alt_description;
    
        imgWrapper.appendChild(img);
        imgWrapper.appendChild(imgLink);
        searchResultsEl.appendChild(imgWrapper);
  
      });
      
      
      page++;
  }
  catch(err){
  
  
    // console.error(err)
  }
  
  }



  formEl.addEventListener("submit", (event) => {
    event.preventDefault(); //disable custom function
    page = 1; // in new item search change page to 1
    searchImages(); //call searchImagesFunction
  });
  

function handleScroll() {
  // Get the total scrollable height
    const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Get the current scroll position
    const scrollPosition = window.pageYOffset ||
     document.documentElement.scrollTop || document.body.scrollTop;
    
    // Calculate the scroll position as a percentage
    const scrollPositionPercentage = (scrollPosition / totalScrollableHeight) * 100;

    // Log the scroll position percentage to the console
    if(scrollPositionPercentage > 71.4){
        searchImages();
    }

}

// Add the event listener to the window or any other element
window.onscroll = handleScroll;


// Define the function to be executed when the input value changes


