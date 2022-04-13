import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs'
import { join } from 'path'
import { resourceLimits } from 'worker_threads';


const url = "https://api.geoapify.com/v1/routeplanner?apiKey=1b48259b810e48ddb151889f9ea58db0"

@Injectable()
export class RouteService {
  getRoute() {
    // // const request = JSON.stringify(readFileSync(join('src', 'route', "/request.json"), "utf8"))
    // const request = JSON.stringify({"mode":"drive","agents":[{"start_location":[10.985736727197894,48.2649593],"end_location":[10.896261152517647,48.33227795],"pickup_capacity":4},{"start_location":[10.984995162319564,48.264409],"end_location":[10.896261152517647,48.33227795],"pickup_capacity":7},{"start_location":[10.990289270853658,48.2675442],"end_location":[10.896261152517647,48.33227795],"pickup_capacity":4},{"start_location":[10.987279662433057,48.2677992],"end_location":[10.896261152517647,48.33227795],"pickup_capacity":7},{"start_location":[10.983010635351173,48.262753950000004],"end_location":[10.896261152517647,48.33227795],"pickup_capacity":4}],"jobs":[{"location":[10.98698105,48.25615875],"duration":300,"pickup_amount":1},{"location":[10.9845547,48.26311145],"duration":300,"pickup_amount":1},{"location":[10.984630924828402,48.263248250000004],"duration":300,"pickup_amount":2},{"location":[10.968364837855287,48.262043399999996],"duration":300,"pickup_amount":1},{"location":[10.984364769628737,48.25542385],"duration":300,"pickup_amount":1},{"location":[10.984062746838354,48.25549435],"duration":300,"pickup_amount":1},{"location":[10.983802751265776,48.25558745],"duration":300,"pickup_amount":2},{"location":[10.983222005227521,48.255775],"duration":300,"pickup_amount":1},{"location":[10.983499356818182,48.25569725],"duration":300,"pickup_amount":1},{"location":[10.982919152872745,48.2558497],"duration":300,"pickup_amount":1},{"location":[10.983681544239769,48.25621035],"duration":300,"pickup_amount":2},{"location":[10.983236456481574,48.2560687],"duration":300,"pickup_amount":1},{"location":[10.984312143079265,48.25577875],"duration":300,"pickup_amount":1},{"location":[10.981143603167904,48.257296600000004],"duration":300,"pickup_amount":1},{"location":[10.9807393,48.25748695],"duration":300,"pickup_amount":1},{"location":[10.981209348235852,48.25786594111741],"duration":300,"pickup_amount":1},{"location":[10.980955539642784,48.2562265],"duration":300,"pickup_amount":1},{"location":[10.979089323915998,48.25726365],"duration":300,"pickup_amount":1},{"location":[10.979089323915998,48.25726365],"duration":300,"pickup_amount":1},{"location":[10.978800955841443,48.25723825],"duration":300,"pickup_amount":1}]});
    // // return JSON.stringify(request)

    // var fetch = require('node-fetch');
    // const requestOptions = {
    //   method: 'POST',
    //   headers:  { 
    //     'Content-Type': 'application/json'
    //   },
    //   body: request
    // };

    // return JSON.stringify(await fetch(url, requestOptions).then(response => response.json()))
    var axios = require('axios');
    var data = JSON.stringify({"mode":"drive","agents":[{"start_location":[10.985736727197894,48.2649593],"end_location":[10.896261152517647,48.33227795],"pickup_capacity":4},{"start_location":[10.984995162319564,48.264409],"end_location":[10.896261152517647,48.33227795],"pickup_capacity":7},{"start_location":[10.990289270853658,48.2675442],"end_location":[10.896261152517647,48.33227795],"pickup_capacity":4},{"start_location":[10.987279662433057,48.2677992],"end_location":[10.896261152517647,48.33227795],"pickup_capacity":7},{"start_location":[10.983010635351173,48.262753950000004],"end_location":[10.896261152517647,48.33227795],"pickup_capacity":4}],"jobs":[{"location":[10.98698105,48.25615875],"duration":300,"pickup_amount":1},{"location":[10.9845547,48.26311145],"duration":300,"pickup_amount":1},{"location":[10.984630924828402,48.263248250000004],"duration":300,"pickup_amount":2},{"location":[10.968364837855287,48.262043399999996],"duration":300,"pickup_amount":1},{"location":[10.984364769628737,48.25542385],"duration":300,"pickup_amount":1},{"location":[10.984062746838354,48.25549435],"duration":300,"pickup_amount":1},{"location":[10.983802751265776,48.25558745],"duration":300,"pickup_amount":2},{"location":[10.983222005227521,48.255775],"duration":300,"pickup_amount":1},{"location":[10.983499356818182,48.25569725],"duration":300,"pickup_amount":1},{"location":[10.982919152872745,48.2558497],"duration":300,"pickup_amount":1},{"location":[10.983681544239769,48.25621035],"duration":300,"pickup_amount":2},{"location":[10.983236456481574,48.2560687],"duration":300,"pickup_amount":1},{"location":[10.984312143079265,48.25577875],"duration":300,"pickup_amount":1},{"location":[10.981143603167904,48.257296600000004],"duration":300,"pickup_amount":1},{"location":[10.9807393,48.25748695],"duration":300,"pickup_amount":1},{"location":[10.981209348235852,48.25786594111741],"duration":300,"pickup_amount":1},{"location":[10.980955539642784,48.2562265],"duration":300,"pickup_amount":1},{"location":[10.979089323915998,48.25726365],"duration":300,"pickup_amount":1},{"location":[10.979089323915998,48.25726365],"duration":300,"pickup_amount":1},{"location":[10.978800955841443,48.25723825],"duration":300,"pickup_amount":1}]});

    var config = {
      method: 'post',
      url: 'https://api.geoapify.com/v1/routeplanner?apiKey=d8f585e278d14dc3b9062cf387755199',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    return axios(config)
    .then(function (response) {
      console.log(response.data);
      return JSON.stringify(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }  
}
