// mongoose required
const mongoose = require('mongoose');

//created schema here
const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone: {
            type: String,
            required: true
    }
});

//
const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;