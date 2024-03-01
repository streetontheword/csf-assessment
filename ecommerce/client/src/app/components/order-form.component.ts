import { Component, Input, OnInit, Output, inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LineItem} from '../models';
import { CartStore } from '../cart.store';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent implements OnInit {

  // NOTE: you are free to modify this component

  private fb = inject(FormBuilder)
  private store = inject(CartStore)

  @Input({ required: true })
  productId!: string

  @Input({ required: true })
  price!: number

  @Input({ required: true })
  quantity!: string

  @Input({ required: true })
  brand!: string

  @Input({ required: true })
  name!: string

  @Input({ required: true })
  discount!: number

  form!: FormGroup
  


  ngOnInit(): void {
    this.form = this.createForm()
    

  }

  addToCart() {
    const lineItem: any = {      //{prodId: '65e12e02ba6a55ae7643841a', quantity: 3, name: '', price: 0}
      prodId: this.productId,
      quantity: this.form.value['quantity'],
      name: this.name,
      price: this.price
    }
    // this.form = this.createForm()
    console.info(lineItem)

    this.store.addItems(lineItem)
    // this.store.getItemFromStore()   //adds to the store 
    this.store.getItem()

  }


  private createForm(): FormGroup {
    return this.fb.group({
      quantity: this.fb.control<number>(1, [ Validators.required, Validators.min(1) ]),

    })
  }

}


