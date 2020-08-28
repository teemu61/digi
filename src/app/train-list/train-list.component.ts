import { Train } from '../model/Train';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainService } from '../train-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { map, filter } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

export interface Element {
  operatorShortCode: string;
  operatorUICCode: number;
  trainNumber: number;
  trainType: string;
}

@Component({
  selector: 'app-train-list',
  templateUrl: './train-list.component.html',
  styleUrls: ['./train-list.component.css']
})
export class TrainListComponent implements OnInit, AfterViewInit{

    dataSource = new MatTableDataSource([]);
    displayedColumns: string[] = ["trainNumber","operatorUICCode", "operatorShortCode", "trainType"];
    trains: Train[] = [];
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

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
        console.log("HUU this.dataSource: ",i)
      })
    }

    searchTrains(search = '') {
        this.dataSource.filter = search.toLocaleLowerCase().trim();
    }

    ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }

  }
