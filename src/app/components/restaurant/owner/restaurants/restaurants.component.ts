import { Component, OnInit } from '@angular/core';
import { Restaurants } from '../../../../models/restaurants';
import { ServiceLoginService } from '../../../../shared/service-login.service';
import { ServiceRestaurantService } from '../../../../shared/service-restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-owner-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {
  public restaurants:Restaurants[];
  constructor(
    private serviceLogin:ServiceLoginService,
    private serviceRestaurant:ServiceRestaurantService,
    private router:Router
  ) { }


  ngOnInit() {
    this.serviceRestaurant.getRestaurantByOwner(
        this.serviceLogin.userOwner.owner_id
      ).subscribe((response) => {
        if(response.control) {
          this.restaurants = response.data;
    }});}
  public clickRestaurant(index:number) {
    this.serviceRestaurant.selectedRestaurant = this.restaurants[index];
    this.router.navigate(['reservations-list-restaurant']);
  }
  public createRest(){
    this.router.navigate(["/create-restaurant-1"]);
    this.serviceLogin.navOwner = 1;
}}