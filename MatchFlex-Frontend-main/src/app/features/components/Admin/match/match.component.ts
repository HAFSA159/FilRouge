import {
  Group,
  MatchGroupService,
} from './../../../../core/services/match-group.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NgClass, NgForOf, NgIf, NgStyle } from '@angular/common';
import { MatchesService } from '../../../../core/services/matches.service';

export interface Match {
  id?: number;
  homeTeam: string;
  awayTeam: string;
  matchDate: string;
  venue: string;
  stage: string;
  status: 'SCHEDULED' | 'COMPLETED';
}

interface Groupe {
  id: number;
  name: string;
  countries: string;
  flags: string;
}
@Component({
  selector: 'app-match',
  standalone: true,
  imports: [
    SidebarComponent,
    NgForOf,
    NgClass,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    NgStyle,
  ],
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
})
export class MatchComponent implements OnInit {
  countries: string[] = ['USA', 'Canada', 'Mexico', 'Brazil', 'Germany'];
  selectedCountries: string[] = []; // Holds selected countries

  flags: string[] = ['USA', 'Canada', 'Mexico', 'Brazil', 'Germany'];

  selectedFlags: string[] = []; // Holds selected countries

  matches: Match[] = [
    {
      id: 1,
      homeTeam: 'Tunisie',
      awayTeam: 'Zambia',
      matchDate: '22/05/2025',
      venue: 'Series X123',
      stage: 'Camp noo',
      status: 'SCHEDULED',
    },
    {
      id: 2,
      homeTeam: 'Maroc',
      awayTeam: 'Mali',
      matchDate: '22/05/2025',
      venue: 'Series X123',
      stage: 'Med 6',
      status: 'COMPLETED',
    },
  ];

  showAddForm = false;
  showAddFormGroupes = false;
  matchForm: FormGroup;
  groupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private MatchGroupService: MatchGroupService,
    private MatchesService: MatchesService
  ) {
    this.matchForm = this.fb.group({
      homeTeam: ['', Validators.required],
      awayTeam: ['', Validators.required],
      matchDate: ['', Validators.required],
      venue: ['', Validators.required],
      stage: ['', Validators.required],
      status: ['SCHEDULED', Validators.required],
    });

    this.groupForm = this.fb.group({
      name: ['', Validators.required],
      CountriesTeam: ['', Validators.required],
      matchCountriesFlags: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  toggleAddGroupes(): void {
    this.showAddFormGroupes = !this.showAddFormGroupes;
  }

  showAddMatchForm(): void {
    this.showAddForm = true;
    this.matchForm.reset({
      status: 'SCHEDULED',
    });
  }

  hideAddMatchForm(): void {
    this.showAddForm = false;
    this.matchForm.reset();
  }

  onSubmit(): void {
    if (this.matchForm.valid) {
      const formValue = this.matchForm.value;
      const newMatch: Match = {
        homeTeam: formValue.homeTeam,
        awayTeam: formValue.awayTeam,
        matchDate: formValue.matchDate,
        venue: formValue.venue,
        stage: formValue.stage,
        status: formValue.status,
      };

      console.log(newMatch);

      // this.matches.push(newMatch);
      this.hideAddMatchForm();

      this.MatchesService.createMatch(newMatch).subscribe((data) => {
        console.log(data);
      });
    }
  }

  onSubmitGroup(): void {
    if (this.groupForm.valid) {
      const formValue: Group = this.groupForm.value;
      const newGrp = {
        name: formValue.name,
        countries: this.selectedCountries,
        flags: this.selectedFlags,
      };

      this.MatchGroupService.createGroupe(newGrp).subscribe((data) => {
        console.log(data);
      });
    }
  }

  editMatch(match: Match): void {
    this.showAddForm = true;
    this.matchForm.patchValue({
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      matchDate: match.matchDate,
      venue: match.venue,
      stage: match.stage,
      status: match.status,
    });
  }

  deleteMatch(match: Match): void {
    this.matches = this.matches.filter((m) => m.id !== match.id);
  }
}
