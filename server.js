const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000; // fetching port from process


var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');  //Setting view engines as hbs or handle bars


app.use(express.static(__dirname+'/public')); //takes middle ware functions

app.use((req,res,next)=>{

    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log',log+'\n');
    console.log(log); 
    next()
});

app.use((req,res,next)=>{
    res.render('maintaince.hbs');
});

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('getScreamer',(txt)=>{
    return txt.toUpperCase();
})
app.get('/',(req,res)=>{ //Sending data to client
    // res.send('<h1>Hello Express!!</h1>'); //sending string to client
    // res.send({
    //     name : 'Lalit',
    //     likes : [
    //         'Cricket',
    //         'Books'
    //     ]
    // })
    res.render('home.hbs',{
        pageTitle : 'Home Page',
        welcomeNote : 'Welcome Page Text lies here!!! !!!!!'
    })
});

app.get('/about',(req,res)=>{     // ROuting the pages
    res.render('about.hbs',{
        pageTitle : 'About Page',
        currentYear : new Date().getFullYear()
    });
})

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage :'Unable to handle request          `'

    })
})

app.listen(port,()=>{
    console.log("***Server is running at localhost:port***")
});
