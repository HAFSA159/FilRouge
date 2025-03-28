import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  MatchGroupService,
  Group,
} from '../../../core/services/match-group.service';

@Component({
  selector: 'app-all-groups',
  templateUrl: './all-groups.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class AllGroupsComponent implements OnInit {
  groups: Group[] = [];
  loading = true;
  error = '';

  // Map de correspondance entre les noms de pays et leurs drapeaux
  flagMap: Record<string, string> = {
    Maroc: 'maroc.jpg',
    Mali: 'mali.png',
    Comores: 'Comores.jpg',
    Zambie: 'zambia.jpg',
    // Ajoutez ici d'autres pays pour les groupes B, C et D
  };

  constructor(
    private router: Router,
    private matchGroupService: MatchGroupService
  ) {}

  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups() {
    this.matchGroupService.getAllAvailableGroups().subscribe({
      next: (data) => {
        this.groups = data.map((group) => {
          const flags = group.countries.map((country) => this.flagMap[country]);
          return { ...group, flags };
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load match groups';
        this.loading = false;
        console.error(err);

        // Redirection vers la page de connexion si l'erreur est liée à l'authentification
        if (err.status === 401 || err.status === 403) {
          this.router.navigate(['/login']);
        }
      },
    });
  }

  viewDetails(groupName: string) {
    this.router.navigate(['/details-groups', groupName]);
  }

  schedule(groupName: string, groupId: number | any) {
    // Stocker l'ID du groupe sélectionné
    localStorage.setItem('selectedGroupId', groupId.toString());
    this.router.navigate(['/color-band-choice', groupName]);
  }
}
