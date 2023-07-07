import { Component,OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder } from '@angular/forms';
import { ToasterService } from 'src/app/services/toaster.service';
import {
  IPayPalConfig,
  ICreateOrderRequest 
} from 'ngx-paypal';




@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  
  public payPalConfig?: IPayPalConfig;

  showmodalfooter:boolean=true
  showPaypal:boolean=false
  couponClicked:boolean=false
  checkoutClickStatus:boolean = false
  offerBtnClickStatus:boolean = false
totalcartamount:number=0
  allProducts:any=[]
username:any
flatno:any
state:any
pincode:any
showSuccess:boolean=false
showCancel:boolean=false
showError:boolean=false
paymentstatus:boolean=false


  addressForm=this.fb.group({

    username:[""],
    flatno:[""],
    state:[""],
    pincode:[""]
  })
  
  
  constructor(private api:ApiService, private fb:FormBuilder,private toster:ToasterService){}
  ngOnInit(): void {

    this.getcart()


  }

  getcart(){

    
    this.api.getcart().subscribe({


      next:(res:any)=>{

console.log(res.quantity);
this.allProducts=res
this.getcarttotalprice()



      },

      error:(err:any)=>{


        console.log(err);
        
      }
    })

  }


  removeCartItem(id:any){

    this.api.removeCartItem(id).subscribe({

      next:(res:any)=>{


        console.log(res);
        this.allProducts=res
        this.getcarttotalprice()
      this.getcartCount()
        
      },

      error:(err:any)=>{

        console.log(err);
        
      }

    })

  }
  getcartCount() {
    throw new Error('Method not implemented.');
  }


  //get cart total price

  getcarttotalprice(){


    let total =0
    this.allProducts.forEach((item:any) => {
      
      total+=item.total
     this.totalcartamount= Math.ceil(total)
    });
  }


  incCartItem(id:any){

    this.api.incCartItem(id).subscribe({

      next:(res:any)=>{

       

        this.allProducts=res

        this.getcarttotalprice()
        

      }
    })

  }


  DecCartItem(id:any){

    this.api.DecCartItem(id).subscribe({

      next:(res:any)=>{

       

        this.allProducts=res

        this.getcarttotalprice()
        

      }

      
    })
  }


  emptyCart(){

    this.api.emptyCart().subscribe({
      next:(res:any)=>{
        console.log(res);

      this.allProducts=res
      this.totalcartamount=0
      this.api.getcartCount()
        
      },

      error:(err:any)=>{


        console.log(err);
        
      }

    })
  }


  checkout(){

    if(this.addressForm.valid){
      this.checkoutClickStatus=true
      this.username=this.addressForm.value.username
      this.flatno=this.addressForm.value.flatno
      this.state=this.addressForm.value.state
      this.pincode=this.addressForm.value.pincode


    }
    else{
      this.toster.showWarning("Invalid Form","warning")
      
      this.checkoutClickStatus=false
    
    }

  }


  offerclick(){
    this.offerBtnClickStatus=true



  }

  discount10(){
    this.couponClicked=true
    this.totalcartamount -= Math.ceil( this.totalcartamount*.1)
  }

  
  discount50(){
    this.couponClicked=true
    this.totalcartamount -= Math.ceil( this.totalcartamount*.5)
  }


  private initConfig(): void {

    let amount = this.totalcartamount.toString()
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value:amount,
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: amount
                        }
                    }
                },
             
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details:any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
           
           //payment success
            this.showSuccess = true;
            this.emptyCart()
          this.paymentstatus=true

            

            //hide paypal
            this.showPaypal=false
            this.showmodalfooter=false
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            this.showCancel = true;


        },
        onError: err => {
            console.log('OnError', err);
            this.showError = true;
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            // this.resetStatus();
        }
    };
}

makepayment(){

  this.showPaypal=true
  this.initConfig()


}

}
