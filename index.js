const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const gallery = document.getElementById('image-gallery');
const clearBtn = document.getElementById('clear-btn');

// API configuration
const API_URL = 'https://api.unsplash.com/search/photos';
const CLIENT_ID = 'hbpDkT6EF7EotA8VL7LEJRGwrl29tfidK9gaXljGn9c'; // ключ от Unsplash API

// Focus input on load
window.onload = () => {
  input.focus();
};

// Fetch initial images
fetchImages('nature');

// Handle form submission
form.addEventListener('submit', function(event) {
  event.preventDefault();
  const query = input.value;
  if (query) {
    fetchImages(query);
  }
});

// Clear input field
clearBtn.addEventListener('click', () => {
  input.value = '';
  input.placeholder = 'Введите запрос для поиска';
});

// Fetch images from API
function fetchImages(query) {
  const url = `${API_URL}?query=${query}&client_id=${CLIENT_ID}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayImages(data.results);
    })
    .catch(error => console.error('Error fetching images:', error));
}

// Display images in gallery
function displayImages(images) {
  gallery.innerHTML = '';
  images.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image.urls.small;
    imgElement.alt = image.alt_description;
    gallery.appendChild(imgElement);
  });
}