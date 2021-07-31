import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  poll;
  popularPolls;
  apiUrl = environment.API_URL;

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  async getPoll(id: string) {
    this.poll = await this.httpClient.get<any>(`${this.apiUrl}/api/poll/` + id).toPromise();
    return this.poll;
  }

  async createPoll(requestBody) {
    var response = await this.httpClient.post<any>(`${this.apiUrl}/api/poll/createpoll`, requestBody, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      withCredentials: true
    }).toPromise();
    return response;
  }

  async checkForPoll(pollId) {
    var result = false;
    await this.httpClient.get<any>(`${this.apiUrl}/api/poll/checkforpoll/` + pollId).toPromise()
      .then(() => result = true)
      .catch(() => result = false);
    return result;
  }

  async getPopularPolls() {
    // if (this.popularPolls.length === 0) {
    //   console.log("empty");
      this.popularPolls = await this.httpClient.get<any>(`${this.apiUrl}/api/poll/popularpolls`)
        .toPromise();
        // .then(success => {this.popularPolls = success });
    // }
    // console.log(this.popularPolls);
    return this.popularPolls;
  }

  async vote(pollOptionId) {
    var body = JSON.stringify({ "userId": this.userService.getUserId(), "pollOptionId": pollOptionId });
    var response = await this.httpClient.post<any>(`${this.apiUrl}/api/poll/vote`, body, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      withCredentials: true
    }).toPromise();
    return response;
  }
}
