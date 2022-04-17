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
const path_1 = require("path");
const url = 'https://api.geoapify.com/v1/routeplanner?apiKey=d8f585e278d14dc3b9062cf387755199';
const myAPIKey = "d8f585e278d14dc3b9062cf387755199";
let RouteService = class RouteService {
    getRoute() {
        var axios = require('axios');
        var fs = require('fs');
        const data = fs
            .readFileSync((0, path_1.join)('src', 'route', '/request.json'), 'utf8')
            .toString();
        var config = {
            method: 'post',
            url: 'https://api.geoapify.com/v1/routeplanner?apiKey=d8f585e278d14dc3b9062cf387755199',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
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