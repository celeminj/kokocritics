import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VideoGameService } from '../services/game.service';
import VideoGame from '../models/Videogame';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 videogames: VideoGame[] = [];

  constructor(private videoGameService: VideoGameService) {
    this.videoGameService.getAllVideoGames().subscribe((data) => {
      this.videogames = data;
      console.log(data);
    });
  }
}
