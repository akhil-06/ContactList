// require the library
const mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb://localhost/contacts_list_db');

//acquire the coonection(to check if it is succesfull)
const db = mongoose.connection;

//error
db.on('error', console.error.bind(console, 'error connecting to db'));

// up nad running then print a message 
db.once('open', function(){
    console.log('succesfully connected to the database');
});