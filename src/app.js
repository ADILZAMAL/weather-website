const express = require('express');
const path = require('path');
const hbs = require('hbs');
const axios = require('axios');
const forCasts = require('./util/forcast');
const geoTag = require('./util/geotag');
console.log(forCasts)
//path for static content 
const publicDir = path.join(__dirname, '../public');

//path for dynamic content which is inside template folder
const viewDirPath = path.join(__dirname, './../template/views');

//path for partial content
const partialDirPath = path.join(__dirname, './../template/partials');

//Initialise express and port
const app = express();
const port = process.env.PORT || 3000;

//config express
app.set('view engine', 'hbs'); 
app.set('views', viewDirPath); //set path for dynamic content which express will look by default express looks for an folder views but we can change
hbs.registerPartials(partialDirPath);

//static content
app.use(express.static(publicDir)); //set path for static content


//
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        message:'Use this site to get your weather!',
        name: 'Adil zamal'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name:'Adil Zamal'
    })
});
app.get('/weather', (req, res) => {
    if (!req.query.address)
        return res.send({
            error: 'You must provide address'
        })
    geoTag(req.query.address, (error, data) => {
        if (error) {
            res.send({ error });
            return;
        }
        else {
            forCasts(data.lat, data.lng, (error, forCastData) => {
                if (error) {
                    res.send({error})
                    return ;
                }
                else {
                    res.send({
                        location: data.location,
                        forCastData:forCastData
                    })
                    return ;
                }
            })
        }
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Need help',
        title: 'help',
        name:'Adil zamal'
    })
})
app.get('/help/*', (req, res) => {
    res.render('error', {
        error:'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        error:'404: Page not found!...'
    })
})

app.listen(port, () => {
    console.log('server is up on port '+port)
})