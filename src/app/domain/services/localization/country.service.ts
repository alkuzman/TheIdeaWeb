import {Injectable} from "@angular/core";
/**
 * Created by Viki on 2/11/2017.
 */


@Injectable()
export class CountryService {
  private countries: string[];
  private mapCountriesToCodes: {[key: string]: string};

  constructor() {
    this.countries = [];
    this.mapCountriesToCodes = {};
    this.initializeCountries();
  }

  private initializeCountries(): void {
    this.countries.push('Macedonia');
    this.countries.push('Albania');
    this.countries.push('United States');
    this.countries.push('Serbia');
    this.countries.push('Bulgaria');
    this.countries.push('United Kingdom');
    this.countries.push('Germany');
    this.countries.push('France');
    this.countries.push('Italy');
    this.countries.push('Switzerland');
    this.countries.push('Russia');

    this.countries.sort();

    this.mapCountriesToCodes['Macedonia'] = 'MK';
    this.mapCountriesToCodes['Albania'] = 'AL';
    this.mapCountriesToCodes['United States'] = 'US';
    this.mapCountriesToCodes['Serbia'] = 'RS';
    this.mapCountriesToCodes['Bulgaria'] = 'BG';
    this.mapCountriesToCodes['United Kingdom'] = 'UK';
    this.mapCountriesToCodes['Germany'] = 'DE';
    this.mapCountriesToCodes['France'] = 'FR';
    this.mapCountriesToCodes['Italy'] = 'IT';
    this.mapCountriesToCodes['Switzerland'] = 'CH';
    this.mapCountriesToCodes['Russia'] = 'RU';
  }

  public getCountries(): string[] {
    return this.countries;
  }

  public getMapCountriesToCodes(): {[key: string]: string} {
    return this.mapCountriesToCodes;
  }
}
