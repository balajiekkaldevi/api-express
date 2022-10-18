"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CUSTOMERSchema = void 0;
const mongoose = require("mongoose");
exports.CUSTOMERSchema = new mongoose.Schema({
    cust_phone: { type: Number, default: '' },
    gender: { type: String },
    location: { type: String, default: "" },
    cust_name: { type: String, default: "" },
    cno: { type: Number, default: 0 }
}, { timestamps: true });
// let CUSTOMER = mongoose.model('CUSTOMER', CUSTOMERSchema);
// module.exports=CUSTOMER
//# sourceMappingURL=customer.js.map