import { Component } from '@angular/core';

@Component({
  selector: 'app-checkbooking',
  templateUrl: './checkbooking.component.html',
  styleUrl: './checkbooking.component.scss',
})
export class CheckbookingComponent {
  reservationList: { name: string; quantity: number; status: string }[] = [
    // Initial list of reservations
    { name: 'reservation 1', quantity: 2, status: 'ok' },
    { name: 'reservation 2', quantity: 5, status: 'ok' },
    { name: 'reservation 3', quantity: 1, status: 'ok' },
    { name: 'reservation 4', quantity: 3, status: 'ok' },
  ];
}
