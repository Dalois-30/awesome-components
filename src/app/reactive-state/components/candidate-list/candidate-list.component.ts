import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from '../../models/candidate.model';
import { CandidatesService } from '../../services/candidates.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateListComponent implements OnInit{

  // first create the observables 
  loading$!: Observable<boolean>;
  candidates$!: Observable<Candidate[]>;

  constructor(private candidatesService: CandidatesService){}

  ngOnInit(): void {
    this.initObservables();
    this.candidatesService.getCandidatesFromServer();
  }
  
  /**
   * function that initializes the observable
   */
  private initObservables() {
    this.loading$ = this.candidatesService.loading$;
    this.candidates$ = this.candidatesService.candidates$;
  }

}
