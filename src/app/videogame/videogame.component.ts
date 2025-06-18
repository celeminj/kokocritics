import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoGameService } from '../services/game.service';
import VideoGame from '../models/Videogame';
import { NgIf } from '@angular/common'; 
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-videogame',
  standalone: true,
  imports: [NgIf],
  templateUrl: './videogame.component.html',
  styleUrls: ['./videogame.component.css']
})
export class VideogameComponent {
  showModal = false;
  private route = inject(ActivatedRoute);
  private videoGameService = inject(VideoGameService);

  sanitizedTrailerUrl: SafeResourceUrl = '';
  title: string = '';
  videogame = {} as VideoGame;
  releaseDateString: string = '';

  constructor(private sanitizer: DomSanitizer) {
    this.route.paramMap.subscribe(params => {
      const titleParam = params.get('title');
      if (titleParam) {
        this.title = titleParam;
        this.videoGameService.getByTitle(this.title).subscribe({
          next: data => {
            this.videogame = data;
            if(this.videogame.releaseDate) {
              this.releaseDateString = new Date(this.videogame.releaseDate).toLocaleDateString();
            }
            console.log(this.videogame);
          },
          error: err => {
            console.error('Error al cargar videojuego:', err);
          }
        });
      } else {
        console.error('No se encontró el parámetro title en la URL');
      }
    });
  }

  openTrailer(url: string) {
    this.sanitizedTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.showModal = true;
  }

  openWallapop(url: string) {
    window.open(url, '_blank');
  }
  openAmazon(url: string) {
    window.open(url, '_blank');
  }

  closeModal() {
    this.showModal = false;
  }

  onMouseMove(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();

    const cardX = rect.left + rect.width / 2;
    const cardY = rect.top + rect.height / 2;

    const deltaX = event.clientX - cardX;
    const deltaY = event.clientY - cardY;

    const rotateX = (deltaY / rect.height) * 15;
    const rotateY = (deltaX / rect.width) * -15;

    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    card.style.boxShadow = '0 20px 30px rgba(0,0,0,0.3)';
  }

  onMouseLeave() {
    const cards = document.querySelectorAll('.interactive-card');
    cards.forEach(card => {
      (card as HTMLElement).style.transform = 'none';
      (card as HTMLElement).style.boxShadow = '0 8px 15px rgba(0,0,0,0.1)';
    });
  }
  platformIcons: { [key: string]: string } = {
  'PlayStation 2': 'icons/ps2.svg',
  
};


}
