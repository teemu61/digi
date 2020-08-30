import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Train } from '../model/Train';
import { Router, ActivatedRoute } from '@angular/router';
import { TrainService } from '../service/train-service';
import { TimeTableRow } from '../model/TimeTableRow';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { map, flatMap, tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { toBase64String } from '@angular/compiler/src/output/source_map';

export interface Element {
  operatorShortCode: string;
  operatorUICCode: number;
  trainNumber: number;
  trainType: string;
}


@Component({
  selector: 'app-train-details',
  templateUrl: './train-details.component.html',
  styleUrls: ['./train-details.component.css']
})
export class TrainDetailsComponent implements OnInit, AfterViewInit {
  train: Train;
  element: Element;
  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = ["key","value"];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public trainService: TrainService, 
    private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
    this.trainService.getTrainById(this.route.snapshot.params.id).pipe(
      map(train => {
        let element: Element = { 
          operatorShortCode: train.operatorShortCode,
          operatorUICCode: train.operatorUICCode,
          trainNumber: train.trainNumber,
          trainType: train.trainType
        }
        return element;
      }))
      .subscribe(i => {

      console.log("toinen i: ",i)
      for (const property in i) {
        let key = `${property}`;
        let value = `${i[property]}`;
        let item = {key, value};
        this.dataSource.data.push(item);
      }
      console.log("this.dataSource.data: ", this.dataSource.data)
      this.dataSource.sort = this.sort;
    }) 

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}

