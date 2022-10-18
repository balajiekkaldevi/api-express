import * as mongoose from "mongoose";

export const ITEMSchema = new mongoose.Schema(
    {
        itemno: {type: Number, default: ''},
        itemname: { type: String },
        color:{type:String,default:""},
        expire_date: {type: Date, default: ""},
        weight: { type: Number, default: 0 },
        price:{ type: Number, default: 0 },
        shop_name:{type:String,default:""},
    }, {timestamps: true});

