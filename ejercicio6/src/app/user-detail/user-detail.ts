import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss'
})
export class UserDetail implements OnInit {

  user: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUserById(id as any).subscribe({
      next: (response: any) => {
        this.user = response;
        this.cdr.detectChanges();
        console.log('User detail:', this.user);
      },
      error: (err) => console.error('Error:', err)
    });
  }

  returnHome() {
    this.router.navigate(['/home']);
  }

  uploadUser() {
    this.router.navigate(['/updateuser', this.user._id || this.user.id]);
  }

  deleteUser() {
    const confirmado = confirm(`¿Seguro que quieres eliminar a ${this.user.first_name}?`);
    if (confirmado) {
      this.userService.deleteUser(this.user.id).subscribe({
        next: () => {
          alert('Usuario eliminado correctamente');
          this.router.navigate(['/home']);
        },
        error: (err) => console.error('Error:', err)
      });
    }
  }
}