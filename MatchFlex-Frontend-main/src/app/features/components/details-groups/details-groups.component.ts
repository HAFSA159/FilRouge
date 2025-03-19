import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScanService } from '../../../core/services/scan.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_CONFIG } from '../../../core/services/api-config';



@Component({
  selector: 'app-details-groups',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './details-groups.component.html',
  styleUrl: './details-groups.component.scss'
})
export class DetailsGroupsComponent implements OnInit {
  groupName: string = '';
  selectedDate: string = 'dimanche 21 décembre 2025';
  userScans: any[] = [];
    apiConfig = API_CONFIG;
pollingInterval: any;


  // Map des matchs par ID
  matchMap: {[key: number]: {date: string}} = {
    1: {date: 'dimanche 21 décembre 2025'}, // Maroc vs Comores
    2: {date: 'lundi 22 décembre 2025'},    // Mali vs Zambie
    3: {date: 'vendredi 26 décembre 2025'}, // Maroc vs Mali
    4: {date: 'vendredi 26 décembre 2025'}, // Zambie vs Comores
    5: {date: 'lundi 29 décembre 2025'},    // Comores vs Mali
    6: {date: 'lundi 29 décembre 2025'}     // Zambie vs Maroc
  };

  constructor(
    private route: ActivatedRoute,
    private scanService: ScanService,
    private http: HttpClient

  ) {}

 // Dans details-groups.component.ts

 ngOnInit(): void {
   this.route.paramMap.subscribe(params => {
     this.groupName = params.get('groupName') || '';
     this.loadUserScans();
     // Envoyer la date sélectionnée par défaut au serveur
     this.updateServerSelectedDate();
     // Démarrer le polling pour les nouveaux scans
     this.startScanPolling();
   });
 }

 updateServerSelectedDate() {
   this.scanService.updateSelectedDate(this.selectedDate).subscribe({
     next: (response) => console.log('Date mise à jour côté serveur:', response),
     error: (error) => console.error('Erreur lors de la mise à jour de la date:', error)
   });
 }

startScanPolling() {
  // Vérifier les nouveaux scans toutes les secondes
  this.pollingInterval = setInterval(() => {
    this.loadUserScans();
  }, 1000); // Réduit de 3000 à 1000 ms
}

 ngOnDestroy() {
   // Arrêter le polling quand le composant est détruit
   if (this.pollingInterval) {
     clearInterval(this.pollingInterval);
   }
 }

 onDateChange(event: any) {
   this.selectedDate = event.target.value;
   // Mettre à jour la date côté serveur
   this.updateServerSelectedDate();
 }

 simulateScanForSelectedDate() {
   this.scanService.simulateScan(this.selectedDate).subscribe({
     next: (response: any) => {
       console.log('Scan automatique simulé avec succès', response);
       this.loadUserScans();
     },
     error: (error: any) => console.error('Erreur lors de la simulation automatique du scan', error)
   });
 }



 // Mettre à jour la méthode simulateScan pour utiliser le service
 simulateScan() {
   this.simulateScanForSelectedDate();
 }

  loadUserScans() {
    this.scanService.getBandScans().subscribe({
      next: (scans) => {
        this.userScans = scans;
        console.log('Scans récupérés:', scans);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des scans:', error);
      }
    });
  }

  hasAttendedMatch(matchId: number): boolean {
    return this.userScans.some(scan => scan.matchId === matchId);
  }

}
