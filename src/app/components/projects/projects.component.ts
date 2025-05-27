import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
    currentIndex = 0;

  projects = [
    {
      title: 'Our Projects Bring Stories to Life',
      description: 'Each project at Reelity is a blend of imagination and craft, pushing creative boundaries to deliver unforgettable visual experiences.',
      image: 'assets/productora-audiovisual-1024x488.jpg',
      year: 2024
    },
    {
      title: 'Innovative Narratives',
      description: 'We craft narratives that challenge the conventional and leave a lasting impression on audiences.',
      image: '../../../assets/pexels-souvenirpixels-1534057.jpg',
      year: 2023
    },
    {
      title: 'Next-Gen Visuals',
      description: 'Combining technology and storytelling to redefine visual impact in digital content.',
      image: '../../../assets/the-bed-2020-291-21498.webp',
      year: 2025
    }
  ];

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.projects.length;
  }

  previousSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.projects.length) % this.projects.length;
  }
}
