import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toster:ToastrService ) { }


showSuccess(message:any,title:any){

  this.toster.success(message,title)

}

showError(message:any,title:any){

  this.toster.error(message,title)
}


showWarning(message:any,title:any){

  this.toster.warning(message,title)
}


}


