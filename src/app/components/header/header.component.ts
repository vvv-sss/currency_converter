import { Component, DoCheck, OnInit } from '@angular/core';
import { ExchangeService } from '../../services/exchange';
import { CARDLIST } from './mock-card-list';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, DoCheck {
  cardList: any[] = CARDLIST;
  currencyList: any | undefined;
  baseCurrencyCode: string = "uah";
  baseCurrencyName: string = "Ukrainian hryvnia";
  exchangeRateTitle: string = `The current exchange rate against the `;
  fetched: boolean = false;
  errorStatus: boolean = false;
  
  constructor(private exchangeService: ExchangeService) {}

  ngOnInit(): void {
    // Initial fetching of exchange rates
    this.exchangeService.getDataForHeader(this.baseCurrencyCode).subscribe((response: any) => {
      if (response !== null) {
        this.currencyList = response;
      }
    }, (error) => {
      console.log(error);
      this.errorStatus = true;
    });
  }

  ngDoCheck(): void {
    // Fetching of exchange rates after changing the base currency
    if (this.fetched) {
      this.exchangeService.getDataForHeader(this.baseCurrencyCode).subscribe((response: any): void => {
        if (response !== null) {
          this.currencyList = response;
          this.fetched = false;
        }
      }, (error: any): void => {
        console.log(error);
        this.errorStatus = true;
      });
    }

    if (this.errorStatus) {
      window.alert("Sorry, something went wrong! Exchange rates are unavailable.");
      this.errorStatus = false;
    }
  }

  setBaseCurrency(currencyCode: string, currencyName: string, $event: any): void {
    //Styling of cards after changing of base currency
    const cards = $event.target.parentElement.parentElement.querySelectorAll("app-currency-card");
    cards.forEach((card: any) => card.firstChild.classList.remove("base"));
    $event.target.classList.add("base");
    //Setting the base currency code and name
    this.baseCurrencyCode = currencyCode;
    this.baseCurrencyName = currencyName;
    this.fetched = true;
  }

  setCurrencyRate(currencyCode: string): string {
    return (this.currencyList !== undefined && this.fetched === false) ? 
    this.currencyList[this.baseCurrencyCode][currencyCode]
    : "1"
  }
}
