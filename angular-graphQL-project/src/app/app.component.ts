import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';


const GET_COUNTRIES = gql`
query Query {
  country(code: "DE") {
    name
    native
    capital
    emoji
    currency
    languages {
      code
      name
    }
    phone
  }
  continents {
    code
  }
}
`


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'angular-graphQL-project';
  public rates: any;
  public error: any;
  public loading: boolean = true;
  private querySubscription: any


  constructor(private apollo: Apollo){

  }

  public ngOnInit(): void {
      this.querySubscription = this.apollo.watchQuery({
        query: GET_COUNTRIES
      }).valueChanges.subscribe((results: any) => {
        console.log(results);
      })
  }

  public ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }
}
