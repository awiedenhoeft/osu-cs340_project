/* SETUP */
var express = require('express');
var app = express();
PORT = 1996;

// app.js
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


// Database
var db = require('./database/db-connector');

/* ROUTES */
// app.js 

// app.js

app.get('/', function(req, res)
    {
        res.render('/layouts/index.hbs');                    // Note the call to render() and not send(). Using render() ensures the templating engine
    });                                         // will process this file, before sending the finished HTML to the client.



/* LISTENER */
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});