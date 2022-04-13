"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteService = void 0;
const common_1 = require("@nestjs/common");
const url = "https://api.geoapify.com/v1/routeplanner?apiKey=1b48259b810e48ddb151889f9ea58db0";
let RouteService = class RouteService {
    getRoute() {
        var axios = require('axios');
        var data = JSON.stringify({ "mode": "drive", "agents": [{ "start_location": [10.985736727197894, 48.2649593], "end_location": [10.896261152517647, 48.33227795], "pickup_capacity": 4 }, { "start_location": [10.984995162319564, 48.264409], "end_location": [10.896261152517647, 48.33227795], "pickup_capacity": 7 }, { "start_location": [10.990289270853658, 48.2675442], "end_location": [10.896261152517647, 48.33227795], "pickup_capacity": 4 }, { "start_location": [10.987279662433057, 48.2677992], "end_location": [10.896261152517647, 48.33227795], "pickup_capacity": 7 }, { "start_location": [10.983010635351173, 48.262753950000004], "end_location": [10.896261152517647, 48.33227795], "pickup_capacity": 4 }], "jobs": [{ "location": [10.98698105, 48.25615875], "duration": 300, "pickup_amount": 1 }, { "location": [10.9845547, 48.26311145], "duration": 300, "pickup_amount": 1 }, { "location": [10.984630924828402, 48.263248250000004], "duration": 300, "pickup_amount": 2 }, { "location": [10.968364837855287, 48.262043399999996], "duration": 300, "pickup_amount": 1 }, { "location": [10.984364769628737, 48.25542385], "duration": 300, "pickup_amount": 1 }, { "location": [10.984062746838354, 48.25549435], "duration": 300, "pickup_amount": 1 }, { "location": [10.983802751265776, 48.25558745], "duration": 300, "pickup_amount": 2 }, { "location": [10.983222005227521, 48.255775], "duration": 300, "pickup_amount": 1 }, { "location": [10.983499356818182, 48.25569725], "duration": 300, "pickup_amount": 1 }, { "location": [10.982919152872745, 48.2558497], "duration": 300, "pickup_amount": 1 }, { "location": [10.983681544239769, 48.25621035], "duration": 300, "pickup_amount": 2 }, { "location": [10.983236456481574, 48.2560687], "duration": 300, "pickup_amount": 1 }, { "location": [10.984312143079265, 48.25577875], "duration": 300, "pickup_amount": 1 }, { "location": [10.981143603167904, 48.257296600000004], "duration": 300, "pickup_amount": 1 }, { "location": [10.9807393, 48.25748695], "duration": 300, "pickup_amount": 1 }, { "location": [10.981209348235852, 48.25786594111741], "duration": 300, "pickup_amount": 1 }, { "location": [10.980955539642784, 48.2562265], "duration": 300, "pickup_amount": 1 }, { "location": [10.979089323915998, 48.25726365], "duration": 300, "pickup_amount": 1 }, { "location": [10.979089323915998, 48.25726365], "duration": 300, "pickup_amount": 1 }, { "location": [10.978800955841443, 48.25723825], "duration": 300, "pickup_amount": 1 }] });
        var config = {
            method: 'post',
            url: 'https://api.geoapify.com/v1/routeplanner?apiKey=d8f585e278d14dc3b9062cf387755199',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        return axios(config)
            .then(function (response) {
            console.log(response.data);
            return JSON.stringify(response.data);
        })
            .catch(function (error) {
            console.log(error);
        });
    }
};
RouteService = __decorate([
    (0, common_1.Injectable)()
], RouteService);
exports.RouteService = RouteService;
//# sourceMappingURL=route.service.js.map