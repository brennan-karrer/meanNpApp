import { Component, OnInit } from '@angular/core';
import { VideoService } from './video.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html'
})

export class VideoListComponent implements OnInit {
  // Instantiate videos to an empty array
  videos: any = [];

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    // Retrieve videos from the API
    this.videoService.getAllVideos().subscribe(videos => {
      this.videos = videos;
    });
  }
}
