import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Proposal} from '../shared/proposal';
import {ProposalService} from '../shared/proposal.service';
import {filter, first} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {EditDialogComponent} from './edit-dialog/edit-dialog.component';
import {AngularFireAuth} from '@angular/fire/auth';

function isNonNull<T>(value: T): value is NonNullable<T> {
  return value !== null;
}

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent {

  proposals: Observable<Proposal[]>;

  private currentUserEmail: string | undefined;

  constructor(private proposalService: ProposalService,
              private dialog: MatDialog,
              private auth: AngularFireAuth
  ) {
    this.proposals = proposalService.getProposals();
    auth.user.pipe(
      filter(isNonNull),
      first()
    ).subscribe(
      user => this.currentUserEmail = user.email || undefined
    );
  }

  vote(proposal: Proposal, inFavour: boolean, willSpeak: boolean): void {
    this.proposalService.vote(proposal.id, this.currentUserEmail, inFavour, willSpeak);
  }

  openDialog(willSpeak = false): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {data: willSpeak});

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.currentUserEmail) {
        this.proposalService.create({title: result.title}, this.currentUserEmail, willSpeak);
      }
    });
  }

  includesCurrentUser(emails: string[]): boolean {
    return !!this.currentUserEmail && emails.includes(this.currentUserEmail);
  }
}
