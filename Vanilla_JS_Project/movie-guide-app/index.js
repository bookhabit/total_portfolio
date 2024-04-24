let movieNameRef = document.getElementById("movie-name")
let searchBtn = document.getElementById("search-btn")
let result = document.getElementById("result")

let getMovie = ()=>{
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`

    // if input field is empty
    if(movieName.length <= 0){
        result.innerHTML = `<h3 class="msg">Please enter a movie name</h3>`
    }else{
        // if input isn't empty
        fetch(url).then((response)=>response.json())
        .then((data)=>{
            console.log(data)
            if(data.Error){
                // if movie doesn't exist in database
                console.log('data',data)
                result.innerHTML = `
                    <h3 class="msg">${data.Error}</h3>
                `
            }
            else if(data.Response = "True"){
                result.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="star-icon.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>
                                    ${data.Genre.split(",").join("</div><div>")}
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3>Plot:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
                `
            }
        })
        .catch(()=>{
            // if error occurs
            result.innerHTML = `<h3 class="msg">Error occured</h3>`
        })
        
    }
    
}

searchBtn.addEventListener("click",getMovie)
window.addEventListener("load",getMovie)