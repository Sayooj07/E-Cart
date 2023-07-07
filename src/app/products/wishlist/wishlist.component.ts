import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{

  wishlist:any=[]

  constructor(private api:ApiService,private toster:ToasterService){}

ngOnInit(): void {
  
this.api.getWishlist().subscribe({

  next:(res:any)=>{

    console.log(res);
    this.wishlist=res
    
  },

  error:(err:any)=>{

    console.log(err);
    alert(err.error)

    
  }

})


}




removeItem(id:any){


  this.api.removeItem(id).subscribe({

next:(res:any)=>{

  console.log(res);

  this.wishlist=res

  this.toster.showError('Product Deleted Successfully',''  )

  
},

error:(err:any)=>{

  console.log(err);
  


}

  })
}
  
addtocart(product:any){

  this.api.addtocart(product).subscribe({

next:(result:any)=>{

  //update cart count

  this.api.getcartCount()

  //remove item from wishlist
  this.removeItem(product.id)


  //alert result
this.toster.showSuccess(result,'Success')


},

error:(err:any)=>{

console.log(err);



}



  })


}




}
