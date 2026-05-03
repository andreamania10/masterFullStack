import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class HomeComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(response => {
      if (response.ok) {
        this.users = response.result;
      }
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
      this.userService.deleteUser(id).subscribe(() => {
        this.users = this.users.filter(u => u._id !== id);
      });
    }
  }
}