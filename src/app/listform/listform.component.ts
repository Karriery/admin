import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from '../services/document.service';
import Swal from 'sweetalert2';
import { MeetingsService } from '../services/meetings.service';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-listform',
  templateUrl: './listform.component.html',
  styleUrl: './listform.component.scss',
})
export class ListformComponent {
  formList: any[] = [];
  siegeList: any[] = [];
  list: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  totalPages: number[] = [];
  pagedList: any[] = [];
  sieges: any[] = [];
  searchName: string = '';
  pageAndFiltredSieges: any[] = [];
  constructor(
    private router: Router,
    private documentService: DocumentService,
    private meetingsService: MeetingsService
  ) {
    this.totalItems = this.list.length;
    this.calculateTotalPages();
    this.updatePagedList();
  }
  arr: any[] = [];

  exportToCSV() {
    const csv = Papa.unparse(this.arr);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
  ngOnInit() {
    this.documentService.get().subscribe((data: any) => {
      console.log(data);
      this.formList = data;
      this.totalItems = data.length;
      this.calculateTotalPages();
      this.updatePagedAndFilteredSieges();
      this.arr = data.map((e: any) => {
        return {
          nom: e.nom,
          email: e.email,
          telephone: e.tel,
          civilite: e.civilite,
        };
      });
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
      confirmButtonText: 'Oui, archive-le !',
      cancelButtonText: 'Non, annulez !',
    }).then((result) => {
      if (result.isConfirmed) {
        this.documentService.deleteById(id).subscribe(
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
  chengeStatus(id: any, value: any) {
    console.log(value);
    this.documentService.patch(id, { meetingOver: value }).subscribe((data) => {
      this.ngOnInit();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Enregistrée',
        showConfirmButton: false,
        timer: 1500,
      });
    });
  }
  calculateTotalPages() {
    this.totalPages = Array.from(
      { length: Math.ceil(this.totalItems / this.itemsPerPage) },
      (_, i) => i + 1
    );
  }

  updatePagedList() {
    this.updatePagedAndFilteredSieges();
  }

  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages.length) {
      this.currentPage = pageNumber;
      this.updatePagedList();
    }
  }

  goToPreviousPage() {
    this.goToPage(this.currentPage - 1);
  }

  goToNextPage() {
    this.goToPage(this.currentPage + 1);
  }
  updatePagedAndFilteredSieges() {
    const filteredSieges = this.formList.filter((siege) => {
      return (
        siege &&
        siege.tel &&
        typeof siege.tel === 'string' &&
        siege.tel.toLowerCase().includes(this.searchName.toLowerCase())
      );
    });
    console.log(this.searchName, 'sernacname');
    this.totalItems = filteredSieges.length;
    this.calculateTotalPages();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pageAndFiltredSieges = filteredSieges.slice(startIndex, endIndex);
  }

  updatePagedAndFilteredSiegesByPhoning(query : any) {
    console.log( query )
    var filteredSieges = []
    if(query === "all"){
      filteredSieges = this.formList
    } else {
      if(query === "false") {
        filteredSieges = this.formList.filter((siege) => {
          return (
            siege &&
            siege.meetingOver == false
          );
        });
      } else if(query === "true") {
        filteredSieges = this.formList.filter((siege) => {
          return (
            siege &&
            siege.meetingOver == true
          );
        });
      }
      
    }
    
    console.log(this.searchName, 'sernacname');
    this.totalItems = filteredSieges.length;
    this.calculateTotalPages();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pageAndFiltredSieges = filteredSieges.slice(startIndex, endIndex);
  }

  get filteredSieges(): any[] {
    if (!this.searchName || this.searchName.trim() === '') {
      return this.pageAndFiltredSieges;
    }
    return this.formList.filter(
      (siege) =>
        siege &&
        siege.tel &&
        typeof siege.tel === 'string' &&
        siege.tel.toLowerCase().includes(this.searchName.toLowerCase())
    );
  }

  
}
