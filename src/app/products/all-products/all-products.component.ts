import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

searchKey:string=""
  allproducts:any=[]
constructor(private api:ApiService, private toster:ToasterService){}

ngOnInit(): void {

  this.api.getallproducts().subscribe({

    next:(res:any)=>{

      console.log(res);
      

      this.allproducts=res
    },
    error:(err:any)=>{

      console.log(err);
      
    }

  })

    //get searchkey

    this.api.searchKey.subscribe({

      next:(key:any)=>{

        this.searchKey=key


      }
    })

}

//make call to api
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


