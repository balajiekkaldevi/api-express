"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const mongoose = require("mongoose");
const customer_1 = require("../models/customer");
const item_1 = require("../models/item");
const item_cust_1 = require("../models/item_cust");
const util_1 = require("util");
const customer = mongoose.model('customer', customer_1.CUSTOMERSchema);
const item = mongoose.model('item', item_1.ITEMSchema);
const item_cust = mongoose.model('item_cust', item_cust_1.CUST_ITEMSchema);
class ContactController {
    // ...
    adddata(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("inside insert data", req.body.data);
            let data = req.body.data;
            let inserd;
            for (let i = 0; i < data.length; i++) {
                if (i == 0) {
                    inserd = yield customer.create(data[i]['data']);
                    console.log(inserd);
                }
                else if (i == 1) {
                    // for(let j =0;i<data[1]['data'].length;j++){
                    //     console.log(new Date(data[1]['data'][j]['expire_date']));
                    //     data[1]['data'][j]['expire_date']=new Date(data[1]['data'][j]['expire_date'])
                    // }
                    console.log(data[1]['data']);
                    inserd = yield item.create(data[1]['data']);
                    console.log(inserd);
                }
                else if (i == 2) {
                    // for(let j =0;i<data[2]['data'].length;j++){
                    //     data[2]['data'][j]['date_purchase']=new Date(data[2]['data'][j]['date_purchase'])
                    // }
                    inserd = yield item_cust.create(data[2]['data']);
                    console.log(inserd);
                }
            }
            res.json(data);
        });
    }
    deleteitems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("delete items whose price greater than 5000");
            let priceofitem = req.body.price || 5000;
            let data = yield item.find({ price: { $gte: priceofitem } });
            let query = data.map(a => a.itemno);
            yield item.deleteMany({ itemno: { "$in": query } });
            yield item_cust.deleteMany({ itemno: { "$in": query } });
            res.json(data);
        });
    }
    coloursofitem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("inside get data by colourls");
            let query = {};
            if (!util_1.isNullOrUndefined(req.body.color)) {
                query['color'] = typeof req.body.color == 'object' ? { "$in": req.body.color } : req.body.color;
            }
            //req.body.color||['black','white','brown'];
            let data = yield item.find(query);
            res.json(data);
        });
    }
    custsamelocname(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("inside get customer name whose location is same");
            let query = [
                {
                    "$group": {
                        "_id": "$location",
                        // "location":"$location"
                        name: { "$push": "$$ROOT" },
                        count: {
                            $sum: 1
                        }
                    }
                },
                {
                    "$match": {
                        count: { $gt: 1 }
                    }
                },
                {
                    "$unwind": {
                        "path": "$name",
                    }
                },
                {
                    "$project": {
                        "customerName": "$name.cust_name",
                        "cust_phone": "$name.cust_phone",
                    }
                }
            ];
            let data = yield customer.aggregate(query);
            res.json(data);
        });
    }
    itemnames(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("inside get data by itemnames");
            let data = yield item.find({ itemname: { $regex: /p*s/, $options: "i" } });
            res.json(data);
        });
    }
    weightofitem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("inside get data by itemnames");
            let query = [
                {
                    "$group": {
                        "_id": {},
                        // "location":"$location"
                        weight: { $min: "$weight" },
                        name: { "$push": "$$ROOT" }
                    }
                }
            ];
            let data = yield item.aggregate(query);
            res.json(data);
        });
    }
    listofcustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("inside get data by customer");
            let data = yield item.find({ cust_phone: { $regex: /^99/ } });
            res.json(data);
        });
    }
    totalvaluesforallitems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("inside get data by itemnames");
            let data;
            if (req.body.item) {
                data = yield item.find({});
            }
            else if (req.body.Total) {
                let query = [
                    {
                        "$lookup": {
                            "from": "item_custs",
                            "foreignField": "itemno",
                            "localField": "itemno",
                            "as": "items"
                        }
                    },
                    {
                        "$unwind": {
                            "path": "$items",
                        }
                    },
                    {
                        "$project": {
                            "itemsName": "$itemname",
                            "Total": { "$multiply": ["$items.quantity_purchased", "$price"] },
                        }
                    }
                ];
                data = yield item.aggregate(query);
            }
            res.json(data);
        });
    }
    maxitems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("inside get data by itemnames");
            let query = [
                {
                    "$lookup": {
                        "from": "item_custs",
                        "foreignField": "itemno",
                        "localField": "itemno",
                        "as": "items"
                    }
                },
                {
                    "$unwind": {
                        "path": "$items",
                    }
                },
                {
                    "$project": {
                        "itemsName": "$itemname",
                        "Total": { "$multiply": ["$items.quantity_purchased", "$price"] },
                    }
                }
            ];
            let data = yield item.aggregate(query);
            res.json(data);
        });
    }
}
exports.ContactController = ContactController;
//# sourceMappingURL=ApiController.js.map