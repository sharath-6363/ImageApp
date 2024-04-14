const API_KEY = "N6x7FBn0x4S-60BcVyyF0i4wInVhO-cJQE7Q6v1nQwY";
const API_URL = "https://api.unsplash.com/search/photos";
const imageContainer = document.getElementById("imageContainer");
const searchButton = document.getElementById("searchImageButton");
const searchInput = document.getElementById("searchImageInput");
const generateMore = document.getElementById("generateMore");

let currentPage = 1;

function displayPlaceholderImages() {
  const placeholderImageUrls = [
    "https://source.unsplash.com/random/400x300",
    "https://source.unsplash.com/random/450x300",
    "https://source.unsplash.com/random/500x300",
    "https://source.unsplash.com/random/550x300",
    "https://source.unsplash.com/random/600x300",
    "https://source.unsplash.com/random/650x300",
    "https://source.unsplash.com/random/700x300",
    "https://source.unsplash.com/random/750x300",
    "https://source.unsplash.com/random/800x300",
    "https://source.unsplash.com/random/850x300",
    "https://source.unsplash.com/random/900x300",
    "https://source.unsplash.com/random/950x300",
    "https://source.unsplash.com/random/1000x300",
    "https://source.unsplash.com/random/1050x300"
  ];

  placeholderImageUrls.forEach(url => {
    const alternativeImage = document.createElement("div");
    alternativeImage.className = "image-card";

    const img = document.createElement("img");
    img.src = url;
    img.alt = "Alternative Image";
    img.width = 400; 
    img.height = 300;

    alternativeImage.appendChild(img);
    imageContainer.appendChild(alternativeImage);
  });
}


window.addEventListener('load', displayPlaceholderImages);

function searchImages(query, page = 1) {
  const headers = new Headers({
    'Authorization': `Client-ID ${API_KEY}`
  });

  const params = new URLSearchParams({
    query: query,
    page: page,
  });

  fetch(`${API_URL}?${params}`, { method: 'GET', headers: headers })
    .then(response => response.json())
    .then(data => {
      if (page === 1) {
        imageContainer.innerHTML = "";
      }

      data.results.forEach(result => {
        const imageCard = document.createElement("div");
        imageCard.className = "image-card";

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        const imageElement = document.createElement("div");
        imageElement.className = "image";
        const img = document.createElement("img");
        img.src = result.urls.regular;
        img.alt = result.description || query;
        imageElement.appendChild(img);

        imageLink.appendChild(imageElement);
        imageCard.appendChild(imageLink);
        imageContainer.appendChild(imageCard);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

searchButton.addEventListener("click", () => {
  generateMore.style.display = "block";
  currentPage = 1;
  const searchTerm = searchInput.value;
  if (searchTerm) {
    searchImages(searchTerm, currentPage);
  }
});

generateMore.addEventListener("click", () => {
  currentPage++;
  const searchTerm = searchInput.value;
  if (searchTerm) {
    searchImages(searchTerm, currentPage);
  }
});
