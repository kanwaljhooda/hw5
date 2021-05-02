// Goal: Implement a weather application using data from an external API
// - Signup for an api key @ https://weatherapi.com
// - The API takes three inputs (querystring parameters)
//   - key = your API key
//   - q = a location query (e.g. Chicago)
//   - days = number of days of forecast data to return, between 1-10
// - Example: https://api.weatherapi.com/v1/forecast.json?key=YOUR-API-KEY&q=Chicago&days=3
// - The basic recipe (algorithm) is included; write the rest of the recipe in the comments!
// - Lab: Follow the provided recipe and the "mock-up" provided in the hard-coded HTML; respond 
//        to the user filling out the location on the form by fetching the weather API and 
//        displaying the city/state, e.g. if the user enters "chicago" on the form, show "Current
//        Weather for Chicago, Illinois".
// - Homework: Complete the application by accepting a number of days; show the current weather 
//             conditions and forecast based on the number of days entered by the user.

window.addEventListener('DOMContentLoaded', async function() {
    // Get a reference to the "get weather" button
    let getWeatherButton = document.querySelector(`.get-weather`)
  
    // When the "get weather" button is clicked:
    getWeatherButton.addEventListener(`click`, async function(event){
  
      // - Ignore the default behavior of the button
      event.preventDefault()
  
      // - Get a reference to the element containing the user-entered location
      let userLocationElement = document.querySelector(`#location`)
  
      // - Get the user-entered location from the element's value
      let userLocation = userLocationElement.value
      console.log(userLocation)
  
      // - Check to see if the user entered a location; if so:
      if (userLocation.length > 0) {
  
        // - Construct a URL to call the WeatherAPI.com API
        let url = `https://api.weatherapi.com/v1/forecast.json?key=bac3198e7251443ab29151447212704&q=${userLocation}&days=3`
  
        // - Fetch the url, wait for a response, store the response in memory
        let response = await fetch(url)
  
        // - Ask for the json-formatted data from the response, wait for the data, store it in memory
        let json = await response.json()
  
        // - Write the json-formatted data to the JavaScript console
        console.log(json)
  
        // - Store the interpreted location, current weather conditions, the forecast as three separate variables
        let location = json.location
        let currentWeather = json.current
        let forecastWeather = json.forecast.forecastday
      
        // Store the city name
        let city = location.name
          
        // Store the state name
        let state = location.region
        
        // Store the current temp
        let currentTemp = currentWeather.temp_f
        
        // Store the current condition
        let currentCondition = currentWeather.condition.text
        
        // Store the current condition image
        let currentImage = currentWeather.condition.icon
          
        // Get reference to the HTML element for the display message
        let currentElement = document.querySelector(`.current`)
  
        // Update message to show the location and its current temp & condition based on user input
        currentElement.innerHTML = 
          `<div class="text-center space-y-2">
          <div class="font-bold text-3xl">Current Weather for ${city}, ${state}</div>
          <div class="font-bold"></div>
          <img src="https:${currentImage}" class="inline-block">
            <span class="temperature font-bold">${currentTemp}</span> 
            <span class="font-bold"">and</span>
            <span class="conditions capitalize font-bold">${currentCondition}</span>
          </div>
        </div>`
        
        // Get a reference to the element containing the user-entered location
        let userLocationElement = document.querySelector(`#days`)
  
        // Get the user-entered location from the element's value
        let userDays = userLocationElement.value
        console.log(userDays)
  
        // Check to see if the user entered 1, 2 or 3; if so:
        if (userDays.length > 0 && (userDays == 1 || userDays == 2 || userDays == 3)) {

          // Create variable for forecast element to add to
          let forecastElement = document.querySelector(`.forecast`)

          // Add header forecast message
          forecastElement.innerHTML = 
          `<div class="text-center space-y-8">
          <div class="font-bold text-3xl">${userDays} Day Forecast</div>
          </div>`

          // Loop through forecastday array based on number of days entered
          for (let i=0; i < userDays; i++) {

            // Create variable to store each forecast day in memory
            let forecast = forecastWeather[i]

            // Create variable for forecast element to add to
            let forecastElement = document.querySelector(`.forecast`)

            // Add forecast day weather info
            forecastElement.insertAdjacentHTML(`beforeend`,  
            `<div class="text-center">
              <img src="https:${forecast.day.condition.icon}" class="mx-auto">
              <h1 class="text-2xl text-bold text-gray-500">${forecast.date}</h1>
              <h2 class="text-xl">High ${forecast.day.maxtemp_f} – Low ${forecast.day.mintemp_f}</h2>
              <p class="text-gray-500 capitalize">${forecast.day.condition.text}</h1>
            </div>`
            )

            
          }}

        // Check if the user entered more than 3 days; if so:
        
        else if (userDays > 3) {

          // Create variable for forecast element to add to
          let forecastElement = document.querySelector(`.forecast`)

          // Let user know that we can only show forecast up to 3 days and show the 3 days forecast
          forecastElement.innerHTML = 
          `<div class="text-center space-y-8">
          <div class="font-bold text-3xl">We can only show forecast for upto 3 days</div>
          <div>
          
          <div class="text-center space-y-8">
          <div class="font-bold text-3xl">3 Day Forecast</div>
          </div>`

          // Loop through forecastday object for 3 days
          for (let i=0; i < 3; i++) {

            // Create variable to store each forecast day in memory
            let forecast = forecastWeather[i]

            // Create variable for forecast element to add to
            let forecastElement = document.querySelector(`.forecast`)

            // Add forecast day weather info
            forecastElement.insertAdjacentHTML(`beforeend`,  
            `<div class="text-center">
              <img src="https:${forecast.day.condition.icon}" class="mx-auto">
              <h1 class="text-2xl text-bold text-gray-500">${forecast.date}</h1>
              <h2 class="text-xl">High ${forecast.day.maxtemp_f} – Low ${forecast.day.mintemp_f}</h2>
              <p class="text-gray-500 capitalize">${forecast.day.condition.text}</h1>
            </div>`
            )
           
          }
        
        }
        
        // For all other entries (e.g. 0, blank or not a whole number etc.)

        else {

          // Create variable for forecast element to add to
          let forecastElement = document.querySelector(`.forecast`)

          // Add message to guide user input for days
          forecastElement.innerHTML = 
          `<div class="text-center space-y-8">
          <div class="font-bold text-3xl">Please enter number of days (1, 2 or 3) to see the forecast for ${city}, ${state}!</div>
          <div>`

        }  
                  
      }

      // For empty location value 
      
      else {
        // Get reference to the HTML element for the display message
        let currentElement = document.querySelector(`.current`)
  
        // Update message to show the new location and its current temp & condition based on user input
        currentElement.innerHTML = 
          `<div class="text-center space-y-2">
          <div class="font-bold text-3xl">Please enter a city name to continue</div>
          </div>`
      }
  })
  
  })