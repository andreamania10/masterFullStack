import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss'
})
export class UserForm implements OnInit {

  isUpdate: boolean = false;
  userId: string = '';

  usuario: User = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    if (this.userId) {
      this.isUpdate = true;
      this.userService.getUserById(this.userId).subscribe({
        next: (response: any) => {
          this.usuario = response;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error:', err)
      });
    }
  }

  saveUser() {
    if (!this.usuario.first_name || !this.usuario.last_name ||
      !this.usuario.username || !this.usuario.email) {
      alert('Todos los campos son obligatorios');
      return;
    }
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.usuario.email);
    if (!emailValido) {
      alert('El email no es válido');
      return;
    }

    if (this.isUpdate) {
      this.userService.updateUser(this.userId, this.usuario).subscribe({
        next: () => {
          alert('Usuario actualizado correctamente');
          this.router.navigate(['/home']);
        },
        error: (err) => console.error('Error:', err)
      });
    } else {
      this.userService.createUser(this.usuario).subscribe({
        next: () => {
          alert('Usuario creado correctamente');
          this.router.navigate(['/home']);
        },
        error: (err) => console.error('Error:', err)
      });
    }
  }

  returnHome() {
    this.router.navigate(['/home']);
  }
}