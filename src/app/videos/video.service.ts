import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VideoService {

  constructor(private http: Http) { }

  // Get all videos from the API
  getAllVideos() {
    return this.http.get('/api/videos')
      .map(res => res.json());
  }
}
