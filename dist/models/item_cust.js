"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CUST_ITEMSchema = void 0;
const mongoose = require("mongoose");
exports.CUST_ITEMSchema = new mongoose.Schema({
    itemno: { type: Number, default: '' },
    cno: { type: Number, default: '' },
    quantity_purchased: { type: Number, default: "" },
    date_purchase: { type: Date, default: "" },
}, { timestamps: true });
//# sourceMappingURL=item_cust.js.map