// features/users/user.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import {User} from '../../../../shared/models/user.model';
import {UserService} from '../../../../core/services/user.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [SidebarComponent, NgForOf, NgIf, NgClass, ReactiveFormsModule, HttpClientModule],
  providers: [UserService],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  users: User[] = [];
  showAddForm = false;
  editMode = false;
  currentUserId: number | null = null;
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private http: HttpClient
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      /*braceletId: ['', Validators.required],
      status: ['Active', Validators.required],*/
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des utilisateurs:', err);
      }
    });
  }

  showAddUserForm(): void {
    this.editMode = false;
    this.currentUserId = null;
    this.showAddForm = true;
    this.userForm.reset({
      status: 'Active',
    });
  }

  hideAddUserForm(): void {
    this.showAddForm = false;
    this.userForm.reset();
  }

  editUser(user: User): void {
    this.editMode = true;
    this.currentUserId = user.userId;
    this.showAddForm = true;
    this.userForm.patchValue({
      username: user.username,
      email: user.email,
      /*braceletId: user.braceletId,
      status: user.status,*/
    });
  }

  deleteUser(user: User): void {
    // À implémenter avec une requête DELETE si l'API le supporte
    this.users = this.users.filter((u) => u.userId !== user.userId);
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;

      if (this.editMode && this.currentUserId) {
        // Mise à jour (à implémenter avec une requête PUT/POST si l'API le supporte)
        this.users = this.users.map((user) =>
          user.userId === this.currentUserId
            ? { ...user, ...formValue }
            : user
        );
      } else {
        // Ajout (simulation côté client, à remplacer par une requête POST)
        const newUser: User = {
          id: Math.random().toString(36).substring(2), // ID temporaire, l'API devrait le générer
          ...formValue,
        };
        this.users.push(newUser);
      }
      this.hideAddUserForm();
    }
  }
}
