import { Component, OnInit } from '@angular/core';
import { UserOwner } from '../../../../models/user-owner';
import { ServiceLoginService } from '../../../../shared/service-login.service';
import { Users } from '../../../../models/users';
import { ServiceUserOwnerService } from '../../../../shared/service-user-owner.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalRegistroComponent } from 'src/app/components/modals/modal-registro/modal-registro.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-owner-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})



export class EditComponentR implements OnInit {
  public userOwner:UserOwner;
  public users:Users;
  public pass:string;
  public checkPassword:string;
  public checkPassword2:string;
  public message:string;
  constructor (
    private router:Router,
    private serviceLogin:ServiceLoginService,
    private serviceUserOwner:ServiceUserOwnerService,
    public dialog:MatDialog
  ) { }
  processFile(imageInput:any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
    this.userOwner.photo = "assets/photos/" + file.name;
    const imagen = document.getElementById("photo").setAttribute("src", this.userOwner.photo);
  });
  reader.readAsDataURL(file);
  }
  onSubmit() {
    if (this.pass !== this.users.password) {
      this.message = 'Contraseña incorrecta';
      this.pass = null;
    } else {
      if (this.checkPassword !== this.checkPassword2) {
        this.message = 'Las contraseñas no coinciden';
        this.pass = null;
        this.checkPassword = null;
        this.checkPassword2 = null;
      }else {
        let password:string = this.pass;
        if(this.checkPassword) {
          password = this.checkPassword;
        }
        this.serviceUserOwner.putOwner({
          "owner_id": this.users.owner_id,
          "password": password,
          // "phone": this.userOwner.phone,
          "name": this.userOwner.name,
          "surname": this.userOwner.surname,
          "cif": this.userOwner.cif,
          "photo": this.userOwner.photo
        }).subscribe((response:any) => {
          if(!response.control) {
                     

          }else {
            //Modal de los cambios se han guardado correctamente
            this.users.password = password;
            this.serviceLogin.users.password = this.users.password;
            this.serviceLogin.userOwner = this.userOwner;
            const dialogRef = this.dialog.open(ModalRegistroComponent);
            dialogRef.componentInstance.mensaje="Cambios guardados correctamente";
        dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
            this.router.navigate(["/restaurants-list"]);           
        })
          }
          this.message = null;
          this.pass = null;
          this.checkPassword = null;
          this.checkPassword2 = null;
  });}}}

  ngOnInit() {
    this.userOwner = this.serviceLogin.userOwner;
    this.users = this.serviceLogin.users;
  }
}