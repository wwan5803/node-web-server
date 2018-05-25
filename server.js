const express = require('express');
const hbs = require('hbs')
const fs = require('fs')
var app = express();

const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next)=>{
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`
    fs.appendFile('server.log', log + '\n', (err)=>{

    })
    next();

})

// app.use((req, res, next)=>{
//     res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase()
})
app.get('/', (req, res) => {
    res.render('home.hbs', {
        welcomeMessage: 'welcome to my website'
    })
})

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle: 'about page',
    })
})
app.get('/projects', (req, res)=>{
    res.render('project.hbs', {
        pageTitle: 'projects'
    })
})
app.listen(port, ()=>{
    console.log('server is now on port 3000')
})