export class listMovieView{
    listMoviePoster(name){
       
            return ` <li class="expo__lista-jogos ">
            <div class="img__jogo-lista">
                <div class="expo__lista-img--jogo"></div>
            </div>
            <div class="expo__lista-nome--jogo">
                <p class="lista__jogo-titulo texto">${name}</p>
            </div>
        </li>`
        
    }
    listMoviesGenrer(genrer){
        return `
        <section class="container">
            <div class="genresList">
                <p class="genrer__texto texto">${genrer}</p>
                <div class="genrerList__poster">
                    
                </div>
            </div>
        </section>
        `
    }
    listMoviesbyGenrer(name){
        return `
        <div class="movie">
        <div class="movie__text texto">${name}</div>
            <div class="movie__img"></div>
        </div>
        `
    }
    
}