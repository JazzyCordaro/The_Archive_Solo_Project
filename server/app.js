var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require ('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var bpJason = bodyParser.json();
var port = process.env.PORT || 1408;
var pg = require('pg');
var connectionString = 'postgress://localhost:5432/TheArchive';


// 
// if(process.env.DATABASE_URL !== undefined) {
//     console.log('env connection string');
//     connectionString = process.env.DATABASE_URL;
//     pg.defaults.ssl = true;
// } else {
//     connectionString = 'postgres://localhost:5432/foodDb';
// }
//
// console.log("connectionString set to: ", connectionString);
//
// module.exports = connectionString;
//
//
//



//spin up server
app.listen( port, function(){
  console.log( 'server up on', port );
}); // end server up

app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( path.resolve( 'public/index.html' ) );
}); // end base url

//getMovies
app.get('/getMovies', function(req, res){
  console.log('getMovies route hit');
  //connect to DB: The Archive
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    }else{
      console.log('connected to DB');
      var resultsArray = [];
      var queryResults = client.query('SELECT * FROM movies ORDER BY title ASC');
      queryResults.on('row', function(row){
        resultsArray.push(row);
      });
      queryResults.on('end', function(){
        done();
        return res.json(resultsArray);
      }); // end queryResults
    } // end else
  });//end connect
}); // end /getMovies


// add movie
app.post('/addMovie', urlencodedParser, function(req, res){
  console.log('addMovie route hit:', req.body);
  var data = {title: req.body.title, url: req.body.url, userid: req.body.userid};
  pg.connect(connectionString, function(err, client, done){
    if(err){
      done();
      console.log(err);
      return;
    } // end error connection
      // query to DB The Archive
      client.query("INSERT INTO movies(title, url, userid) values($1, $2, $3)", [data.title, data.url, data.userid]);
        done();
          res.send({success: true});
  }); // end pg connect
}); // end post /addMovie

app.use(express.static('public'));
