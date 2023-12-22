import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  currentRoute: string = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
      });
  }

  isRouteActive(route: string): boolean {
    return this.currentRoute === route;
  }
  disconnect() {
    Swal.fire({
      title: 'Es-tu sûr?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#960087',
      cancelButtonColor: '#3200aa',
      confirmButtonText: 'Oui, Déconnecter !',
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        this.router.navigate(['/']);
      }
    });
  }
}
