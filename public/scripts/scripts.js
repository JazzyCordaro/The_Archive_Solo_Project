console.log('scripts.js is sourced');

$(document).ready(function(){
   console.log('doc ready JQ');

   getMovies();

  $('body').on('click', '#addButton', function(){
    // 'this' send the actual title of the movie to the DB.
    var title = $(this).attr('title');
    var poster = $(this).attr('poster');
    console.log('title', title);
    console.log('addButton clicked');

    var objectToSend = {
    title: title,
    url: poster,
    userid: 123456
    };
    saveMovie(objectToSend);
  // }); //end body on click
});

  // hide and show of user screen
  $("#welcomeUser").hide();
  $("#login").click(function(){
    console.log("login button clicked");
    $("#welcomeUser").show();
    $("#login").hide();
  }); // end login button click

  $(document).on('click', '#searchNew',  function(){
    var searchNewMovie = $('#searchTitle').val();
    console.log('searching for:', searchNewMovie);


  var searchURL = 'http://www.omdbapi.com/?s=' + searchNewMovie;
    $.ajax({
      url: searchURL,
      dataType: "JSON",
      success: function(data){
      console.log('successful API hit:', data);
      showMovies(data.Search);
      }
    }); // end ajax call
  }); // end search new click

  $( "#searchLibrary" ).click(function() {
    console.log('search library clicked');
  }); // end searchLibrary click

  var showMovies = function( results ){
    console.log( 'in showMovies', results );
    // empty output div
    $( '#outputDiv').empty();
    // loop through results and display movies
    for( var i = 0 ; i < results.length; i++ ){
      $( '#outputDiv').append( '<p>' + results[ i ].Title + '</p>' );
      $( '#outputDiv').append( '<img src="' + results[ i ].Poster + '">' );
      // store results[i] in button
      $('#outputDiv').append('<p>' + '<button type="button" class="allButtons" id="addButton" title="' + results[ i ].Title + '" poster="' + results[ i ].Poster + '">Add</button>' + '</p>');
    } //end for loop
  }; //end showMovies
}); // end doc ready

var showLibrary = function( results ){
  console.log( 'in showLibrary', results );
  // empty output div
  $( '#libraryOutputDiv').empty();
  // loop through results and display movies
  for( var i = 0 ; i < results.length; i++ ){
    $( '#libraryOutputDiv').append( '<p>' + results[ i ].title + '</p>' );
    $( '#libraryOutputDiv').append( '<img src="' + results[ i ].url + '">' );
    // store results[i] in button
  } //end for loop
}; //end showLibrary

var getMovies = function(){
  console.log( 'in getMovies' );
  // ajax call to server to get movies
  $.ajax({
    url: '/getMovies',
    type: 'GET',
    success: function( data ){
      console.log( 'got some movies: ', data );
      movie = data;
      showLibrary(data);
    } // end success
  }); //end ajax
}; // end getMovies

var saveMovie = function(objectToSend){
  console.log( 'in saveMovie' );
  // ajax call to server to get movies
  $.ajax({
    url: '/addMovie',
    type: 'POST',
    dataType: 'JSON',
    data: objectToSend,
    success: function( data ){
      console.log( 'got some movies:', data );
      movie = data;
    } // end success
  }); //end ajax
};//end saveMovie
