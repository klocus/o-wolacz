import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WykopService {

  constructor(private http: HttpClient) { }

  /**
   * Get voters from request
   * 
   * @param {string} query 
   * @return {Observable}
   */
  getVoters(query: string): Observable<any> {
    return this.http.get(environment.endpoint + '/' + query, { responseType: 'text' })
      .pipe(
        map(data => this.processVoters(data))
      );
  }

  /**
   * Transform requested data to array of usernames
   * 
   * @param {string} data
   * @return {array}
   */
  private processVoters(data: string): Array<string> {
    const regex = RegExp(environment.userRegex, 'g');
    data = data.replace(/\\\//g, '/');
    
    let match: Array<any>, matches: Array<any> = [];
    while (match = regex.exec(data)) {
      matches.push(`@${match[1]}`);
    }

    return matches;
  }
}
