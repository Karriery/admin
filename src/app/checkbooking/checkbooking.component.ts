import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Swal from 'sweetalert2';
import { MeetingsService } from '../services/meetings.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DocumentService } from '../services/document.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkbooking',
  templateUrl: './checkbooking.component.html',
  styleUrl: './checkbooking.component.scss',
})
export class CheckbookingComponent {
  constructor(
    private meetingService: MeetingsService,
    private documentService: DocumentService,
    private router: Router
  ) {}
  check: any = false;
  document: any;
  meetings: any;
  meet: any;
  checkMore(id: any) {
    console.log(id);
    this.meetingService.getById(id).subscribe((data: any) => {
      this.document = data.document;
      this.document.start = this.timeFormat(data.start);
      this.document.end = this.timeFormat(data.end);
      this.check = true;
    });
  }
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay',
    },
    locale: 'fr',
    dateClick: (date) => {},
    initialView: 'dayGridWeek',
    eventClick: (info) => {
      console.log(info.event._def.extendedProps);
      const apiKey =
        'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzA0MzYyOTE1LCJqdGkiOiI3NTMyM2VkYS1lNDliLTRjYmEtOWI1OS1jMTg1MzY1ODhlY2MiLCJ1c2VyX3V1aWQiOiI5YWNiZDhjZC02ZGVhLTQ4YmUtOWQyOS05Mzg2ZWZiMjM3YzgifQ._XHV_FzlIbsiK9X5FfuWBIdgKyovink1Uug6bFaIfZE6Y1xtJ42-fLrL4zFmoX0RR15jMx6HMbbJptJoVbfxbQ'; // Replace with your Calendly API key
      fetch(info.event._def.extendedProps['uri'] + '/invitees', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.documentService
            .getByEmail(data.collection[0].email)
            .subscribe((res: any) => {
              console.log(res);
              if (res) {
                const swalWithBootstrapButtons = Swal.mixin({
                  customClass: {
                    confirmButton: 'btn btn-outline-primary',
                    cancelButton: 'btn btn-outline-danger',
                  },
                  buttonsStyling: false,
                });
                swalWithBootstrapButtons
                  .fire({
                    icon: 'question',
                    title: 'Rendez-vous',
                    html: `
                     <div style=" border: 2px solid #1e667e;
                     background-color: white;
                     border-radius: 8px;
                     width: 100%;
                     min-height: 200px;
                     padding: 20px;
                     display: grid;
                     gap : 15px;
                     align-self: start;">
                  <div class="email" style="font-size: 24px;
                  display: grid;
                  grid-template-columns: 20px 1fr;
                  align-items: center;
                  gap: 10px;" >
                  <div class="dot" style=" width: 15px;
                  height: 15px;
                  background-color: #1e667e;
                  border-radius: 5px;"></div>
                  ${data.collection[0].email}
                </div>
                <div class="date" style="display: flex;
                gap: 10px;">
                  <div style="background-color: rgb(219, 219, 219);
                  padding: 10px;
                  border-radius: 5px;
                  cursor: pointer;"> ${this.timeFormat(info.event.start)}</div>
                  <div style="background-color: rgb(219, 219, 219);
                  padding: 10px;
                  border-radius: 5px;
                  cursor: pointer;"> ${this.timeFormat(info.event.end)}</div>
                </div>
                <div class="name">
                <span style="font-weight: 500;font-size: 18px;">Nom & Prenom :</span> ${
                  data.collection[0].name
                }
              </div>
                     </div>
                  `,
                    showCancelButton: true,
                    confirmButtonText: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
</svg> voir plus`,
                    cancelButtonText: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                  </svg>`,
                    reverseButtons: true,
                  })
                  .then((result) => {
                    console.log('jajajajjajajaja', res);
                    if (result.isConfirmed) {
                      this.seemore(res);
                    } else if (
                      /* Read more about handling dismissals below */
                      result.dismiss === Swal.DismissReason.cancel
                    ) {
                    }
                  });
              } else {
                const swalWithBootstrapButtons = Swal.mixin({
                  customClass: {
                    confirmButton: 'd-none',
                    cancelButton: 'btn btn-outline-danger',
                  },
                  buttonsStyling: false,
                });
                swalWithBootstrapButtons
                  .fire({
                    icon: 'question',
                    title: 'Rendez-vous',
                    html: `
                     <div style=" border: 2px solid #1e667e;
                     background-color: white;
                     border-radius: 8px;
                     width: 100%;
                     min-height: 200px;
                     padding: 20px;
                     display: grid;
                     gap : 15px;
                     align-self: start;">
                  <div class="email" style="font-size: 24px;
                  display: grid;
                  grid-template-columns: 20px 1fr;
                  align-items: center;
                  gap: 10px;" >
                  <div class="dot" style=" width: 15px;
                  height: 15px;
                  background-color: #1e667e;
                  border-radius: 5px;"></div>
                  ${data.collection[0].email}
                </div>
                <div class="date" style="display: flex;
                gap: 10px;">
                  <div style="background-color: rgb(219, 219, 219);
                  padding: 10px;
                  border-radius: 5px;
                  cursor: pointer;"> ${this.timeFormat(info.event.start)}</div>
                  <div style="background-color: rgb(219, 219, 219);
                  padding: 10px;
                  border-radius: 5px;
                  cursor: pointer;"> ${this.timeFormat(info.event.end)}</div>
                </div>
                <div class="name">
                <span style="font-weight: 500;font-size: 18px;">Nom & Prenom :</span> ${
                  data.collection[0].name
                }
              </div>
                     </div>
                  `,
                    showCancelButton: true,
                    confirmButtonText: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
</svg> `,
                    cancelButtonText: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                  </svg>`,
                    reverseButtons: true,
                  })
                  .then((result) => {
                    if (result.isConfirmed) {
                      this.seemore(res);
                    } else if (
                      /* Read more about handling dismissals below */
                      result.dismiss === Swal.DismissReason.cancel
                    ) {
                    }
                  });
              }
            });
        })
        .catch((error) => console.error('Error:', error));

      // change the border color just for fun
      info.el.style.borderColor = 'red';
    },
    events: [],
    eventColor: '#4B49AC',
    buttonText: {
      today: "Aujourd'hui", // Set the 'today' button text in French
      month: 'Mois', // Set the 'month' button text in French
      week: 'Semaine', // Set the 'week' button text in French
      day: 'Jour', // Set the 'day' button text in French
    },
  };

  timeFormat(dateString: any) {
    const originalDate = new Date(dateString);

    // Check if the Date object is valid
    if (!isNaN(originalDate.getTime())) {
      // Extract date components
      const year = originalDate.getFullYear();
      const month = originalDate.toLocaleString('default', { month: 'long' });
      const day = originalDate.getDate();
      const hours = originalDate.getHours();
      const minutes = originalDate.getMinutes();
      const seconds = originalDate.getSeconds();
      const timezone = originalDate.toString().match(/\((\w+)\)/)?.[1] || '';

      // Create a new readable date string
      const readableDateString = `${day} ${month} ${year} ${hours}:${minutes} ${timezone}`;

      return readableDateString;
    } else {
      return 'Invalid date string';
    }
  }
  formatImageUrl(name: any) {
    if (!name || name === 'NC') {
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/NA_cap_icon.svg/1200px-NA_cap_icon.svg.png';
    } else {
      return '../../assets/images/' + name + '.png';
    }
  }
  ngOnInit() {
    // @ts-ignore
    const apiKey =
      'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzA0MzYyOTE1LCJqdGkiOiI3NTMyM2VkYS1lNDliLTRjYmEtOWI1OS1jMTg1MzY1ODhlY2MiLCJ1c2VyX3V1aWQiOiI5YWNiZDhjZC02ZGVhLTQ4YmUtOWQyOS05Mzg2ZWZiMjM3YzgifQ._XHV_FzlIbsiK9X5FfuWBIdgKyovink1Uug6bFaIfZE6Y1xtJ42-fLrL4zFmoX0RR15jMx6HMbbJptJoVbfxbQ'; // Replace with your Calendly API key
    const apiUrl =
      'https://api.calendly.com/scheduled_events?user=https://api.calendly.com/users/9acbd8cd-6dea-48be-9d29-9386efb237c8';
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Bookings:', data);
        // Process the data as needed
        this.meetings = data.collection;

        for (var i = 0; i < data.collection.length; i++) {
          data.collection[i].display = 'block';
          data.collection[i].color = '#4B49AC';
          data.collection[i].id = data.collection[i]._id;
          data.collection[i].start = data.collection[i].start_time;
          data.collection[i].end = data.collection[i].end_time;
        }
        var d = data.collection.map((e: any) => {
          return { ...e, title: 'Réservé', id: e._id };
        });
        this.calendarOptions.events = d;
      })
      .catch((error) => console.error('Error:', error));
  }
  checkMoreSecond(url: any, start: any, end: any) {
    this.check = true;
    const apiKey =
      'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzA0MzYyOTE1LCJqdGkiOiI3NTMyM2VkYS1lNDliLTRjYmEtOWI1OS1jMTg1MzY1ODhlY2MiLCJ1c2VyX3V1aWQiOiI5YWNiZDhjZC02ZGVhLTQ4YmUtOWQyOS05Mzg2ZWZiMjM3YzgifQ._XHV_FzlIbsiK9X5FfuWBIdgKyovink1Uug6bFaIfZE6Y1xtJ42-fLrL4zFmoX0RR15jMx6HMbbJptJoVbfxbQ'; // Replace with your Calendly API key
    fetch(url + '/invitees', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.meet = data.collection[0];
        this.meet.start = start;
        this.meet.end = end;
        console.log(this.meet);
      })
      .catch((error) => console.error('Error:', error));
  }
  seemore(data: any) {
    this.router.navigate(['/home/item'], {
      queryParams: { id: data._id },
    });
  }
}
