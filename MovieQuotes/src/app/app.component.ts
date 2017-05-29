import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

interface MovieQuote {
  movie: string;
  quote: string;
  $key?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly quotesPath = "quotes";

  formMovieQuote: MovieQuote = {
    'quote': '',
    'movie': ''
  };

  // Local only solution
  // movieQuotes: Array<MovieQuote> = [
  //   {"movie": "Rocky", "quote": "Yo Adrian"},
  //   {"movie": "Terminator", "quote": "I'll be back"},
  //   {"movie": "Titanic", "quote": "I'm the king of the world!"},
  //   {"movie": "The Princess Bride", "quote": "Hello. My name is Inigo Montoya. You killed my father. Prepare to die."}
  // ];

  movieQuotesStream: FirebaseListObservable<MovieQuote[]>;

  constructor(db: AngularFireDatabase) {
    this.movieQuotesStream = db.list(this.quotesPath);
  }

  onSubmit(): void {
    // Local only solution
    // this.movieQuotes.unshift(this.formMovieQuote);
    try {
      if (this.formMovieQuote.$key) {
        this.movieQuotesStream.update(this.formMovieQuote.$key, this.formMovieQuote);
      } else {
        this.movieQuotesStream.push(this.formMovieQuote);
      }

      this.formMovieQuote = {
        'quote': '',
        'movie': ''
      };
    } catch (e) {
      console.log("Form error:", e);
    }
  }

  edit(movieQuote: MovieQuote): void {
    this.formMovieQuote = movieQuote;
  }

  remove(movieQuoteKey: string): void {
    this.movieQuotesStream.remove(movieQuoteKey);
  }
}
