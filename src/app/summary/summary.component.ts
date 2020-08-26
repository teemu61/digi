import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainService } from '../train-service';
import { Train } from '../model/Train';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';



@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

    dataSource = new UserDataSource(this.trainService);
    displayedColumns: string[] = ["trainNumber","operatorUICCode", "operatorShortCode", "trainType"];
    trains: Train[] = [];
  
    constructor(
      public trainService: TrainService,
      private router: Router) { }

    ngOnInit(): void {
      this.trainService.getTrains().subscribe((resp: any) => {
        this.trains = resp;
      });
      
    }
  
    getTrains(): void {
      console.log("getTrains called again")
      this.trainService.getTrains().subscribe((resp: any) => {
        this.trains = resp;
      });
    }
  
    getTrainById(id: number): Train { 
      return this.trains.filter(i => i.trainNumber == id )[0]; 
    }
  
  }
  
    export class UserDataSource extends DataSource<any> {
  
      constructor(private restService: TrainService) {
        super();
      }

      connect(): Observable<Train[]> {
        return this.restService.getTrains();
      }
      
      disconnect() {
      }
    }
