import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user';
import { User } from '../interfaces/user';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit {

  users: User[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      filter((event: any) => event.url === '/home')
    ).subscribe(() => {
      this.cargarUsuarios();
    });
  }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.userService.getUsers().subscribe({
      next: (response: any) => {
        this.users = response.results || response.data || [];
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error:', err)
    });
  }

  moreDetail(id: string) {
    this.router.navigate(['/user', id]);
  }

  uploadUserFunction(id: string) {
    this.router.navigate(['/updateuser', id]);
  }

  deleteUserFunction(id: string, nombre: string) {
    const confirmado = confirm(`¿Seguro que quieres eliminar a ${nombre}?`);
    if (confirmado) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u._id !== id);
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error:', err)
      });
    }
  }
}