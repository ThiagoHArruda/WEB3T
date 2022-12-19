import { genresMovie } from "./apiMovie/genresMovie.js";

function startPage(){
    const movie = new genresMovie()
    movie.GenresList()
}

startPage()