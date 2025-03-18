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
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

//READ function for clients
app.get('/clients.hbs', function(req, res)
    {  
        let query1 = "SELECT * FROM clients;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query
            
            res.render('clients', {data: rows});
                            
        })                                                      
    });        

// READ function for weddings
app.get('/weddings.hbs', function(req, res)
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
                return res.render('weddings', {data: wedding, client: client}); 
            })
                           
        })                                                      
    });        


//READ function for services
app.get('/services.hbs', function(req, res)
    {  
        let query1 = "SELECT * FROM services;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query
            
            res.render('services', {data: rows});
                            
        })                                                      
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
                           
        })                                                      
    }); 

//READ function for wedding services
app.get('/weddingServices.hbs', function(req, res)
    {  
        let query1 = "SELECT * FROM weddingServices;";
        let query2 = "SELECT * FROM weddings;"
        let query3 = "SELECT * FROM services;"

        db.pool.query(query1, function(error, rows, fields){    // Execute the query
            
            let weddingService = rows;

            db.pool.query(query2, function(error, rows, fields) {
                let wedding = rows;

                db.pool.query(query3, function(error, rows, fields) {
                    let service = rows;
                    return res.render('weddingServices', {data: weddingService, wedding: wedding, service: service}); 
                })
            })
        })
                           
    });      

//CREATE function for clients
app.post('/add-client-form', function(req, res){
    let data = req.body;

    query1 = `INSERT INTO clients (firstName, lastName, email, phoneNum) VALUES ('${data['input-firstName']}', '${data['input-lastName']}', '${data['input-email']}', '${data['input-phoneNum']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            res.redirect('clients.hbs');
        }
    })
});

//CREATE function for weddings
app.post('/add-wedding-form', function(req, res){
    let data = req.body;

    query1 = `INSERT INTO weddings (clientID, weddingDate, location, weddingType, totalBudget) VALUES ('${data['input-clientID']}', '${data['input-weddingDate']}', '${data['input-location']}', '${data['input-weddingType']}', '${data['input-totalBudget']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else  {
            res.redirect('weddings.hbs');
        }
    })
});

// CREATE function for Services 
app.post('/add-service', function(req, res) {
    let serviceName = req.body['input-serviceName']; 
    let serviceType = req.body['input-serviceType']; 
    let serviceCost = req.body['input-serviceCost']; 

    let query = `
        INSERT INTO services (serviceName, serviceType, serviceCost)
        VALUES (?, ?, ?);
    `;

    db.pool.query(query, [serviceName, serviceType, serviceCost], function(error, results, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('services.hbs');
        }
    });
});

