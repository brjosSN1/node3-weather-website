//Require Packages
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const { WSAEDESTADDRREQ } = require('constants');




//console.log(__dirname)
//console.log(path.join(__dirname, '../public'));
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const appTitle = 'Weather Request'

const app = express();

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: appTitle,
        name: 'Brian Joseph'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
       title: appTitle,
        name: 'Brian Joseph'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: appTitle,
        name: 'Brian Joseph'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    } 
    
      geocode(req.query.address, (error, {
        lattitude,
        longitude,
        location
    } = {}) => {
        
         if (!error) {
             forecast(longitude, lattitude, (error, wdata) => {
                 //console.log(error);
                 if (error) {
                     res.send({
                         error: error
                     })
                 } 

                res.send({
                         temperature: wdata.current.temperature,
                         feels_like: wdata.current.feelslike,
                         wind_direction: wdata.current.wind_direction,
                         visibility: wdata.current.visibility,
                         outside: wdata.current.weather_descriptions[0],
                         location: location,
                         search: req.query.address
                })
                     
                 
             })
         } else {
             return res.send ({error})
         }


     })
       
    
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: appTitle,
        name: 'Simple App',
        errorMessage: 'Help Article not found!'
    })    
})

app.get('*', (req, res) => {
    res.render('404', {
         title: '404 - page not found!',
         name: 'Simple App',
         errorMessage: 'Page not found!'
    })    
})


app.listen(3000, () => {
    console.log('Web server is up and running...');
})