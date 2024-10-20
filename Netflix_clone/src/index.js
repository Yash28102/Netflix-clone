/*let accordian = document.getElementsByClassName("FAQ__title");

for (let i = 0; i < accordian.length; i++) {
  accordian[i].addEventListener("click", function () {
    if (this.childNodes[1].classList.contains("fa-plus")) {
      this.childNodes[1].classList.remove("fa-plus");
      this.childNodes[1].classList.add("fa-times");
    } else {
      this.childNodes[1].classList.remove("fa-times");
      this.childNodes[1].classList.add("fa-plus");
    }

    let content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}*/
const accordian = document.getElementsByClassName("FAQ__title");

for (let i = 0; i < accordian.length; i++) {
  accordian[i].addEventListener("click", function () {
    const icon = this.childNodes[1];
    if (icon.classList.contains("fa-plus")) {
      icon.classList.remove("fa-plus");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-plus");
    }

    const content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

// Fetch popular movies from the TMDb API
async function fetchPopularMovies() {
  const apiKey = '428ae5f2'; // Your OMDb API key
  const movieSearchTerm = 'Inception'; // Example movie to search
  const apiUrl = `http://www.omdbapi.com/?s=${encodeURIComponent(movieSearchTerm)}&apikey=${apiKey}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.Response === "True") {
      displayMovies(data.Search); // Use data.Search for the array of movies
    } else {
      console.error('Error fetching the movies:', data.Error);
    }
  } catch (error) {
    console.error('Error fetching the movies:', error);
  }
}

// Display movies in the designated container
function displayMovies(movies) {
  const moviesContainer = document.getElementById("movies-container");
  moviesContainer.innerHTML = ''; // Clear existing movies
  
  movies.forEach(movie => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie-item");
    movieElement.innerHTML = `
      <h4>${movie.Title}</h4>
      <p>${movie.Year}</p>
      <img src="${movie.Poster !== "N/A" ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}" />
    `;
    moviesContainer.appendChild(movieElement);
  });
}

// Call the function to fetch movies on page load
fetchPopularMovies();

