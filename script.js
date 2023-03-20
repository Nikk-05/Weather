
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');


search.addEventListener('click', () => {
    let APIkey = '02f4b2cfe8ca34c6cfb342d52d8ebb81';
    let city = document.querySelector('.search-box input').value
    console.log(city)
    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
        .then(response => {
            if(!response.ok) {
                container.style.height = '400px'
                weatherBox.style.display = 'none'
                weatherDetails.style.display = 'none'
                error404.style.display = 'block'
                error404.classList.add('fadeIn')
             throw new Error("City not Found")
            }
            return response.json()
        })
        .then(json => {
            
            error404.style.display = 'none'
            error404.classList.remove('fadeIn')

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature')
            const description = document.querySelector('.weather-box .description')
            const humidity = document.querySelector('.weather-details .humidity span')
            const wind = document.querySelector('.weather-details .wind span')

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                default:
                    image.src = ''
            }

            // Converting temp fahrenheit to celsius
            let temp =parseInt(json.main.temp)
            // console.log(temp)
            // temp = (temp*(5/9) -32)
            // temp = temp.toFixed(1)

            temperature.innerHTML = `${temp}<span>°C</span>`
            description.innerHTML = `${json.weather[0].description}`
            humidity.innerHTML = `${json.main.humidity}%`
            wind.innerHTML = `${parseInt(json.wind.speed)}km/h`

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn')
            weatherDetails.classList.add('fadeIn')
            container.style.height = '590px';
        })
})