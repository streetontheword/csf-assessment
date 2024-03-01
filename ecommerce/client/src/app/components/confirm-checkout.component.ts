import { Component, Input, OnInit, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartStore } from '../cart.store';
import { LineItem } from '../models';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrl: './confirm-checkout.component.css'
})
export class ConfirmCheckoutComponent implements OnInit {

  // TODO Task 3


  form!: FormGroup
  private fb = inject(FormBuilder)

  private store = inject(CartStore)

  private productSvc = inject(ProductService)

  response$!: Observable<LineItem[]>

  sub$!: Subscription

  // itemArray: LineItem[] = []


  itemArray:any[] = []

  ngOnInit(): void {
    
    this.getItemFromStore()
    this.form = this.createForm()


  }

  createForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control<string>('', [Validators.required]),
      address: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      priority: this.fb.control<boolean>(false),
      comments: this.fb.control<string>('')
    })

  }

  // getItemFromStore():any {
  //  console.info("what is this>>>",this.store.getItem())
  //   console.info("HERE in confirm checkout component", this.itemArray)
  // }

  // from dexie store 
  name!: string 
  getItemFromStore() {
   this.sub$= this.store.onEntries.asObservable().subscribe({
      next:((result)=>{
        // console.info("IN CHECKOUT COMPONENT",result)
        this.itemArray = result
        // for (let i of this.itemArray){
        //   this.name = i.name
          

        // }
        console.info("IN CHECKOUT COMPONENT", this.itemArray)
      }), 
      error: ((err)=>{console.info(err)}),
      complete: ()=>{
        this.sub$.unsubscribe
      }
    })
  }


  placeOrder(){
    
    var name = this.form.value["name"]
    var address = this.form.value["address"]
    var comments = this.form.value["comments"]
    var priority = this.form.value['priority']

    const order:  any = {

      "name": name,
      "address": address,
      "priority": priority,
      "comments": comments,
      "cart": this.itemArray
    }
    console.info("what is this?",order)
    this.productSvc.checkout(order)
    .then((result)=>{
      console.info("view fetched date", result)
        const jsonString = JSON.stringify(result)
        alert(jsonString)
    })
      .catch((err) => {
        const jsonString = JSON.stringify(err)
      
      alert(jsonString)
  })

    // this.form.reset()
  }


  // this.newsSvc.saveForm(this.form, this.imageFile)
  // .then((result) => {
  //   console.info("view fetched date", result)
  //   const jsonString = JSON.stringify(result)
  //   alert(jsonString)
  //   this.router.navigate(['/'])

  //   this.displayImg = result.url
  //   console.info('got this url', this.displayImg)
  // })
  // .catch((err) => {
  //   console.info(err)
  // })
 
}
