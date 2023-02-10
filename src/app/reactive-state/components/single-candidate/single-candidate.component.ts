import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Candidate } from '../../models/candidate.model';
import { CandidatesService } from '../../services/candidates.service';

@Component({
  selector: 'app-single-candidate',
  templateUrl: './single-candidate.component.html',
  styleUrls: ['./single-candidate.component.scss'],
  // use this value of change detection to ensure that we use state management
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleCandidateComponent implements OnInit {
  
  // create our observable variables
  loading$!: Observable<boolean>;
  candidate$!: Observable<Candidate>;
  
  constructor(
    private candidatesService: CandidatesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.initObservables();

    // get the id from the url parameter
    this.candidate$ = this.route.params.pipe(
      // use + to cast the params['id'] to number
      // switchMap help us to transform observable<param> to observable<candidate>
      switchMap(params => this.candidatesService.getCandidateById(+params['id']))
    );
  }
  
  private initObservables() {
    this.loading$ = this.candidatesService.loading$;
  }
  onGoBack() {
    this.router.navigateByUrl('/reactive-state/candidates');
    // throw new Error('Method not implemented.');
  }
  onRefuse() {
    // throw new Error('Method not implemented.');
  }
  onHire() {
    // throw new Error('Method not implemented.');
  }
}
