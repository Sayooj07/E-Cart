import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../products/services/api.service';
import { ToasterService } from '../services/toaster.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  product:any={}
 

  constructor(private viewRoute:ActivatedRoute , private api:ApiService ,private toster:ToasterService){}
  ngOnInit(): void {
  

    this.viewRoute.params.subscribe({ 

next:(result:any)=>{

const {id}= result
console.log(id);

//using id make a call to service to get details of the product

this.api.viewproduct(id).subscribe({

  next:(result:any)=>{

    console.log(result);
    this.product=result

  },

  error:(err:any)=>{

    console.log(err);
    
  }

})


}

    })

  }


  addtowishlist(product:any){

    this.api.addtowishlist(product).subscribe({

next:(res:any)=>{
  console.log(res);

  this.toster.showSuccess(`${res.title} added to your wishlist`, 'Success'  )

// alert(`${res.title} added to wishlist`)

},

error:(err:any)=>{

  console.log(err);

  this.toster.showError(`${err.error} `, 'fail')
  
}
    })
  }
  addtocart(product:any){

    this.api.addtocart(product).subscribe({
  
  next:(result:any)=>{
  
    //update cart count
  
    this.api.getcartCount()
    //alert result
  this.toster.showSuccess(result,'Success')
  },
  error:(err:any)=>{
  
  console.log(err);
  

  }
  
  
  
    })
  
  
  }




}