//CREATE function for payments
app.post('/add-payment-form', function(req, res){
    let data = req.body;

    query1 = `INSERT INTO payments (clientID, invoiceDate, totalAmount, paymentDate) VALUES ('${data['input-clientID']}', '${data['input-invoiceDate']}', '${data['input-totalAmount']}', '${data['input-paymentDate']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }  else  {
            res.redirect('payments.hbs');
        }
    })
});

//CREATE function for wedding services
app.post('/add-wedding-service', function(req, res) {
    const { 'input-weddingID': weddingID, 'input-serviceID': serviceID } = req.body; 

    let query = `INSERT INTO weddingServices (weddingID, serviceID) VALUES (?, ?)`;

    db.pool.query(query, [weddingID, serviceID], function(error, rows, fields) {
        if (error) {
            console.error("Error adding service:", error);
            res.sendStatus(400);
        } else {
            res.redirect('weddingServices.hbs');
        }
    });
});

// UPDATE function for clients
app.post('/update-client', function(req, res) {
    let clientID = req.body['update-clientID'];
    let firstName = req.body['update-firstName'];
    let lastName = req.body['update-lastName'];
    let email = req.body['update-email'];
    let phoneNum = req.body['update-phoneNum'];

    let query = `
        UPDATE clients
        SET firstName = ?, lastName = ?, email = ?, phoneNum = ?
        WHERE clientID = ?;
    `;

    db.pool.query(query, [firstName, lastName, email, phoneNum, clientID], function(error, results, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('clients.hbs');
        }
    });
});

// UPDATE function for weddings
app.post('/update-wedding', function(req, res) {
    let weddingID = req.body['update-weddingID'];
    let clientID = req.body['update-wedding-client'];
    let weddingDate = req.body['update-weddingDate'];
    let location = req.body['update-location'];
    let weddingType = req.body['update-weddingType'];
    let totalBudget = req.body['update-totalBudget'];

    let query = `
        UPDATE weddings
        SET clientID = ?, weddingDate = ?, location = ?, weddingType = ?, totalBudget = ?
        WHERE weddingID = ?;
    `;

    db.pool.query(query, [clientID, weddingDate, location, weddingType, totalBudget, weddingID], function(error, results, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('weddings.hbs');
        }
    });
});

// UPDATE function for services
app.post('/update-service', function(req, res) {
    let serviceID = req.body['update-serviceID'];
    let serviceName = req.body['update-serviceName'];
    let serviceType = req.body['update-serviceType'];
    let serviceCost = req.body['update-serviceCost'];

    let query = `
        UPDATE services
        SET serviceName = ?, serviceType = ?, serviceCost = ?
        WHERE serviceID = ?;
    `;

    db.pool.query(query, [serviceName, serviceType, serviceCost, serviceID], function(error, results, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('services.hbs');
        }
    });
});

// UPDATE function for payments
app.post('/update-payment', function(req, res) {
    let invoiceID = req.body['update-invoiceID']
    let clientID = req.body['update-client'];
    let invoiceDate = req.body['update-invoiceDate'];
    let totalAmount = req.body['update-totalAmount'];
    let paymentDate = req.body['update-paymentDate'];

    let query = `
        UPDATE payments
        SET clientID = ?, invoiceDate = ?, totalAmount = ?, paymentDate = ?
        WHERE invoiceID = ?;
    `;

    db.pool.query(query, [clientID, invoiceDate, totalAmount, paymentDate, invoiceID], function(error, results, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('payments.hbs');
        }
    });
});

// UPDATE function for wedding services
app.post('/update-weddingServices', function(req, res) {
    let weddingID = req.body['update-wedding'];
    let serviceID = req.body['update-service'];

    let query = `
        UPDATE weddingServices
        SET weddingID = ?, serviceID = ?
        WHERE weddingID = ? AND serviceID = ?;
    `;

    db.pool.query(query, [serviceName, serviceType, serviceCost, serviceID], function(error, results, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('weddingServices.hbs');
        }
        
    });
});

// DELETE client
app.post('/delete-client', function(req,res){
    let clientID = req.body.clientID;
    let query= `DELETE FROM clients WHERE clientID = ?`;
    
    db.pool.query(query, [clientID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
             res.redirect('clients.hbs');
        }
    });
});

// DELETE wedding
app.post('/delete-wedding', function(req, res){
    let weddingID = req.body.weddingID;
    let query= 'DELETE FROM weddings WHERE weddingID = ?';

    db.pool.query(query, [weddingID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('weddings.hbs');
        } 
    })
});

// DELETE service
app.post('/delete-service', function(req, res) {
    let serviceID = req.body.serviceID;

    let query = `
        DELETE FROM services
        WHERE serviceID = ?;
    `;

    db.pool.query(query, [serviceID], function(error, results, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {
        res.redirect('services.hbs');
        }
    });
});

// DELETE payment
app.post('/delete-payment/', function(req,res){
    let invoiceID = req.body.invoiceID;
    let query= `DELETE FROM payments WHERE invoiceID = ?`;
    
    db.pool.query(query, [invoiceID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
             res.redirect('payments.hbs');
        }
    });
});

// DELETE wedding service
app.post('/delete-wedding-service', function(req, res) {
    const { weddingID, serviceID } = req.body;

    let query = `DELETE FROM weddingServices WHERE weddingID = ? AND serviceID = ?`;

    db.pool.query(query, [weddingID, serviceID], function(error, rows, fields) {
        if (error) {
            console.error("Error deleting wedding service:", error);
            return res.sendStatus(400);
        } else {
            res.redirect('weddingServices.hbs');  // Redirect back to the page
        }
    });
});



/* LISTENER */
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});