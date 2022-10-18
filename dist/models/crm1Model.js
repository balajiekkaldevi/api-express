"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrmSchema = void 0;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.CrmSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    lastName: {
        type: String,
        required: 'Enter a last name'
    },
    email: {
        type: String
    },
    company: {
        type: String
    },
    phone: {
        type: Number
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
//# sourceMappingURL=crm1Model.js.map