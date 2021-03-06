const fs = require('fs');
const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3000;

var app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});
// hbs.registerHelper('screamIt', (text) => {
//     return text.toUpperCase();
// });

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = now + ' ' + req.method + ' ' + req.url;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server log');
        }
    });
    next();
});

//Use when site is in maintenance
// app.use((req, res, next) => {
//    res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to DeBytter!'
    });
    console.log("Index Page served");
});

app.get('/projects', (req, res) => {
   res.render('projects.hbs', {
       pageTitle: 'Projects'
   });
   console.log("Project Page served");
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
    console.log("About Page served");
});

app.get('/bad', (req, res) => {
   res.send({
       errorMessage: 'Unable to handle request'
   });
   console.log("Bad Page served");
});

app.listen(port, () => {
    console.log('Server is up on port', port);
});