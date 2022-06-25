const express = require("express");
const { json} = require("express");
const flights = require("./flight.json")
const fs = require("fs")

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get('/flights', (req, res) => {
    //res.send('lets fly baby')
    console.log({flights})
    return res.json({flights})
})

//create new flight-schedule
app.post('/flights', (req, res) => {
    //console.log(req.body.newFlight)    
    flights.push(req.body.newFlight)

    //console.log({flights})
    return res.status(200).json({mssg: "new flight scheduled"})
   
    //stringify json data and update from postman
    let stringedData = JSON.stringify(flights);
    fs.writeFileSync('flights.json', stringedData, (err) => {
        if (err) {
            return res.status(500).json({mssg: err})
        }
    })
    
})

//to fetch single flight
app.get('/flights/:title', (req, res) => {
    let title = req.params.title;
    //find flight with title
    let foundflight = flights.find((flight) => {
        return String(flight.title) === title
    })
    if (foundflight){
    return res.status(200).json({flight: foundflight})
    } else {
        return res.status(404).json({mssg: "No Flight schedule"} )
    }

})

app.delete('/flights/:title', (req, res) => {
    let title = req.params.title;
    //delete flight with title
   const flights = flights.find((flight) => flight.title === title);
    flights.splice(flights.indexOf(flights), 1);
    
    return res.status(200).json({mssg: "flightdeleted", flights})
})
    
    
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
