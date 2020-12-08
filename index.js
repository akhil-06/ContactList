
const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./cofig/mongoose');
const Contact = require('./models/contact');

const app = express();


app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


var contactList =  [
    {
        name: "Akhil",
        phone: "1111111"
    },
    {
        name: "Tony",
        phone: "222222"
    },
    {
        name : "Ninjas",
        phone: "333333"
    }
]

app.get('/', function(req, res){

    // return res.render('home',{
    //     title : "My Contacts List",
    //     contact_list: contactList
    // }); 

    Contact.find({}, function(err, contacts){
        if(err){
            console.log("error in fetching data from db");
            return;
        }
        return res.render('home',{
            title : "My Contacts List",
            contact_list: contacts
        }); 

    });

    // console.log(__dirname);
    // res.send("<h1> Cool it is running! WOOOW</h1>");
});

//delete with database
app.get("/delete-contact", function(req, res){
   //get the id from query in url
    let id = req.query.id;
//find the contact in db using Id and delete
Contact.findByIdAndDelete(id, function(err){
    if(err){
        console.log('error in deleting an object from db');
        return;
    }

    return res.redirect('/');
    });
});
// //for deleting a contact without database
// app.get("/delete-contact", function(req, res){
//     console.log(req.query);
//     // get the query from url
//     let phone = req.query.phone;

//     let contactIndex = contactList.findIndex(contact => contact.phone == phone);

//     if(contactIndex != -1){
//         contactList.splice(contactIndex, 1);
//     }

//     return res.redirect('/');
// });

app.get('/practice',function(req,res){
    return res.render('practice',{
        title: "lets us play with ejs"
    });
});

app.post('/create-contact', function(req,res){
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);

    //contactList.push({
        Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
            console.log('error in creating a contact');
            return;
        }

        console.log('*******', newContact);
        return res.redirect('/');
    });


//     return res.redirect('/');
//     // //return res.redirect('/practice');
 });

// app.get('/profile', function(req, res){
//     res.send("<h1> We came to the profile page .  yes we did it </h1>");
// });

// app.get('/about', function(req, res){
//     res.send("<h1> How you came here please tell </h1>");
// });



app.listen(port, function(err){
    if(err){
        console.log('error in running server');
    }

    console.log('my server is running on port:', port);
});