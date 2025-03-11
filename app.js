/* SETUP */
var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT = 1999;

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


// Database
var db = require('./database/db-connector');

/* ROUTES */
// READ function for weddings
app.get('/', function(req, res)
    {  
        let query1 = "SELECT * FROM weddings;";               // Define our query

        let query2 = "SELECT * FROM clients;";

        db.pool.query(query1, function(error, rows, fields){    // Execute the query
            //Save the wedding
            let wedding = rows;

            //Run the second query
            db.pool.query(query2, (error, rows, fields) => {

                //Save the clients
                let client = rows;
                return res.render('index', {data: wedding, client: client}); 
            })
                           
        })                                                      // an object where 'data' is equal to the 'rows' we
    });        

//READ function for clients
app.get('/clients.hbs', function(req, res)
    {  
        let query1 = "SELECT * FROM clients;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query
            
            res.render('clients', {data: rows});
                            
        })                                                      // an object where 'data' is equal to the 'rows' we
    });        

//READ function for payments
app.get('/payments.hbs', function(req, res)
    {  
        let query1 = "SELECT * FROM payments;";               // Define our query

        let query2 = "SELECT * FROM clients;";

        db.pool.query(query1, function(error, rows, fields){    // Execute the query
            //Save the payment
            let payment = rows;

            //Run the second query
            db.pool.query(query2, (error, rows, fields) => {

                //Save the clients
                let client = rows;
                return res.render('payments', {data: payment, client: client}); 
            })
                           
        })                                                      // an object where 'data' is equal to the 'rows' we
    });    

//CREATE function for weddings
app.post('/add-wedding-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    // Create the query and run it on the database
    query1 = `INSERT INTO weddings (clientID, weddingDate, location, weddingType, totalBudget) VALUES ('${data['input-clientID']}', '${data['input-weddingDate']}', '${data['input-location']}', '${data['input-weddingType']}', '${data['input-totalBudget']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/');
        }
    })
});

//CREATE function for clients
app.post('/add-client-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO clients (firstName, lastName, email, phoneNum) VALUES ('${data['input-firstName']}', '${data['input-lastName']}', '${data['input-email']}', '${data['input-phoneNum']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/clients');
        }
    })
});

//CREATE function for payments
app.post('/add-payment-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO payments (clientID, invoiceDate, totalAmount, paymentDate) VALUES ('${data['input-clientID']}', '${data['input-invoiceDate']}', '${data['input-totalAmount']}', '${data['input-paymentDate']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/payments');
        }
    })
});


/* LISTENER */
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});