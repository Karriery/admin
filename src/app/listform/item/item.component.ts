import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../../services/document.service';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent {
  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService
  ) {}
  document: any;
  a1: any = false;
  a2: any = false;
  a3: any = false;
  a4: any = false;
  a5: any = false;
  a6: any = false;
  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.documentService.getById(queryParams.id).subscribe((data) => {
        console.log(data);
        this.document = data;
      });
    });
  }
  formatImageUrl(name: any) {
    if (!name || name === 'NC') {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/NA_cap_icon.svg/1200px-NA_cap_icon.svg.png';
    } else {
      return '../../assets/images/' + name + '.png';
    }
  }
}
