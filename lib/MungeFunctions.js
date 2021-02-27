function formattedLocation(data) {
  return {
    formatted_query: data[0].display_name,
    latitude: data[0].lat,
    longitude: data[0].lon
  };
}

function mungeWeather(weatherData) {
  const formattedResponse = weatherData.data.map(weatherItem => {
    return {
      forecast: weatherItem.weather.description,
      time: new Date(weatherItem.ts * 1000).toDateString(),
    };
  });

  const response = formattedResponse.slice(0, 7);
  return response;

}

function mungeYelp(yelpData) {
  
  return yelpData.businesses.map(yelpItem => {
    return {
      name: yelpItem.name,
      image_url: yelpItem.image_url,
      price: yelpItem.price,
      rating: yelpItem.rating,
      url: yelpItem.url
    };
  });
}

function mungeNps(npsData) {
  
  return npsData.data.map(npsItem => {
    return {
      name: npsItem.addresses[1],
      location: npsItem.addresses[3] 
    };
  });
    
  
      
}


module.exports = {
  formattedLocation,
  mungeWeather,
  mungeYelp,
  mungeNps
};