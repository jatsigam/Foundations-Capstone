const button = document.querySelector('.button')
const city_input = document.querySelector('.city')
const icon = "http://openweathermap.org/img/wn/10d@2x.png"
const key = config.API_KEY


function populate(city_value, removeOthers = false) {
    var city = city_input.value || city_value
    console.log({ city })
    if (removeOthers === true) {
        const existingItems = document.querySelectorAll('.resultContainer')
        existingItems.forEach((item) => {
            item.remove()
        })
    }

    if (!document.querySelector(`.resultContainer[city="${city}"]`)) {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' +
            city
            + key)
            .then(res => res.json())
            .then(data => {
                var container = document.createElement('div')
                container.setAttribute('class', 'resultContainer')
                container.setAttribute('city', city)

                var icon = document.createElement('img')
                icon.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"

                var name = document.createElement('h1')
                name.innerHTML = data.name;

                var temp = document.createElement('p')
                temp.innerHTML = Math.round(data.main.temp) + "°F";

                var desc = document.createElement('p')
                desc.innerHTML = data.weather[0].description;

                var forecast = document.createElement('h3')
                forecast.innerHTML = 'Forecast'

                var max = document.createElement('p')
                max.innerHTML = 'Max: ' + Math.round(data.main.temp_max) + " °F"

                var min = document.createElement('p')
                min.innerHTML = 'Min: ' + Math.round(data.main.temp_min) + " °F"

                var windTitle = document.createElement('h3')
                windTitle.innerHTML = 'Wind Speed'

                var wind = document.createElement('p')
                wind.innerHTML = data.wind.speed + ' m/s'

                var favButton = document.createElement('button')
                favButton.innerHTML = 'Add To Favorites'
                favButton.setAttribute('class', 'favButton')


                container.appendChild(icon)
                container.appendChild(name)
                container.appendChild(temp)
                container.appendChild(desc)
                container.appendChild(forecast)
                container.appendChild(max)
                container.appendChild(min)
                container.appendChild(windTitle)
                container.appendChild(wind)
                container.appendChild(favButton)
                container.style.display = 'block'
                document.querySelector('.results').appendChild(container)

                // Favorites 

                favButton.addEventListener('click', function () {
                    console.log('click')
                    axios.post('/favorites', {
                        city: city,
                    })
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                })

            })
            .catch(err => alert('Wrong city name'))
    }

}
button.addEventListener('click', () => {
    populate(null, true)
})


if (location.pathname === "/favorites") {
    document.body.classList.add('favoritesPage')
    axios.get("/favoritesData")
        .then(function (response) {
            const favoritesArray = response.data
            favoritesArray.forEach((city) => {
                populate(city)
            })
        })
        .catch(function (error) {
            console.log(error);
        })
}
