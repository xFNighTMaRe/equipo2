import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalRegistroUsuarioComponent } from 'src/app/components/modals/modal-registro-usuario/modal-registro-usuario.component';
import { UserCustomer } from 'src/app/models/user-customer';
import { Users } from 'src/app/models/users';
import { ServiceLoginService } from 'src/app/shared/service-login.service';
import { ServiceRegistrationService } from 'src/app/shared/service-registration.service';

@Component({
  selector: 'app-registration-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  public users:Users = new Users(null,null,null,null,null);
  public userCustomer:UserCustomer = new UserCustomer(null,null,null,null,null); 
  public acept:boolean = null;

  constructor(
    public router:Router,
    private apiRegistration:ServiceRegistrationService,
    private apiLogin:ServiceLoginService,
    private dialog:MatDialog ) {
   }
onSubmit(form:any){
  const customer= {

    "customer_id":null,
    "phone":form.value.mobile,
    "name":form.value.name,
    "surname":form.value.surname,
    "photo":null,
    "mail":form.value.email,
    "password":form.value.password
  }
  this.apiRegistration.registrationCustomer(customer)
  .subscribe((data:any)=>{console.log(data)
    if(data.control==true){
      this.router.navigate(["/search"]);
      this.apiLogin.userCustomer= new UserCustomer
      (data.data.customer_id,form.value.phone, form.value.name,form.value.surname,null)
      this.apiLogin.users= new Users 
      (null,null,data.data.customer_id,form.value.email,form.value.password)
    }
    else{
    const dialogRef = this.dialog.open(ModalRegistroUsuarioComponent);
      dialogRef.componentInstance.email=form.value.email;
      const email:any=document.getElementById("profile")
      email.value=null;
      const password:any=document.getElementById("password")
      password.value=null;
        dialogRef.afterClosed().subscribe(result => {
        })
    }  
  })
} 
  ngOnInit(): void {
  }
}