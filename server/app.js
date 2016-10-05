var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require ('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var bpJason = bodyParser.json();
var port = process.env.PORT || 1408;

//spin up server
app.listen( port, function(){
  console.log( 'server up on', port );
}); // end server up

app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( path.resolve( 'public/index.html' ) );
}); // end base url

app.post( '/test', urlencodedParser, function( req, res ){
  console.log( 'test hit', req.body );
  res.send( 'you sent a ' + req.body.creature );
});




app.use(express.static('public'));
