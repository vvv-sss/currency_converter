import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})

export class ExchangeService {
    private baseUrl = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/';

    constructor(private http: HttpClient) {}

    getDataForHeader(baseCurrencyCode: string) {
        return this.http.get(`${this.baseUrl}/${baseCurrencyCode}.json`);
    }

    getDataForConverter(currencyCode1: string, currencyCode2: string) {
        return this.http.get(`${this.baseUrl}/${currencyCode1}/${currencyCode2}.json`);
    }
}
