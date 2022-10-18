import { ContactController } from "../controllers/ApiController";


import {Request, Response} from "express";

export class Routes {
    public contactController: ContactController = new ContactController();

    public routes(app): void {
        app.route('/insertdata')
        .post(this.contactController.adddata);

        app.route('/deleteitems')
        .delete(this.contactController.deleteitems);
        app.route('/custsamelocname')
        .get(this.contactController.custsamelocname);
        app.route('/coloursofitem')
        .get(this.contactController.coloursofitem);
        
        app.route('/itemnames')
        .get(this.contactController.itemnames);

        app.route('/weightofitem')
        .get(this.contactController.weightofitem);

        app.route('/listofcustomer')
        .get(this.contactController.listofcustomer);

        app.route('/totalvaluesforallitems')
        .get(this.contactController.totalvaluesforallitems);

        app.route('/maxitems')
        .get(this.contactController.maxitems);
        
        app.route('/')
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })
/*
        // Contact
        // app.route('/contact')
        // // GET endpoint
        // .get((req: Request, res: Response) => {
        // // Get all contacts
        //     res.status(200).send({
        //         message: 'contact GET request successfulll!!!!'
        //     })
        // })
        // POST endpoint
        .post((req: Request, res: Response) => {
        // Create new contact
            res.status(200).send({
                message: 'POST request successfulll!!!!'
            })
        })

        // Contact detail
        app.route('/contact/:contactId')
        // get specific contact
        .get((req: Request, res: Response) => {
        // Get a single contact detail
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })
        .put((req: Request, res: Response) => {
        // Update a contact
            res.status(200).send({
                message: 'PUT request successfulll!!!!'
            })
        })
        .delete((req: Request, res: Response) => {
        // Delete a contact
            res.status(200).send({
                message: 'DELETE request successfulll!!!!'
            })
        })*/
    }
}