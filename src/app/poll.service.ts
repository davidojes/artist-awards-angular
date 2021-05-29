import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  poll;

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  async getPoll(id: string) {
    this.poll = await this.httpClient.get<any>('https://localhost:44399/api/poll/' + id).toPromise();
    return this.poll;
  }

  async vote(pollOptionId) {
    var body = JSON.stringify({ "userId": this.userService.getUserId(), "pollOptionId": pollOptionId });
    var response = await this.httpClient.post<any>('https://localhost:44399/api/poll/vote', body, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      withCredentials: true
    }).toPromise();
    return response;
  }
}
