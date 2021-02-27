const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const request = require('superagent');



const { formattedLocation, mungeWeather, mungeYelp } = require('./MungeFunctions');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));


app.get('/location', async(req, res) => {
  try {
    
    const cityName = req.query.search;
    
    
    const locationData = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.GEOLOCAL_API_KEY}=${cityName}&format=json`);

    const formattedResponse = formattedLocation(locationData.body);

    res.json(formattedResponse);
  } catch (e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;


app.get('/weather', async(req, res) => {
  try {
    
    const lat = req.query.latitude;
    const lon = req.query.longitude;

    const weatherData = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`);

    const response = mungeWeather(weatherData.body);
    
    res.json(response);
  } catch (e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;

app.get('/reviews', async(req, res) => {
  try {
    
    const lat = req.query.latitude;
    const lon = req.query.longitude;
   
    const yelpData = await request.get(`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}`)
      .set('Authorization', `Bearer ${process.env.YELP_API_KEY}`)
      .set('Accept', 'application/json');

    const response = mungeYelp(yelpData.body);
    
    res.json(response);
  } catch (e) {
    
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;

// app.get('/trails', async(req, res) => {
//   try {
    
//     const stateCode = req.query.stateCode;

   
//     const npsData = await request.get(`https://developer.nps.gov/api/v1/campgrounds?stateCode=${stateCode}&limit=5&api_key=${process.env.NPS_API_KEY}`);
      
    
     
    
//     const response = mungeNps(npsData.body);
    
//     res.json(response);
//   } catch (e) {
    
//     res.status(500).json({ error: e.message });
//   }
// });

// app.use(require('./middleware/error'));

// module.exports = app;