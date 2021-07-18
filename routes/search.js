const router = require('express').Router();
const request = require('request')
const fs = require('fs')

var info = {
    "location": {
        "lon": 0,
        "lat": 0
    },
    "temp":{
        "minTemp": 0,
        "maxTemp":0
    },
    "wind":{
        "speed": 0,
        "deg": 0
    },
    "name": "Damascus",
    "humidity": 0
}
// Landing page
router.get('/', (req, res) => {
    res.render('index', { info })
})

router.post('/search', (req, res) => {

    const query = req.body.query
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${process.env.API_KEY}`

    console.log(url)

    request(url, (error, response, body) => {
        
        // handle the error
        if(error){ 
            console.log(error)
            res.end()
        }


        data = JSON.parse(body)

        const { lon, lat } = data.coord

        const  maxTemp = int(data.main.temp_max - 272);
        const  minTemp = int(data.main.temp_min - 272);

        const city_name = data.name 

        const { speed, deg } = data.wind 

        info = {
            "location": {
                lon,
                lat
            },
            "temp":{
                minTemp,
                maxTemp
            },
            "wind":{
                speed,
                deg
            },
            "name": city_name,
            "humidity": data.main.humidity
        }

        console.log(info)

        res.render('index', { info })

    })
})


module.exports = router