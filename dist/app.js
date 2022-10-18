"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const ApiRoutes_1 = require("./routes/ApiRoutes");
//const data= require('../dbdata.json');
const mongoose = require("mongoose");
class App {
    constructor() {
        this.mongoUrl = 'mongodb://server:server@localhost:27017/tatacomm-test';
        this.routePrv = new ApiRoutes_1.Routes();
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
        //this.insertdataintodb()
    }
    mongoSetup() {
        // mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map