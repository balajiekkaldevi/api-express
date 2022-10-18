"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ITEMSchema = void 0;
const mongoose = require("mongoose");
exports.ITEMSchema = new mongoose.Schema({
    itemno: { type: Number, default: '' },
    itemname: { type: String },
    color: { type: String, default: "" },
    expire_date: { type: Date, default: "" },
    weight: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    shop_name: { type: String, default: "" },
}, { timestamps: true });
//# sourceMappingURL=item.js.map