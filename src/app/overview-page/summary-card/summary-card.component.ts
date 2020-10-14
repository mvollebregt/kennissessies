import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Proposal} from '../../shared/proposal';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss']
})
export class SummaryCardComponent {

  @Input() proposal: Proposal | undefined;
  @Input() votedInFavour = false;
  @Input() willSpeak = false;
  @Output() votedInFavourChange = new EventEmitter<boolean>();
  @Output() willSpeakChange = new EventEmitter<boolean>();

  voteChanged(): void {
    this.votedInFavour = !this.votedInFavour;
    this.votedInFavourChange.emit(this.votedInFavour);
  }

  willSpeakChanged(): void {
    this.willSpeak = !this.willSpeak;
    this.willSpeakChange.emit(this.willSpeak);
  }
}
