import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {CommonModule, NgForOf} from '@angular/common';

interface ColorOption {
  name: string;
  class: string;
  ringClass: string;
}

@Component({
  selector: 'app-color-band-choice',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './color-band-choice.component.html',
  styleUrl: './color-band-choice.component.scss'
})
export class ColorBandChoiceComponent implements OnInit{
  selectedColor: string | null = null;
  groupName: string = '';

  colorOptions: ColorOption[] = [
    { name: 'Red', class: 'bg-red-500', ringClass: 'ring-red-300' },
    { name: 'Blue', class: 'bg-blue-500', ringClass: 'ring-blue-300' },
    { name: 'Green', class: 'bg-green-500', ringClass: 'ring-green-300' },
    { name: 'Yellow', class: 'bg-yellow-500', ringClass: 'ring-yellow-300' },
    { name: 'Purple', class: 'bg-purple-500', ringClass: 'ring-purple-300' },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.groupName = params.get('groupName') || '';
    });
  }

  selectColor(color: string): void {
    this.selectedColor = color;
  }

  goToNextStep(): void {
    if (this.selectedColor) {
      localStorage.setItem('selectedColor', this.selectedColor);
      this.router.navigate(['/user-info']);
    } else {
      alert('Please select a color before proceeding.');
    }
  }

  goToPreviousStep(): void {
    console.log('This is the first step');
  }
}
