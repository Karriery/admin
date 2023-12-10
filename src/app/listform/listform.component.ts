import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from '../services/document.service';
import Swal from 'sweetalert2';
import { MeetingsService } from '../services/meetings.service';
@Component({
  selector: 'app-listform',
  templateUrl: './listform.component.html',
  styleUrl: './listform.component.scss',
})
export class ListformComponent {
  formList: any;
  constructor(
    private router: Router,
    private documentService: DocumentService,
    private meetingsService: MeetingsService
  ) {}
  ngOnInit() {
    this.meetingsService.get().subscribe((data) => {
      console.log(data);
      this.formList = data;
    });
  }
  seemore(data: any) {
    this.router.navigate(['/home/item'], {
      queryParams: { id: data._id },
    });
  }
  deleteSiege(id: string) {
    Swal.fire({
      title: 'Es-tu sûr?',
      text: 'Vous ne pourrez pas revenir en arrière !',
      color: '#2b4c59',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: ' #1E667E',
      confirmButtonText: 'Oui, supprimez-le !',
      cancelButtonText: 'Non, annulez !',
    }).then((result) => {
      if (result.isConfirmed) {
        this.meetingsService.deleteById(id).subscribe(
          (data) => {
            console.log(data);
            this.ngOnInit();
          },
          (error) => {
            console.error('Error ', error);
          }
        );
      }
    });
  }
}
