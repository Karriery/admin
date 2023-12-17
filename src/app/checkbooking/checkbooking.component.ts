import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Swal from 'sweetalert2';
import { MeetingsService } from '../services/meetings.service';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-checkbooking',
  templateUrl: './checkbooking.component.html',
  styleUrl: './checkbooking.component.scss',
})
export class CheckbookingComponent {
  constructor(private meetingService: MeetingsService) {}
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
    initialView: 'dayGridMonth',
    eventClick: (info) => {
      console.log(info.event.id);
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger',
        },
        buttonsStyling: false,
      });
      swalWithBootstrapButtons
        .fire({
          icon: 'question',
          title: 'Rendez-vous',
          html: `<h3> Nom : ${
            info.event.title
          } </h3><h4> Date : ${this.timeFormat(info.event.start)} </h4>`,
          showCancelButton: true,
          confirmButtonText: 'En savoir plus',
          cancelButtonText: 'Ok',
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.checkMore(info.event.id);
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: 'Cancelled',
              text: 'Your imaginary file is safe :)',
              icon: 'error',
            });
          }
        });

      // change the border color just for fun
      info.el.style.borderColor = 'red';
    },
    events: [],
    eventColor: 'rgb(59, 66, 115)',
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
      'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzAyNjcwNzM2LCJqdGkiOiJlMjhjYmY5ZS0wY2EzLTQ2MTgtOWRmNC04ZGI1YThmYWZlYmIiLCJ1c2VyX3V1aWQiOiJBQkFCTU9JVlQ3TDVMU05HIn0.m88kTQzL46gsIfsATi01M3x5cPGDOrUzYH62cHSKRfbeliLhdmAkt2aLTMxId47blqybDdCUm5qd8bFGzIfLmQ'; // Replace with your Calendly API key
    const apiUrl =
      'https://api.calendly.com/scheduled_events?user=https%3A%2F%2Fapi.calendly.com%2Fusers%2FABABMOIVT7L5LSNG';
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
      })
      .catch((error) => console.error('Error:', error));

    //   for (var i = 0; i < data.length; i++) {
    //     data[i].display = 'block';
    //     data[i].color = 'rgb(59, 66, 115)';
    //     // this.closestEvent.start > data[i].start
    //     //   ? 'rgb(230, 183, 83)'
    //     //   : 'rgb(59, 66, 115)';
    //     data[i].id = data[i]._id;
    //   }
    //   var d = data.map((e: any) => {
    //     return { ...e, title: e.document.nom, id: e._id };
    //   });
    //   this.calendarOptions.events = d;
    // });
  }
  checkMoreSecond(url: any, start: any, end: any) {
    this.check = true;
    const apiKey =
      'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzAyNjcwNzM2LCJqdGkiOiJlMjhjYmY5ZS0wY2EzLTQ2MTgtOWRmNC04ZGI1YThmYWZlYmIiLCJ1c2VyX3V1aWQiOiJBQkFCTU9JVlQ3TDVMU05HIn0.m88kTQzL46gsIfsATi01M3x5cPGDOrUzYH62cHSKRfbeliLhdmAkt2aLTMxId47blqybDdCUm5qd8bFGzIfLmQ'; // Replace with your Calendly API key
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
}
