let apiKey = 'apikey=ee1abab3'; // This is our API key which you can think of like our key to unlock the door to access OMDB's API.


$(document).ready(() => { // When the document is ready, do the below function
  $('#searchForm').on('submit', (e) => { // On the form submission, which is just when you search for something
    let searchText = $('#searchText').val(); // Sets 'searchText' to equal the value of whatever is searched
    sessionStorage.setItem('searchText', $('#searchText').val());

    let selectVal = $( "#searchBy option:selected" ).val();
    sessionStorage.setItem('selectVal', $( "#searchBy option:selected" ).val());

    let search = searchText + "&type=" + selectVal;

    sessionStorage.setItem('pageNum', 1);
    getMovies(search); // Calls the function 'getMovies()' with the parameter of whatever is searched
    e.preventDefault();
    $('#searchText').val('');
    //TESTER
    //console.log("Form submited successfully.");
  });
});

function getMovies(searchText) {
console.log('http://www.omdbapi.com?s='+searchText+"&"+encodeURI(apiKey));
  axios.get('http://www.omdbapi.com?s='+searchText+"&"+encodeURI(apiKey)) // I used axios which is promise based and super easy to use to 'get()' the API response.
    .then((response) => { // '.then()' is basically saying, once you get the response above, then. We can also use 'response' which is the JSON that
                          // is returned by the '.get()' on the above line
      let movies = response.data.Search; // This sets 'movies' to the array of movies that are returned by the '.get()'
      let output = '';

      //TESTER
      //console.log("Title of movies to display");
      $.each(movies, (index, movie) => { // This is similar to a for, each loop. It uses the 'movies' array that we set above so that each element of
                                        //  that 'movies' array is now a 'movie'. Then we can grab values like 'movie.Poster', which is the picture,
                                        //  and 'movie.Title', which is the title of the movie.
        output += `
          <div id="movie" class="col-md-3">
            <div class="well text-center">
              <h5 class="movieTitle">${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-dark" href="#"><img onerror="this.onerror=null; this.src='images/no_image.png'" src="${movie.Poster}"></a>
            </div>
          </div>
        `;
        // Through this for each loop, 'output' is concatenated to build to grid of movies to be display on the html page

        //TESTER
        //console.log((index + 1) + ") " + movie.Title + '\nImg src = "' + movie.Poster + '"');

      });


      $('#movies').html(output); // Then we set the html inside the div that has the id='movies' to equal 'output' so that we can display our list of movies
      $('#pageRow').show();
    })
    .catch((err) => { // If something goes wrong in the '.get()', it will run this '.catch()' which displays the error
      console.log(err);
    });
}

function movieSelected(id) { // This function is so that we can store the data of the movie that a user clicks during the users session so that we can
                            // load all the movie variables one the movie page. OMDB's API only gives us Title, Poster and MovieID when we search their
                            // database. The only way to get all movie information is to use the 'movieID' which we can get once the user clicks on a
                            // movie to view. This function is ran once a user clicks on the movie. You can see the code on line 24.
  sessionStorage.setItem('movieId', id); // 'sessionStorage' is an awesome object that stores user data like a key. So you set the name of the key and then the id and that is now stored under the name 'movieID'

  //TESTER
  //alert("Stored movieID in session storage: " + sessionStorage.getItem('movieId'));

  window.location = './movie.html'; // This then changes the users webpage to the 'movie.html' page where we load all the movie data.
  return false;
}

function getMovie() { // This function gets the movie information via the sessionStorage key that we saved above.
  let movieId = sessionStorage.getItem('movieId'); // Sets 'movidID' as the movidID we stored
  //let favorite = sessionStorage.getItem('isAFavorite');
  //TESTER
  //alert("Retreived movieID from session storage: " + movieId);

  axios.get('http://www.omdbapi.com?i='+movieId+"&"+encodeURI(apiKey)) // This is were we can use the movieID we now have to '.get()' the rest of the movie information to display
    .then((response) => { // Same thing as above, once we '.get()', then we run the below code
      let movie = response.data; // We can use 'response' as a variable because it is returned from the '.get()' as a JSON value.

      let output =`
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2 id="movieTitle">${movie.Title}

            <a onclick="removeFavorite('` + movieId + `');$('#addFav').show();$('#removeFav').hide();" class="btn" id="removeFav" style="color:white;"><i id="heart" class="fa fa-heart" style="font-size:24px;color:red;"></i><br>Un-Favorite</a>
            <a onclick="addFavorite('` + movieId + `');$('#removeFav').show();$('#addFav').hide();" class="btn" id="addFav" style="color:white;"><i id="heart" class="fa fa-heart" style="font-size:24px;"></i><br>Favorite</a>

            </h2>

            <ul id="movieInfo" class="bg-dark list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3 id="plotLabel">Plot</h3>
            <p id="moviePlot">${movie.Plot}</p>
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="text-light btn btn-default">Go Back To Search</a>
          </div>
        </div>
      `;

      //TESTER
      //console.log("Movie to display on screeen");
      //console.log(movie);

      // 'output' is formed using the 'movie' object
      $('#movie').html(output); // then we set the html inside of the div with the id='movie' to 'output' which displays our movie information
      isAFavorite(movieId);
    })
    .catch((err) => { // '.catch()' to catch any errors and console.log() them
      console.log(err);
    });
}

