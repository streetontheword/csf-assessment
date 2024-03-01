import { Component, Input, OnInit, inject, input } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import { CartStore } from './cart.store';
import { LineItem } from './models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  // NOTE: you are free to modify this component

  private router = inject(Router)
  private store = inject(CartStore)

  response$!: Observable<LineItem[]>

  sub$!: Subscription

  itemCount!: number

  // @Input()
  lineItems: LineItem[]=[]


  ngOnInit(): void {
  
   this.getItemFromStore()
  //  this.store.getItem()

  }


  checkout(): void {
    //get item from dexie store | how to pass to the other component 
    if(this.lineItems.length <=0 ){
       alert("Cart is empty")
    
    }
    this.router.navigate(['/checkout'])
    
  }



  
  getItemFromStore() {
    // this.store.getItem()
    // .then((result) => {
    //   console.info("view fetched date", result)
    //   this.lineItems = result
    //   console.info("item array", this.lineItems)
    // }
    // )
    this.sub$= this.store.onEntries.asObservable().subscribe({
       next:((result)=>{
         // console.info("IN CHECKOUT COMPONENT",result)
         this.lineItems = result
         console.info("array>>>", this.lineItems)
       }), 
       error: ((err)=>{console.info(err)}),
       complete: ()=>{
         this.sub$.unsubscribe
       }
     })
 
   }




}
