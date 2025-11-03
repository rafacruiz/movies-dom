let watchListMovies = [];
let genre = "Todos";
let searchMovie = "";

const templateMovie = document.getElementById("movie-template");
templateMovie.removeAttribute("id");
templateMovie.remove();

const templateWatchListMovie = document.getElementById("movie-watchlist-template");
templateWatchListMovie.removeAttribute("id");
templateWatchListMovie.remove();

render();
listenerButton();

function render() {
    renderLitsMovies();
    renderFilters();
    renderWatchListMovies();
}

function renderLitsMovies() {

    const listMovies = document.getElementById("movies-grid");

    listMovies.innerText = "";
    
    movies
        .filter((p) => p.genres.includes(genre) || genre === "Todos")
        .filter((p) => p.title.toLowerCase().includes(searchMovie.toLowerCase()))
        .forEach(movie => {
        const movieDOM = templateMovie.cloneNode();
        movieDOM.innerHTML = templateMovie.innerHTML;

        const title = movieDOM.querySelector("h3");
        title.innerText = movie.title;

        const genre = movieDOM.querySelector(".movies-genre");
        genre.innerText = movie.genres.join(", ");

        const description = movieDOM.querySelector(".movies-description");
        description.innerText = movie.description;
        
        const ratingMovie = movieDOM.querySelector(".movies-rating");
        ratingMovie.innerHTML = movie.rating;
        
        const timeMovie = movieDOM.querySelector(".movies-time");
        timeMovie.innerHTML = movie.duration + " min";

        movieDOM.querySelector("button").addEventListener("click", () => {

            if (!watchListMovies.includes(movie.id)) {
                watchListMovies.push(movie.id);
            }
            
            render();
        });

        listMovies.appendChild(movieDOM);
    });
}

function renderFilters() {

    document.querySelectorAll(".filter-btn").forEach((button) => {
        if (button.dataset.genre === genre) { 
            button.classList.add("bg-blue-600", "text-white", "active");
            button.classList.remove("bg-gray-700");
        } else {
            button.classList.add("bg-gray-700");
            button.classList.remove("bg-blue-600", "text-white", "active");
        }
    });
}

function renderWatchListMovies() {
    const ListMovies = document.getElementById("movies-watchlist");
    ListMovies.innerText = "";
    let total = 0;
    let totalTimeMovie = 0;

    const emptyWatchList = document.getElementById("empty-state");
    const timesWatchList = document.getElementById("movies-times");
    const countWatchList = document.getElementById("movies-count");
    
    if (watchListMovies.length === 0) {
        emptyWatchList.classList.remove("hidden");
        timesWatchList.innerText = "0h 0min";
        countWatchList.innerText = total + " películas";
    } else {
        countWatchList.innerText = watchListMovies.length;
        timesWatchList.innerText = totalTimeMovie + "min";
        emptyWatchList.classList.add("hidden");
    }

    watchListMovies.forEach(movie => {
        const movieListDOM = templateWatchListMovie.cloneNode();
        movieListDOM.innerHTML = templateWatchListMovie.innerHTML;

        const movieIn = movies.find(p => p.id === movie);

        const movieTitle = movieListDOM.querySelector("h4");
        movieTitle.innerText = movieIn.title;

        const movieGenre = movieListDOM.querySelector(".list-genre");
        movieGenre.innerText = movieIn.genres.join(", ");

        const movieRating = movieListDOM.querySelector(".list-rating");
        movieRating.innerText = movieIn.rating;

        timesWatchList.innerText = totalTimeMovie += movieIn.duration;
        timesWatchList.innerText += 'min'
        
        movieListDOM.querySelector("button").addEventListener("click", () => {            
            watchListMovies = watchListMovies.filter((p) => p !== movie);

            render();
        });
       
        ListMovies.appendChild(movieListDOM);
    });
}

function listenerButton() {

    document
        .querySelectorAll(".filter-btn").forEach((filter) => {
            filter.addEventListener("click", (e) => {
                genre = e.target.dataset.genre;

                render();
            });
        });

    document
        .getElementById("searchInput")
        .addEventListener("input", (e) => {
            searchMovie = e.target.value;

        render();
    });

    document
        .getElementById("btn-empty")
        .addEventListener("click", () => {
            watchListMovies = [];

        render();
    });
}