console.log('scripts.js is sourced');


$(document).ready(function(){
   console.log('doc ready JQ');
   $("#userLoggedIn").hide();
 	$("#login").click(function(){
 		console.log("button clicked");
 	$("#userLoggedIn").show();
 	$("#login").hide();
 	});




   $( "#login" ).click(function() {
    console.log('login clicked');;
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
});
