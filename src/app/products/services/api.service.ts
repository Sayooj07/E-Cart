import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  searchKey = new BehaviorSubject("")
cartCount = new BehaviorSubject(0)
  BASE_URL="http://localhost:3000"
   
  

  constructor(private http:HttpClient) { 

this.getcartCount()


  }


//get all products
getallproducts(){


  return this.http.get(`${this.BASE_URL}/products/get-all-products`)

}

viewproduct(id:any){

  return this.http.get(`${this.BASE_URL}/products/view/${id}`)
}

// add to wishlist
addtowishlist(product:any){

  const body={
//req body
    id:product.id,
    title:product.title,
    price:product.price,
    image:product.image
  }

//make an api call wishlist/add-product

 return this.http.post(`${this.BASE_URL}/wishlist/add-product`,body)

}


//call to get wishlist

getWishlist(){

 return this.http.get(`${this.BASE_URL}/wishlist/get-wishlist`)


}


removeItem(id:any){


  return this.http.delete(`${this.BASE_URL}/wishlist/remove-item/${id}`)

}


addtocart(product :any){


  const body = {

    id:product.id,
    title:product.title,
    price:product.price,
    image:product.image,
    quantity: 1

  }

  return this.http.post(`${this.BASE_URL}/cart/add-product`,body)

}


getcart(){


return  this.http.get(`${this.BASE_URL}/cart/add-cart`)

}


//get cart count
getcartCount(){

  this.getcart().subscribe({

next:(result:any)=>{

this.cartCount.next(result.length)
  
}

  })
}


removeCartItem(id:any)
{

  return this.http.delete(`${this.BASE_URL}/cart/remove-item/${id}`)

}

//increment 

incCartItem(id:any){

  return this.http.get(`${this.BASE_URL}/cart/increment-item/${id}`)

}


DecCartItem(id:any){

  return this.http.get(`${this.BASE_URL}/cart/decrement-item/${id}`)

}


//empty cart

emptyCart(){

  return this.http.delete(`${this.BASE_URL}/cart/empty-cart`)

 
}

}
