import { listMovieView } from "../../view/listMovieView.js"

export class genresMovie {
    constructor(element) {
        this.genrer = "https://api.themoviedb.org/3//genre/movie/list?api_key=650034e9709e515cc4452e2a99095e59"

    }
    GenresList() {
        return fetch(this.genrer)
            .then((resp) => resp.json())
            .then((data) => {
               
                // console.log(data.genres);


                for (let index = 0; index < 3; index++) {
                    let pos = Math.floor(Math.random() * 20)
                    let id = data.genres[pos].id
                    let name = data.genres[pos].name
                    if (index==0){

                        this.GenresMovieList(id, name)
                            .then(data=>{
                                this.listPoster(data)
                            })
                    }
                    if (index>=1){

                        this.GenresMovieList(id, name)
                            .then(data=>{
                                this.listGenrer(name);
                                this.listMovies(data, index);
                              
                                
                            })
                    }                  
                    

                }



            }).catch((err) => console.log(err))
    }
    GenresMovieList(id, name) {
        const genrerMovie = `http://api.themoviedb.org/3/genre/${id}/movies?api_key=650034e9709e515cc4452e2a99095e59&language=en-US`
        return fetch(genrerMovie)
            .then(resp=> resp.json()
            .then(data=>{
                
                let movies = new Array()
        
        
                data.results.slice(0,6).forEach((element) => {
                    let movieData = {
                        ID: element.id,
                        Name: element.title,
                        Poster: element.poster_path,
                        Release: element.release_date,
                        Overview: element.overview,
                        Rating: element.vote_average,
                        Genrers: element.genre_ids
                    }
                    movies.push(movieData)
                })
                return movies;
            })

            )

        
    }
    
    listPoster(movies){
        movies.forEach((element,index)=>{
            let listPoster = new listMovieView()
            let poster = `https://image.tmdb.org/t/p/original${element.Poster}`
            let li = document.querySelector(".expo__lista ul")
            li.insertAdjacentHTML("afterbegin", listPoster.listMoviePoster(element.Name))
            let imgHTML = document.querySelector(".expo__lista-img--jogo")
            imgHTML.style.backgroundImage = `url("${poster}")`;
            if(index==3){

                const expoPoster = document.querySelector(".expo__poster");
                expoPoster.style.backgroundImage = `url("${poster}")`;
                const posterTexto= document.querySelector(".poster__descricao-resumo");
                const name = document.createTextNode(`${element.Name}`);
                posterTexto.appendChild(name)
            }
            if(index==5){
                const expoPoster = document.querySelectorAll(".expo__poster");
                console.log(expoPoster);
                expoPoster[1].style.backgroundImage = `url("${poster}")`;
                const posterTexto= document.querySelectorAll(".poster__descricao-resumo");
                const name = document.createTextNode(`${element.Name}`);
                posterTexto[1].appendChild(name)
            }
            
        })
    }
    listGenrer(genrer){
        const mainHTML = document.querySelectorAll("main section")
        let listGenrer = new listMovieView();
        mainHTML[1].insertAdjacentHTML("afterend", listGenrer.listMoviesGenrer(genrer))
    }
    listMovies(movies, cont){
        movies.forEach(element=>{
            let listPoster = new listMovieView()
            let poster = `https://image.tmdb.org/t/p/original${element.Poster}`
            let name = element.Name;
            const movies = document.querySelectorAll(".genrerList__poster");
            if (movies.length ==1 ){
                movies[0].insertAdjacentHTML("afterbegin", listPoster.listMoviesbyGenrer(element.Name));
                let imgHTML = document.querySelector(".movie__img")
                imgHTML.style.backgroundImage = `url("${poster}")`
            }
            else{
                movies[cont-2].insertAdjacentHTML("afterbegin", listPoster.listMoviesbyGenrer(element.Name));
                let imgHTML = document.querySelector(".movie__img")
                imgHTML.style.backgroundImage = `url("${poster}")`    
            }
        })
    }



}