function getMovieForFavList(movieId, i) { // This function gets the movie information via the sessionStorage key that we saved above.

  //TESTER
  //alert("Retreived movieID from session storage: " + movieId);

  axios.get('http://www.omdbapi.com?i='+movieId+"&"+encodeURI(apiKey)) // This is were we can use the movieID we now have to '.get()' the rest of the movie information to display
    .then((response) => { // Same thing as above, once we '.get()', then we run the below code
      let movie = response.data; // We can use 'response' as a variable because it is returned from the '.get()' as a JSON value.

      //TESTER
      //console.log("Movie to display on screeen");
      let id = "#favMovie" + i;

      $(id).html(movie.Title);
    })
    .catch((err) => { // '.catch()' to catch any errors and console.log() them
      console.log(err);
    });
}

function getPosterForFavList(movieId, i) { // This function gets the movie information via the sessionStorage key that we saved above.

  //TESTER
  //alert("Retreived movieID from session storage: " + movieId);

  axios.get('http://www.omdbapi.com?i='+movieId+"&"+encodeURI(apiKey)) // This is were we can use the movieID we now have to '.get()' the rest of the movie information to display
    .then((response) => { // Same thing as above, once we '.get()', then we run the below code
      let movie = response.data; // We can use 'response' as a variable because it is returned from the '.get()' as a JSON value.

      //TESTER
      //console.log("Movie to display on screeen");
      let id = "#favMoviePoster" + i;

      $(id).attr('src', movie.Poster);
    })
    .catch((err) => { // '.catch()' to catch any errors and console.log() them
      console.log(err);
    });
}

function getMovieGenre(movieId, i) { // This function gets the movie information via the sessionStorage key that we saved above.

  //TESTER
  //alert("Retreived movieID from session storage: " + movieId);

  axios.get('http://www.omdbapi.com?i='+movieId+"&"+encodeURI(apiKey)) // This is were we can use the movieID we now have to '.get()' the rest of the movie information to display
    .then(function(response) { // Same thing as above, once we '.get()', then we run the below code
      let movie = response.data; // We can use 'response' as a variable because it is returned from the '.get()' as a JSON value.

      //TESTER
      //console.log("Movie to display on screeen");
      let key = 'movieGenre'+i;

      sessionStorage.setItem(key, movie.Genre);
    })
    .catch((err) => { // '.catch()' to catch any errors and console.log() them
      console.log(err);
    });
}

function getNextPage() {
  let page = sessionStorage.getItem('pageNum');
  page = parseInt(page, 10);
  if (page <= 100) {
    let searchText = sessionStorage.getItem('searchText'); // Sets 'searchText' to equal the value of whatever is searched
    let selectVal = sessionStorage.getItem('selectVal');
    page += 1;
    sessionStorage.setItem('pageNum', page);
    let search = searchText + "&type=" + selectVal + "&page=" + page;
    getMovies(search); // Calls the function 'getMovies()' with the parameter of whatever is searched
    $('#activePageNum').html(page);
  }
}

function getPrevPage() {
  let page = sessionStorage.getItem('pageNum');
  page = parseInt(page, 10);
  if (page > 1) {
    let searchText = sessionStorage.getItem('searchText'); // Sets 'searchText' to equal the value of whatever is searched
    let selectVal = sessionStorage.getItem('selectVal');
    page -= 1;
    sessionStorage.setItem('pageNum', page);
    let search = searchText + "&type=" + selectVal + "&page=" + page;
    getMovies(search); // Calls the function 'getMovies()' with the parameter of whatever is searched
    $('#activePageNum').html(page);
  }
}
