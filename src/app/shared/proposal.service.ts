import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Proposal} from './proposal';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  getProposals(): Observable<Proposal[]> {
    return of([{
      title: 'GraphQL',
      emailsVotedInFavour: ['mvollebregt@ilionx.com', 'some other', 'and another'],
      emailsWillSpeak: ['mvollebregt@ilionx.com']
    }, {
      title: 'Some other subject',
      emailsVotedInFavour: ['some person'],
      emailsWillSpeak: []
    }, {
      title: 'And another one',
      emailsVotedInFavour: ['some person'],
      emailsWillSpeak: ['some person']
    }]);
  }

  vote(proposal: Proposal, currentUserEmail: string | undefined, inFavour: boolean): void {
    console.log(`${currentUserEmail} voted ${!inFavour ? 'not ' : ''}in favour of ${proposal.title}`);
  }

  willSpeak(proposal: Proposal, currentUserEmail: string | undefined, willSpeak: boolean): void {
    console.log(`${currentUserEmail} will ${!willSpeak ? 'not ' : ''} speak about ${proposal.title}`);
  }

  create(proposal: Proposal): void {
    console.log('New proposal created', proposal);
  }
}
