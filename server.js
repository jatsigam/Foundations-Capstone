const express = require('express');
const fs = require('fs');
const app = express();
const favorites = []

app.listen(5000, () => console.log('Listening on port 5000'))
app.use(express.json());

app.get(['/', '/favorites'], (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.use(express.static(__dirname))

app.post('/favorites', (req, res) => {
    const favCity = req.body.city
    if (!favorites.includes(favCity)) {
        favorites.push(favCity)
    }
    res.send('Favorite saved')
})

app.get('/favoritesData', (req, res) => {
    res.send(favorites)

})


