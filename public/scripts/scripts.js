console.log('scripts.js is sourced');

// var movie = [];

$(document).ready(function(){
   console.log('doc ready JQ');

   getMovies();

  $('body').on('click', '#addButton', function(){
    var title = $(this).attr('title');
    console.log('title', title);
    console.log('addButton clicked');
    //this

    var objectToSend = {
    title: title,
    url: 'test',
    userid: 123456
    };

    saveMovie(objectToSend);
  }); //end body on click

  // hide and show of user screen
  $("#userLoggedIn").hide();
  $("#login").click(function(){
    console.log("login button clicked");
    $("#userLoggedIn").show();
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
      $('#outputDiv').append('<p>' + '<button type="button" class="allButtons" id="addButton" title="' + results[ i ].Title + '">Add</button>' + '</p>');
    } //end for loop
  }; //end showMovies






    // trying to display movies in library
  var showLibrary = function( results ){
    console.log( 'in showLibrary', results );
    // empty output div
    $( '#libraryOutputDiv').empty();
    // loop through results and display movies
    for( var i = 0 ; i < results.length; i++ ){
      $( '#libraryOutputDiv').append( '<p>' + results[ i ].Title + '</p>' );
      $( '#libraryOutputDiv').append( '<img src="' + results[ i ].Poster + '">' );
      // store results[i] in button
      // $('#outputDiv').append('<p>' + '<button type="button" class="allButtons" id="addButton">Add</button>' + '</p>');
    } //end for loop
  }; //end showMovies




}); // end doc ready




var getMovies = function(){
  console.log( 'in getMovies' );
  // ajax call to server to get movies
  $.ajax({
    url: '/getMovies',
    type: 'GET',
    success: function( data ){
      console.log( 'got some movies: ', data );
      movie = data;
      // appendMovies();
    } // end success
  }); //end ajax
};

var saveMovie = function(objectToSend){
  console.log( 'in saveMovie' );
  // ajax call to server to get movies
  $.ajax({
    url: '/addMovie',
    type: 'POST',
    dataType: 'JSON',
    data: objectToSend,
    success: function( data ){
      console.log( 'got some movies: ', data );
      movie = data;
      // appendMovies();
    } // end success
  }); //end ajax
};//end saveMovie



/////????????????????
// var addToLibrary = function(){
//   console.log('in addToLibrary');
//   $.ajax({
//     url: '/saveMoive',
//     type: 'POST',
//     dataType: 'JSON',
//     data: objectToSend,
//     success: function(data){
//       console.log('saved from:', data);
//       movie = data;
//       appendMovies();
//     }
//   });
// };
