import { Component, OnInit, inject } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Product} from '../models';
import {ProductService} from '../product.service';
import {ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  // NOTE: you are free to modify this component

  private prodSvc = inject(ProductService)
  private activatedRoute = inject(ActivatedRoute)

  category: string = "not set"

  products$!: Observable<Product[]>

  sub$!: Subscription

  ngOnInit(): void {
    this.category = this.activatedRoute.snapshot.params['categoryname']
    console.info(this.category)
    this.products$ = this.prodSvc.getProductsByCategory(this.category)
    // this.getProducts(this.category)
  }



  // getProducts(category:string){
  //    this.sub$= this.prodSvc.getProductsByCategory(this.category).subscribe({
  //     next: ((result)=> {
  //       console.info("OBSERAVBLE>>>>",result)
  //     })
  //   })
  // }

  // form!: FormGroup 
  // private fb= inject(FormBuilder)




}
