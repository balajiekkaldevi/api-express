import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/ApiRoutes";
//const data= require('../dbdata.json');
import * as mongoose from "mongoose";


class App {
    public mongoUrl: string = 'mongodb://server:server@localhost:27017/tatacomm-test';
    public app: express.Application;
    public routePrv: Routes = new Routes();

    constructor() {
        this.app = express(); 
        this.config();  
        this.routePrv.routes(this.app); 
        this.mongoSetup();
        //this.insertdataintodb()
    }
     private mongoSetup(): void{
        // mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
        
    }
    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    // async insertdataintodb(){
    //     let db=await mongoose.connect(this.mongoUrl);
    //     for(let i=0;i<data.data.length;i++){
    //         console.log(data.data[i])
    //     }
    // }

}

export default new App().app;