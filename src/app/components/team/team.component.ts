import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  imports: [CommonModule],
  standalone: true,
})
export class TeamComponent {
  team = [
    {
      name: 'Messi',
      role: 'UI/UX Designer',
      image: '../../../assets/camara-antigua.jpg',
      bgColor: '#FFE49E',
    },
    {
      name: 'Quichiano',
      role: 'Developer',
      image: '../../../assets/camara-antigua.jpg',
      bgColor: '#F7EDEB',
    },
    {
      name: 'Maradona',
      role: 'Marketer',
      image: '../../../assets/camara-antigua.jpg',
      bgColor: '#E5EDFB',
    },
  ];
}
