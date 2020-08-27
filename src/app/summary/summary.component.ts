import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainService } from '../train-service';
import { Train } from '../model/Train';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

    dataSource = new MatTableDataSource([]);
    displayedColumns: string[] = ["trainNumber","operatorUICCode", "operatorShortCode", "trainType"];
    trains: Train[] = [];
  
    constructor(
      public trainService: TrainService,
      private router: Router) { 
      }

    ngOnInit(): void {

      this.trainService.getTrains().subscribe(
        trains => this.dataSource.data = trains
      );


    }

    searchTrains(search = '') {
        console.log("searchTrain called: "+search)
        this.dataSource.filter = search.toLocaleLowerCase().trim();
    }
  }
