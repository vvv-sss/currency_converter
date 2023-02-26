import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CURRENCYLIST } from './mock-currency-list';

@Component({
  selector: 'app-input-block',
  templateUrl: './input-block.component.html',
  styleUrls: ['./input-block.component.scss']
})

export class InputBlockComponent {
  @Input() className:string = "";
  @Input() inputValue: number | undefined;
  @Input() selectValue: string | undefined;

  @Output() inputValueForForm = new EventEmitter<number>();
  @Output() selectValueForForm = new EventEmitter<string>();

  currencyList: any[] = CURRENCYLIST;

  sendInputValue(): void {
    this.inputValueForForm.emit(this.inputValue);
  }

  sendSelectValue(): void {
    this.selectValueForForm.emit(this.selectValue);
  }
}