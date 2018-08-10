//loading express
const express = require('express');

//loading fs
const fs = require('fs');

//loading hbs
const hbs  = require('hbs');

//config for heroku
//const port  = process.env.PORT || 3000;

var app = express();

//partials
hbs.registerPartials(__dirname + '/views/partials');

//view engine
app.set('view engine','hbs');

//to register a middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log',log + '\n' , (err) => {
    if(err){
      console.log('Unable to append to server.log  .');
    }
  });
  next();

});

//middleware for maintenance
// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
// });

//static middleware
app.use(express.static(__dirname+'/public'));

//helper
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

//another helper
hbs.registerHelper('screamIt' , (text) => {
    return text.toUpperCase();
});

app.get('/', ( req , res ) => {
    //res.send('<h1>Hello Express</h1>');
    // res.send({
    //     name:'Subhro',
    //     likes:[ 'Football' , 'WWE' , 'Music'],
    // });
    res.render('home.hbs',{

        pageTitle:'Landing Page',
        pageHeading : 'Welcome to the Node/Express Demo',
        pageParagraph : 'This app in under construction enjoy...',
        authorName : 'Subhro Chatterjee | GraceFull Life'

    });

});

//call another route
app.get('/about', (req,res) => {
    //res.send('About Page');
    res.render('about.hbs',{
      pageTitle : 'This is About Page'
      //currentYear:new Date().getFullYear()
    });//render close

});

//handler for bad request
app.get('/bad', (req,res
) => {
    res.send({
      errorMessage:'Unable to fulfill the request'
    });
});

//app.listen variety
app.listen(3000);

// app.listen(port , () => {
//     console.log(`Server is up and running on port : ${port}`);
// });
