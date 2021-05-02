import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  poll;

  constructor(private httpClient: HttpClient) { }

  async getPoll(id: string) {
    this.poll = await this.httpClient.get<any>('https://localhost:44399/api/poll/' + id).toPromise();
    return this.poll;
  }
}
