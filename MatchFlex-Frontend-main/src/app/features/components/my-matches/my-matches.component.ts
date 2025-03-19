import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatchGroupService, Group } from '../../../core/services/match-group.service';

@Component({
  selector: 'app-my-matches',
  templateUrl: './my-matches.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class MyMatchesComponent implements OnInit {
  groups: Group[] = [];
  loading = true;
  error = '';

  // Map de correspondance entre les noms de pays et leurs drapeaux
  flagMap: Record<string, string> = {
    'Maroc': 'maroc.jpg',
    'Mali': 'mali.png',
    'Comores': 'Comores.jpg',
    'Zambie': 'zambia.jpg',
    // Ajoutez d'autres pays selon vos besoins
  };

  constructor(
    private router: Router,
    private matchGroupService: MatchGroupService
  ) {}

  ngOnInit(): void {
    this.loadMyGroups();
  }

 loadMyGroups() {
   this.matchGroupService.getAccessibleGroups().subscribe({
     next: (data: Group[]) => {
       this.groups = data.map((group: Group) => {
         const flags = group.countries.map((country: string) => this.flagMap[country]
         );
         return { ...group, flags };
       });
       this.loading = false;
     },
     error: (err: any) => {
       this.error = 'Failed to load your match groups';
       this.loading = false;
       console.error(err);

       if (err.status === 401 || err.status === 403) {
         this.router.navigate(['/login']);
       }
     }
   });
 }

  viewDetails(groupName: string) {
    this.router.navigate(['/details-groups', groupName]);
  }

    viewSchedule(groupName: string) {
    this.router.navigate(['/match-schedule', groupName]);
  }
}
