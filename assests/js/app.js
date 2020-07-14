//selecting elements from dom
const buttonelement = document.querySelector('#search');
const inputelement = document.querySelector('#input');
const movieSearchable = document.querySelector('#movies-searchable');
const moviesContainer =document.querySelector('#movies-container');


function movieSection(movies){
    return movies.map((movie) =>{
        if (movie.poster_path){
        return `
        <img src=${IMAGE_URL + movie.poster_path} data-movie-id=${movie.id} />
        `;
        }
    })

}


function createmoviecontainer(movies,title=''){
    const movieElement =document.createElement('div');
    movieElement.setAttribute('class','movie');
    const movieTemplate = `
    <h2>${title}</h2>
    <section class="section">
        ${movieSection(movies)}
    </section>
    <div class="content">
    <p id="content-close">X</p>
    </div>
    `;

    movieElement.innerHTML = movieTemplate;
    return movieElement;
}

function renderSearchMovies(data){
    //data.results []
    renderSearchMovies.innerHTML ='';
    const movies = data.results;
    const movieBlock = createmoviecontainer(movies);
    movieSearchable.appendChild(movieBlock);
    console.log('data:',data);

}
function renderMovies(data){
    const movies = data.results;
    const movieBlock = createmoviecontainer(movies,this.title);
    moviesContainer.appendChild(movieBlock);

}


function handleErrror(error){
     console.log('Error',error);
     
 }


buttonelement.onclick= function(event){
    event.preventDefault();

    const value =inputelement.value;
    searchMovie(value);

        inputelement.value='';
    console.log('value:',value);
}
//vedio
function createIframe(video){
    const iframe = document.createElement('iframe');
    iframe.src = `https://youtube.com/embed/${video.key}`;
    iframe.width = 360;
    iframe.height = 315;
    iframe.allowFullscreen=true;
    return iframe;
}

function createVideoTemplate(data,content){
     //todo display movie
     content.innerHTML= '<p id="content-close">X</p>';
     console.log('Videos:',data);
     const videos = data.results;
     const length = videos.length > 4 ? 4:videos.length;
     const iframeContainer =document.createElement('div');
     
     for(let i=0; i<length; i++){
         const video =videos[i];
         const iframe = createIframe(video);
         iframeContainer.appendChild(iframe);
         content.appendChild(iframeContainer);

     }

}

//event delegation

document.onclick = function(event){
    const target =event.target;
    if (target.tagName.toLowerCase() =='img'){
    console.log('hello world');
    console.log('Event:',event);
    const movieId = target.dataset.movieId;
    console.log('Movie Id:',movieId)
    const section = event.target.parentElement;//section
    const content =section.nextElementSibling;//content
    content.classList.add('content-display');
    
    const path =`/movie/${movieId}/videos`;
    const url =generateUrl(path);
    //fetch movie vedio
    fetch(url)
        .then((res) =>res.json())
        .then((data) =>createVideoTemplate(data,content))
        .catch((error) =>{
            console.log('Error:',error)
            
        });


    }
    

    if (target.id ==='content-close'){
        const content =target.parentElement;
        content.classList.remove('content-display');
    }

}

getPopularMovie();

getUpComingMovie();

getTopRatedMovie();

