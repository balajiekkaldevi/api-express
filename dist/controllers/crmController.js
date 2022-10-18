"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const mongoose = require("mongoose");
const crmModel_1 = require("../models/crmModel");
const crm1Model_1 = require("../models/crm1Model");
const Contact = mongoose.model('Contact', crmModel_1.ContactSchema);
const crm = mongoose.model('crm', crm1Model_1.CrmSchema);
class ContactController {
    // ...
    addNewCrm(req, res) {
        let newContact = new crm(req.body);
        console.log(newContact);
        newContact.save((err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }
    addNewContact(req, res) {
        let newContact = new Contact(req.body);
        console.log(newContact);
        newContact.save((err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }
    getContacts(req, res) {
        console.log("inside getcontacts");
        Contact.find({}, (err, contact) => {
            if (err) {
                res.send(err);
            }
            console.log(contact);
            res.json(contact);
        });
    }
}
exports.ContactController = ContactController;
//# sourceMappingURL=crmController.js.map