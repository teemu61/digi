import { Train } from './../model/Train';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";
import {catchError, finalize} from "rxjs/operators";
import { TrainService } from './train-service';



export class TrainDataSource implements DataSource<Train> {

    private trainSubject = new BehaviorSubject<Train[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor(private trainService: TrainService) {}

    loadLessons(id:string) {

        this.loadingSubject.next(true);

        this.trainService.getTrainById(id).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(lessons => this.trainSubject.next(lessons));
    }

    connect(collectionViewer: CollectionViewer): Observable<Train[]> {
        console.log("Connecting data source");
        return this.trainSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.trainSubject.complete();
        this.loadingSubject.complete();
    }

}
