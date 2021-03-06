import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Reservations } from 'src/app/models/reservations';
import { ServiceCalendarService } from 'src/app/shared/service-calendar.service';
import { ServiceLoginService } from 'src/app/shared/service-login.service';
import { ServiceReservationsService } from 'src/app/shared/service-reservations.service';
import { ServiceRestaurantService } from 'src/app/shared/service-restaurant.service';
import { ServiceRouterService } from 'src/app/shared/service-router.service';
import { ServiceShiftsService } from 'src/app/shared/service-shifts.service';
import { ServiceTimesService } from 'src/app/shared/service-times.service';
import { CalendarComponent } from '../../calendar/calendar.component';
import { ModalReservaManualComponent } from '../../modals/modal-reserva-manual/modal-reserva-manual.component';
import { ModalRestauranteComponent } from '../../modals/modal-restaurante/modal-restaurante.component';

@Component({
  selector: 'app-restaurant-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsRestaurantComponent implements OnInit {

  public today:string
  public selectedDayName:string
  public selectedDayNum:string
  public selectedMonth:string
  public selectedYear:string
  public changedDayName:string
  public changedMonth:string
  public Allreservation:Reservations[]=[];
  public value:number=0;
  public service:string="0";
  public reservationsConfirmed:Reservations[] = new Array();
  public reservationsRejected:Reservations[] = new Array();
  public reservationsCanceledByClient:Reservations[] = new Array();
  public reservationsToBeConfirmed:Reservations[]
  public showData:Reservations
  public dateOfBirth:string
  public reservation:Reservations
  public restaurantId:number = (
    this.loginService.users.restaurant_id != null
    )?
    this.loginService.userRestaurant.restaurant_id
    :
    this.restaurantService.selectedRestaurant.restaurant_id;

  constructor(
    public dialog: MatDialog,
    private reservationService: ServiceReservationsService,
    private shiftsService: ServiceShiftsService,
    private timesService:ServiceTimesService,
    private calendarService:ServiceCalendarService,
    private loginService: ServiceLoginService,
    private restaurantService: ServiceRestaurantService,
    public routerService:ServiceRouterService
    ) {
    this.reservationService.getReservationRestaurant(this.restaurantId).subscribe((data:any) =>{     
    for(let i = 0; i<data.data.length;i++){

        this.shiftsService.getShiftsId(data.data[i].shift_id).subscribe((data3:any) =>{  
          this.timesService.getTimesId(data3.data[0].times_id).subscribe((data4:any) =>{    
            this.reservation = new Reservations(data.data[i].reservation_id,
              data.data[i].customer_id,
              data.data[i].restaurant_id,
              data.data[i].table_id,
              data.data[i].pax,
              data.data[i].day_name,
              data.data[i].day,
              data.data[i].month,
              data.data[i].year,
              data.data[i].hour,
              data.data[i].shift_id,
              data.data[i].comments,
              data.data[i].status,
              data.data[i].customer_name,
              data.data[i].customer_phone
            );
            this.reservation.service = data4.data[0].service
            this.Allreservation.push(this.reservation) 
        });});
        if (data.data[i].status == "Reservada") {

          this.shiftsService.getShiftsId(data.data[i].shift_id).subscribe((data3:any) =>{  
            this.timesService.getTimesId(data3.data[0].times_id).subscribe((data4:any) =>{    
              this.reservation = new Reservations(data.data[i].reservation_id,
                data.data[i].customer_id,
                data.data[i].restaurant_id,
                data.data[i].table_id,
                data.data[i].pax,
                data.data[i].day_name,
                data.data[i].day,
                data.data[i].month,
                data.data[i].year,
                data.data[i].hour,
                data.data[i].shift_id,
                data.data[i].comments,
                data.data[i].status,
                data.data[i].customer_name,
                data.data[i].customer_phone
              );
              this.reservation.service = data4.data[0].service
              this.reservationsConfirmed.push(this.reservation)
        });});}
        else if (data.data[i].status == "Rechazada") {
          this.shiftsService.getShiftsId(data.data[i].shift_id).subscribe((data3:any) =>{  
            this.timesService.getTimesId(data3.data[0].times_id).subscribe((data4:any) =>{    
              this.reservation = new Reservations(data.data[i].reservation_id,
                data.data[i].customer_id,
                data.data[i].restaurant_id,
                data.data[i].table_id,
                data.data[i].pax,
                data.data[i].day_name,
                data.data[i].day,
                data.data[i].month,
                data.data[i].year,
                data.data[i].hour,
                data.data[i].shift_id,
                data.data[i].comments,
                data.data[i].status,
                data.data[i].customer_name,
                data.data[i].customer_phone
              );
              this.reservation.service = data4.data[0].service;
              this.reservationsRejected.push(this.reservation);
      });});}
      else if (data.data[i].status == "Cancelada por cliente") {
        this.shiftsService.getShiftsId(data.data[i].shift_id).subscribe((data3:any) =>{  
          this.timesService.getTimesId(data3.data[0].times_id).subscribe((data4:any) =>{    
            this.reservation = new Reservations(data.data[i].reservation_id,
              data.data[i].customer_id,
              data.data[i].restaurant_id,
              data.data[i].table_id,
              data.data[i].pax,
              data.data[i].day_name,
              data.data[i].day,
              data.data[i].month,
              data.data[i].year,
              data.data[i].hour,
              data.data[i].shift_id,
              data.data[i].comments,
              data.data[i].status,
              data.data[i].customer_name,
              data.data[i].customer_phone
            );
            this.reservation.service = data4.data[0].service;
            this.reservationsCanceledByClient.push(this.reservation);
      });});}
      else if (data.data[i].status == "Pendiente") {
        this.shiftsService.getShiftsId(data.data[i].shift_id).subscribe((data3:any) =>{  
          this.timesService.getTimesId(data3.data[0].times_id).subscribe((data4:any) =>{    
            this.reservation = new Reservations(data.data[i].reservation_id,
              data.data[i].customer_id,
              data.data[i].restaurant_id,
              data.data[i].table_id,
              data.data[i].pax,
              data.data[i].day_name,
              data.data[i].day,
              data.data[i].month,
              data.data[i].year,
              data.data[i].hour,
              data.data[i].shift_id,
              data.data[i].comments,
              data.data[i].status,
              data.data[i].customer_name,
              data.data[i].customer_phone
            );
            this.reservation.service = data4.data[0].service
            this.reservationsToBeConfirmed.push(this.reservation)
    });});}}});     
    this.today = Date();
    let currentDayName = this.today.substring(0,3);
    let currentDayNum = this.today.substring(8,10);
    let currentMonth = this.today.substring(4,7);
    let currentYear = this.today.substring(11,16);
    this.selectedDayNum = currentDayNum;
    this.selectedDayName = currentDayName;
    this.selectedMonth = currentMonth;
    this.selectedYear = currentYear;
    this.changeDayName();
    switch (this.selectedMonth) {
      case "Jan":
        this.changedMonth = "Enero";
        break;
      case "Feb":
        this.changedMonth = "Febrero";
        break;
      case "Mar":
        this.changedMonth = "Marzo";
        break;
      case "Apr":
        this.changedMonth = "Abril";
        break;
      case "May":
        this.changedMonth = "Mayo";
        break;
      case "Jun":
        this.changedMonth = "Junio";
        break;
      case "Jul":
        this.changedMonth = "Julio";
        break;        
      case "Aug":
        this.changedMonth = "Agosto";
        break;
      case "Sep":
        this.changedMonth = "Septiembre";
        break;
      case "Oct":
        this.changedMonth = "Octubre";
        break;
      case "Nov":
        this.changedMonth = "Noviembre";
        break;
      case "Dic":
        this.changedMonth = "Diciembre";
        break;        
    }}
  // FIN CONSTRUCTOR
  ngOnInit() {
    if(this.loginService.userRestaurant){
     this.calendarService.getTimes(this.loginService.userRestaurant.restaurant_id)
  }}
  public modalStatus(data12:any) {
    this.calendarService.reserva = data12
    const dialogRef = this.dialog.open(ModalRestauranteComponent,{panelClass: ['animate__animated','animate__zoomIn'], hasBackdrop: false});
    
    dialogRef.afterClosed().subscribe();
  }
  public modalNew() {
    const dialogRef = this.dialog.open(ModalReservaManualComponent);
    dialogRef.afterClosed().subscribe();
  }
  public changeDayName(){
    switch (this.selectedDayName) {
      case "Sun":
        this.changedDayName = "Domingo";
        break;
      case "Mon":
        this.changedDayName = "Lunes";
        break;
      case "Tue":
        this.changedDayName = "Martes";
        break;
      case "Wed":
        this.changedDayName = "Miercoles";
        break;
      case "Thu":
        this.changedDayName = "Jueves";
        break;
      case "Fri":
        this.changedDayName = "Viernes";
        break;
      case "Sat":
        this.changedDayName = "Sabado";
        break;        
    }
  }
  public calendar(){
    const dialogRef = this.dialog.open(CalendarComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedDayName = this.calendarService.getNewDate().dayName;
      this.changeDayName();
      this.selectedDayNum = this.calendarService.getNewDate().dayNum;
      this.selectedMonth = this.calendarService.getNewDate().month;
      this.selectedYear = this.calendarService.getNewDate().year;
});}}