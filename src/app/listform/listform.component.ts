import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listform',
  templateUrl: './listform.component.html',
  styleUrl: './listform.component.scss',
})
export class ListformComponent {
  formList: { name: string; quantity: number; status: string }[] = [
    // Initial list of forms
    { name: 'form 1', quantity: 2, status: 'ok' },
    { name: 'form 2', quantity: 5, status: 'ok' },
    { name: 'form 3', quantity: 1, status: 'ok' },
    { name: 'form 4', quantity: 3, status: 'ok' },
  ];
  constructor(private router: Router) {}
  seemore(data: any) {
    this.router.navigate(['/home/listform/item'], {
      queryParams: { id: data._id },
    });
  }
}
