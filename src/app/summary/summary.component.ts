import { Train } from './../model/Train';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainService } from '../train-service';
import { Train } from '../model/Train';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { map, filter } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';

export interface Element {
  operatorShortCode: string;
  operatorUICCode: number;
  trainNumber: number;
  trainType: string;
}

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

      /* map Train to Element so that filtering is applied only selected columns */
      this.trainService.getTrains().pipe(
        map(trains => trains.map(i => {
          let element: Element = { 
            operatorShortCode: i.operatorShortCode,
            operatorUICCode: i.operatorUICCode,
            trainNumber: i.trainNumber,
            trainType: i.trainType
          }
          return element;
        })))
        .subscribe(i => {
        this.dataSource.data = i;
      })
    }

    searchTrains(search = '') {
        this.dataSource.filter = search.toLocaleLowerCase().trim();
    }
  }
