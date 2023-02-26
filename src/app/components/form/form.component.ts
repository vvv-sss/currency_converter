import { Component, DoCheck } from '@angular/core';
import { ExchangeService } from '../../services/exchange';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements DoCheck {
  inputValue1: number | undefined;
  selectValue1: string = "";
  inputValue2: number | undefined;
  selectValue2: string = "";
  fetched: boolean = false;
  errorStatus: boolean = false;
  result: any;
  exchange2: boolean = false;

  constructor(private exchangeService: ExchangeService) {}

  //Taking of input and select values from App-input-block
  getInputValue1($event: number): void {
    this.inputValue1 = $event;
  }

  getSelectValue1($event: string): void {
    this.selectValue1 = $event;
    this.fetched = false;
  }

  getInputValue2($event: number): void {
    this.inputValue2 = $event;
  }

  getSelectValue2($event: string): void {
    this.selectValue2 = $event;
    this.fetched = false;
  }

  //Exchange calculation of input1 and input2
  doExchange1(): void {
    if (this.fetched && this.result && this.inputValue1) {
      const rate = this.result[this.selectValue2];
      const value = this.inputValue1 * rate;
      this.inputValue2 = Number(value.toFixed(2));
    } else if (this.inputValue1 === 0) {
      this.inputValue2 = 0;
    }
  }

  setExchange(): void {
    this.exchange2 = true;
  }

  doExchange2(): void {
    if (this.exchange2 && this.fetched && this.result && this.inputValue2) {
      const rate = this.result[this.selectValue2];
      const value = this.inputValue2 / rate;
      this.inputValue1 = Number(value.toFixed(2));
    } else if (this.inputValue2 === 0) {
      this.inputValue1 = 0;
    }
  }

  // Toggling of select currencies
  toggleSelectValue(): void {
    const select1 = this.selectValue1;
    const select2 = this.selectValue2;
    this.selectValue1 = select2;
    this.selectValue2 = select1;
    this.fetched = false;
  }

  ngDoCheck() {
    //Fetching the data upon the changing of currency in the select element
    if (this.selectValue1 && this.selectValue2 && !this.fetched) {
      this.exchangeService.getDataForConverter(this.selectValue1, this.selectValue2).subscribe((response: any) => {
        
          this.result = response;
          this.fetched = true;
          this.errorStatus = false;
          this.exchange2 = false;
          
          //Recalculating of input2 on toggling
          if (this.inputValue1) {
            const rate = this.result[this.selectValue2];
            const value = this.inputValue1 * rate;
            this.inputValue2 = Number(value.toFixed(2));
          }
        
        }, (error: any): void => {
          console.log(error);
          this.fetched = true;
          this.errorStatus = true;
        }
      );
    }

    if (this.errorStatus) {
      window.alert("Sorry, something went wrong! Exchange rates are unavailable.");
      this.errorStatus = false;
    }
  }
}
