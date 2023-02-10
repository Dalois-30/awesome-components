import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Candidate } from '../models/candidate.model';

@Injectable()
export class CandidatesService {

    constructor(private http: HttpClient) { }

    // create a new behaviour subject that emit true or false depending on the state of the loading
    private _loading$ = new BehaviorSubject<boolean>(false);
    // create getter to get the loading state
    get loading$(): Observable<boolean> {
        return this._loading$.asObservable();
    }

    // create a new behaviour subject that emit the table of all the candidates
    private _candidates$ = new BehaviorSubject<Candidate[]>([]);
    // create a getter to get the table of all the candidates
    get candidates$(): Observable<Candidate[]> {
        return this._candidates$.asObservable();
    }

    // timestamp to check the last update
    private lastCandidatesLoad = 0;

    /**
     * 
     * @param loading 
     * set the loading state
     */
    private setLoadingStatus(loading: boolean) {
        this._loading$.next(loading);
    }

    /**
     * get all the candidates from the server
     */
    getCandidatesFromServer() {
        // check if the lastest loading is less than 5 minutes (300000 ms)
        if(Date.now() - this.lastCandidatesLoad <= 300000){
            // to ensure that the request is make only every 5 minutes
            return;
        }
        // set the loading status to true
        this.setLoadingStatus(true);
        this.http.get<Candidate[]>(`${environment.apiUrl}/candidates`).pipe(
            // wait 1s before continuing
            delay(1000),
            tap(candidates => {
                this.lastCandidatesLoad = Date.now();
                this._candidates$.next(candidates);
                this.setLoadingStatus(false);
            })
        ).subscribe();
    }

    /**
     * get the candidate from this id
     * @param id id of the candidate
     * @returns the candidate
     */
    getCandidateById(id: number): Observable<Candidate> {
        // first get the list of candidates
        if (!this.lastCandidatesLoad) {
            this.getCandidatesFromServer();
        }
        // filter candidate directly from the list of candidates to reduce the number of server requests
        return this.candidates$.pipe(
            map(candidates => candidates.filter(candidate => candidate.id === id)[0])
        );
    }

}