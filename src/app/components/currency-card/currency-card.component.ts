import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent {
  @Input() className: string = "";
  @Input() currencyCode: string = "";
  @Input() currencyName: string = "";
  @Input() currencyAmount: string = "";
  currencyIconSrcBase: string = "../../assets/";
  @Input() currencyIconSrcEndpoint: string = "";
}
