import {Injectable} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {Proposal} from './proposal';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/firestore';
import {map, switchMap} from 'rxjs/operators';

interface Vote {
  email: string;
  votedInFavour: boolean;
  willSpeak: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  constructor(private readonly afs: AngularFirestore) {
  }

  getProposals(): Observable<Proposal[]> {
    return this.afs.collection<Proposal>('proposals').snapshotChanges().pipe(
      switchMap(proposals =>
        combineLatest(
          proposals.map(proposal => this.addVotesAndId(proposal))
        )
      )
    );
  }

  private addVotesAndId(proposal: DocumentChangeAction<Proposal>): Observable<Proposal> {
    return this.getVotes(proposal).pipe(
      map(votes => ({
        ...proposal.payload.doc.data(),
        id: proposal.payload.doc.id,
        emailsVotedInFavour: this.filterVotes(votes, 'votedInFavour'),
        emailsWillSpeak: this.filterVotes(votes, 'willSpeak')
      }))
    );
  }

  private getVotes(proposal: DocumentChangeAction<Proposal>): Observable<Vote[]> {
    return this.afs.collection<Vote>(proposal.payload.doc.ref.collection('votes')).snapshotChanges().pipe(
      map(actions => actions.map(a => ({
        ...a.payload.doc.data(),
        email: a.payload.doc.id
      })))
    );
  }

  private filterVotes(votes: Vote[], prop: 'votedInFavour' | 'willSpeak'): string[] {
    return votes.filter(vote => vote[prop]).map(vote => vote.email);
  }

  vote(id: string, currentUserEmail: string | undefined, votedInFavour: boolean): void {
    this.afs.doc<Vote>(`proposals/${id}/votes/${currentUserEmail}`).update({votedInFavour});
  }

  willSpeak(id: string, currentUserEmail: string | undefined, willSpeak: boolean): void {
    this.afs.doc<Vote>(`proposals/${id}/votes/${currentUserEmail}`).update({willSpeak});
  }

  create(proposal: Omit<Proposal, 'id' | 'emailsVotedInFavour' | 'emailsWillSpeak'>, currentUserEmail: string, willSpeak: boolean): void {
    const id = this.afs.createId();
    this.afs.collection<Proposal>('proposals').doc(id).set(proposal).then(() =>
      this.afs.doc<Omit<Vote, 'email'>>(`proposals/${id}/votes/${currentUserEmail}`).set({votedInFavour: true, willSpeak})
    );
  }
}
