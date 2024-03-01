

import { Injectable } from "@angular/core";
import Dexie from "dexie";
import { Cart, LineItem } from "./models";
import { Subject } from "rxjs";
// TODO Task 2
// Use the following class to implement your store

@Injectable()
export class CartStore extends Dexie {

    items!: Dexie.Table<LineItem, number>


    onEntries = new Subject<LineItem[]>


    constructor(){
        super('cartDB')
        this.version(2).stores({
            "items": 'prodId'
        })

        this.items = this.table("items")

        this.getItem().then(
            (result) => this.onEntries.next(result)
        )
        
    }

    async addItems(lineItem: LineItem): Promise<any> {
        await this.items.add(lineItem)
        // console.info("ok")
        const addItem = await this.items.toArray()
        this.onEntries.next(addItem)
        // console.info("still ok")
    }



    getItem(): Promise<any>{
        return this.items.toArray()
    }

    // lineItemArray: LineItem[]=[]

    // itemRetrieved  : any[]=[]
    
    // name!: string
    // qty!: number 

    // priceOfProd!: number

    // // lineItem!: LineItem


    // addItems(lineItem: LineItem){
    //     this.lineItemArray.push(lineItem)   
    //     console.info("SAVED!!>>>>", this.lineItemArray)  
    //     for(let i of this.lineItemArray){
    //         this.qty = i.quantity
    //         // console.info(this.qty)
    //         this.name = i.name
    //         this.priceOfProd = i.price          
    //     }
    // }


    // getItem(): any{
    //     console.info("i am here!!")
    //      for(let i of this.lineItemArray){
    //         console.info(i)
    //         this.qty = i.quantity
    //         this.name = i.name
    //         this.priceOfProd = i.price   
    //         this.itemRetrieved.push(i)      
    //     }
    //     console.info("itemretrieved>>> from service", this.itemRetrieved)
        

        
    //     }

    

}
