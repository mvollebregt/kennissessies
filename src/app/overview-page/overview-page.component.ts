import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Proposal} from '../shared/proposal';
import {ProposalService} from '../shared/proposal.service';
import {AuthService} from '../shared/auth.service';
import {first} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {EditDialogComponent} from './edit-dialog/edit-dialog.component';

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
              private authService: AuthService) {
    this.proposals = proposalService.getProposals();
    authService.getCurrentUser().pipe(first()).subscribe(
      user => this.currentUserEmail = user.email
    );
  }

  onVoted(proposal: Proposal, inFavour: boolean): void {
    this.proposalService.vote(proposal, this.currentUserEmail, inFavour);
  }

  onWillSpeak(proposal: Proposal, willSpeak: boolean): void {
    this.proposalService.willSpeak(proposal, this.currentUserEmail, willSpeak);
  }

  openDialog(willSpeak = false): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {data: willSpeak});

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.currentUserEmail) {
        this.proposalService.create({
          title: result.title,
          emailsVotedInFavour: [this.currentUserEmail],
          emailsWillSpeak: willSpeak ? [this.currentUserEmail] : []
        });
      }
    });
  }

  includesCurrentUser(emails: string[]): boolean {
    return !!this.currentUserEmail && emails.includes(this.currentUserEmail);
  }
}
