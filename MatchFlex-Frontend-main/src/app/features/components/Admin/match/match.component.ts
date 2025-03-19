import { Component, OnInit } from "@angular/core"
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { SidebarComponent } from "../sidebar/sidebar.component"
import { NgClass, NgForOf, NgIf, NgStyle } from "@angular/common"

interface Match {
  id: number
  homeTeam: string
  awayTeam: string
  matchDate: string
  venue: string
  stage: string
  status: "SCHEDULED" | "COMPLETED"
}

@Component({
  selector: "app-match",
  standalone: true,
  imports: [SidebarComponent, NgForOf, NgClass, NgIf, ReactiveFormsModule, NgStyle],
  templateUrl: "./match.component.html",
  styleUrls: ["./match.component.scss"],
})
export class MatchComponent implements OnInit {
  matches: Match[] = [
    {
      id: 1,
      homeTeam: "Tunisie",
      awayTeam: "Zambia",
      matchDate: "22/05/2025",
      venue: "Series X123",
      stage: "Camp noo",
      status: "SCHEDULED",
    },
    {
      id: 2,
      homeTeam: "Maroc",
      awayTeam: "Mali",
      matchDate: "22/05/2025",
      venue: "Series X123",
      stage: "Med 6",
      status: "COMPLETED",
    },
  ]

  showAddForm = false
  matchForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.matchForm = this.fb.group({
      homeTeam: ["", Validators.required],
      awayTeam: ["", Validators.required],
      matchDate: ["", Validators.required],
      venue: ["", Validators.required],
      stage: ["", Validators.required],
      status: ["SCHEDULED", Validators.required],
    })
  }

  ngOnInit(): void {}

  showAddMatchForm(): void {
    this.showAddForm = true
    this.matchForm.reset({
      status: "SCHEDULED",
    })
  }

  hideAddMatchForm(): void {
    this.showAddForm = false
    this.matchForm.reset()
  }

  onSubmit(): void {
    if (this.matchForm.valid) {
      const formValue = this.matchForm.value
      const newMatch: Match = {
        id: Math.max(...this.matches.map((m) => m.id)) + 1,
        homeTeam: formValue.homeTeam,
        awayTeam: formValue.awayTeam,
        matchDate: formValue.matchDate,
        venue: formValue.venue,
        stage: formValue.stage,
        status: formValue.status,
      }
      this.matches.push(newMatch)
      this.hideAddMatchForm()
    }
  }

  editMatch(match: Match): void {
    this.showAddForm = true
    this.matchForm.patchValue({
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      matchDate: match.matchDate,
      venue: match.venue,
      stage: match.stage,
      status: match.status,
    })
  }

  deleteMatch(match: Match): void {
    this.matches = this.matches.filter((m) => m.id !== match.id)
  }
}
