const mongoose = require("mongoose");

export const CUSTOMERSchema = new mongoose.Schema(
    {
        cust_phone: {type: Number, default: ''},
        gender: { type: String },
        location:{type:String,default:""},
        cust_name: {type: String, default: ""},
        cno: { type: Number, default: 0 }
    }, {timestamps: true});


// let CUSTOMER = mongoose.model('CUSTOMER', CUSTOMERSchema);
// module.exports=CUSTOMER