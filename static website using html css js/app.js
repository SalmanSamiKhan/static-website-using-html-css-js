const express = require("express");
const path = require("path");
const fs = require('fs');
const app = express();

//Mongoose
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/contactdb', { useNewUrlParser: true });

const port = 80;

// Define mongoose schema

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

//Compiling schema into model
const Contact = mongoose.model('Contact', contactSchema);



// EXPRESS CONFIG
app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded());

// HTML Config with ejs

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));

//ENDPOINTS

//home
app.get('/', (req, res) => {
    const params = {}//'message': 'This is code academy'
    res.status(200).render('home.html', params);
})

app.post('/contact', (req, res) => {
    const myData = Contact(req.body);
    myData.save().then(() => {
        res.send("Item saved in the db");
    }).catch(() => {
        res.status(400).send("Item not saved in db");
    })
})


// START THE SERVER
app.listen(port, () => {
    console.log(`The app started successfully using port ${port}`);
});