const apiKey = "YOUR_API_KEY";
const searchInput = document.getElementById("searchInput");
const moviesContainer = document.getElementById("movies");
const pageNumber = document.getElementById("pageNumber");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentPage = 1;
let currentQuery = "";
let debounceTimeout;

async function fetchMovies(query, page = 1) {
  moviesContainer.innerHTML = "Loading...";

  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${page}`
    );
    const data = await res.json();

    if (data.Response === "False") {
      moviesContainer.innerHTML = "No movies found.";
      return;
    }

    displayMovies(data.Search);
  } catch (error) {
    moviesContainer.innerHTML = "Error fetching data.";
  }
}

function displayMovies(movies) {
  moviesContainer.innerHTML = "";

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    card.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : ""}" />
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    `;

    moviesContainer.appendChild(card);
  });
}

searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimeout);

  debounceTimeout = setTimeout(() => {
    currentQuery = searchInput.value;
    currentPage = 1;
    pageNumber.textContent = currentPage;
    fetchMovies(currentQuery, currentPage);
  }, 500);
});

nextBtn.addEventListener("click", () => {
  currentPage++;
  pageNumber.textContent = currentPage;
  fetchMovies(currentQuery, currentPage);
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    pageNumber.textContent = currentPage;
    fetchMovies(currentQuery, currentPage);
  }
});