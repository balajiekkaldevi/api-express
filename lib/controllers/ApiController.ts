
import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { CUSTOMERSchema } from '../models/customer';
import { ITEMSchema } from '../models/item';
import { CUST_ITEMSchema } from '../models/item_cust'
import { isNullOrUndefined } from 'util';
const customer = mongoose.model('customer', CUSTOMERSchema);
const item = mongoose.model('item', ITEMSchema);
const item_cust = mongoose.model('item_cust', CUST_ITEMSchema);
export class ContactController{
// ...
public async adddata (req: Request, res: Response) {
    console.log("inside insert data",req.body.data)
    let data=jsondata.data
    let inserd;
    for(let i=0;i<data.length;i++){
        if(i==0){
            inserd = await customer.create(data[i]['data']);
            console.log(inserd);
        }
        else if(i==1){
            // for(let j =0;i<data[1]['data'].length;j++){
            //     console.log(new Date(data[1]['data'][j]['expire_date']));
            //     data[1]['data'][j]['expire_date']=new Date(data[1]['data'][j]['expire_date'])
            // }
            console.log(data[1]['data']);
            inserd = await item.create(data[1]['data']);
            console.log(inserd);
        }
        else if(i==2){
            // for(let j =0;i<data[2]['data'].length;j++){
            //     data[2]['data'][j]['date_purchase']=new Date(data[2]['data'][j]['date_purchase'])
            // }
            inserd = await item_cust.create(data[2]['data']);
            console.log(inserd);
        }
    }
    res.json(data);
}
public async deleteitems (req: Request, res: Response) {
    console.log("delete items whose price greater than 5000");
    let priceofitem=req.body.price ||5000;
    let data = await item.find( { price: { $gte: priceofitem} } );
    let query=data.map(a=>a.itemno)
    await item.deleteMany({itemno:{"$in":query}});
    await item_cust.deleteMany({itemno:{"$in":query}})
    res.json(data);
}


public async coloursofitem (req: Request, res: Response) {
    console.log("inside get data by colourls");
    let query={}
    if(!isNullOrUndefined(req.body.color)){
        query['color']=typeof req.body.color=='object'?{"$in":req.body.color}:req.body.color;
    }
    //req.body.color||['black','white','brown'];
    let data = await item.find(query);
    res.json(data);
}

public async custsamelocname (req: Request, res: Response) {
    console.log("inside get customer name whose location is same");
    let query=[
        {
        "$group":{
            "_id":"$location",
            // "location":"$location"
            name:{"$push":"$$ROOT"},
            count: {
                  $sum: 1
                }
        }
            
        },
        {
            "$match":{
                count:{$gt:1}
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
    ]
    let data = await customer.aggregate(query);
    res.json(data);
}
public async itemnames (req: Request, res: Response) {
    console.log("inside get data by itemnames");
    let data = await item.find({ itemname: { $regex: /p*s/, $options: "i" } });
    res.json(data);
}
public async weightofitem (req: Request, res: Response) {
    console.log("inside get data by itemnames");
    let query=[
        {
        "$group":{
            "_id":{},
            // "location":"$location"
            weight: { $min: "$weight" },
            name:{"$push":"$$ROOT"}
        }
    }
]
    let data = await item.aggregate(query);
    res.json(data);
}

public async listofcustomer (req: Request, res: Response) {
    console.log("inside get data by customer");
    let data = await item.find({ cust_phone: { $regex: /^99/} });
    res.json(data);
}

public async totalvaluesforallitems (req: Request, res: Response) {
    console.log("inside get data by itemnames");
   let data;
   if(req.body.item){
    data = await item.find({});
   }
   else if(req.body.Total){
    let query=[
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
                   "Total": {"$multiply":["$items.quantity_purchased","$price"]},
               }
               }
           
   ]
   data = await item.aggregate(query);
}
    
    res.json(data);
}

public async maxitems (req: Request, res: Response) {
    console.log("inside get data by itemnames");
    let query=[
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
                   "Total": {"$multiply":["$items.quantity_purchased","$price"]},
               }
               }
           
   ]
   let data = await item.aggregate(query);
   res.json(data);
}
}

