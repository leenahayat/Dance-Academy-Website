const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
mongoose.connect('mongodb://localhost/contactDance')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection failed:', err));

const port = 3000;

// Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    email: String,
    desc: String
});

const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded({ extended: true })); // Built-in body parser

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // Set the template engine as Pug
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    res.status(200).render('home.pug');
});

app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug');
});

app.get('/about', (req, res) => {
    res.status(200).render('about.pug');
});

app.get('/services', (req, res) => {
    res.status(200).render('services.pug');
});

app.post('/contact', async (req, res) => {
    try {
        const myData = new Contact(req.body);
        await myData.save();
        res.send("This item has been saved to the database");
    } catch (err) {
        console.error(err);
        res.status(400).send("Item was not saved to the database");
    }
});

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});