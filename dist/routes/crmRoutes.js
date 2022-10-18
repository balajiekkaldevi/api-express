"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const crmController_1 = require("../controllers/crmController");
class Routes {
    constructor() {
        this.contactController = new crmController_1.ContactController();
    }
    routes(app) {
        app.route('/crm')
            .post(this.contactController.addNewCrm);
        app.route('/contact')
            .post(this.contactController.addNewContact);
        app.route('/contact')
            .get(this.contactController.getContacts);
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            });
        });
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
exports.Routes = Routes;
//# sourceMappingURL=crmRoutes.js.map