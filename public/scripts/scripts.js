console.log('scripts.js is sourced');

var showMovies = [];

// hide and show of user screen
$(document).ready(function(){
   console.log('doc ready JQ');
   $("#userLoggedIn").hide();
 	$("#login").click(function(){
 		console.log("login button clicked");
 	$("#userLoggedIn").show();
 	$("#login").hide();
 	});

$(document).on('click', '#searchNew',  function(){
// search library click
   $( "#searchLibrary" ).click(function() {
    console.log('search library clicked');
});

// search new movie click
   $( "#searchNewMovie" ).click(function() {
    console.log('search new movie clicked');
});


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
});

var showMovies = function( results ){
  console.log( 'in showMovies', results );
  // empty output div
  $( '#outputDiv').empty();
  // loop through results and display movies
  for( var i = 0 ; i < results.length; i++ ){
    $( '#outputDiv').append( '<p>' + results[ i ].Title + '</p>' );
    $( '#outputDiv').append( '<img src="' + results[ i ].Poster + '">' );
      }
    };
  });
});

var objectToSend = {};

$.ajax({
  type: 'POST',
  url: '/test',
  data: objectToSend,
  success: function( data ){
    console.log( 'got this from server - ' + data );
    } // end ajax success
  });
