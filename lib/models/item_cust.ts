import * as mongoose from "mongoose";
export const CUST_ITEMSchema = new mongoose.Schema(
    {
        itemno: {type: Number, default: ''},
        cno: {type: Number, default: ''},
        quantity_purchased:{type:Number,default:""},
        date_purchase: {type: Date, default: ""},
    }, {timestamps: true});

