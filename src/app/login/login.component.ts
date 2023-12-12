import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('formElement', { static: false }) formElement!: ElementRef;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  formData = {
    password: '',
    email: '',
  };

  logFormData() {
    console.log(this.formData);
  }
  onSubmit() {
    this.authService.login(this.formData).subscribe(
      (response: any) => {
        const accessToken = response.access_token;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/home/listform']);
      },
      (error: any) => {
        Swal.fire({
          title: 'Incorrect !',
          text: 'Votre adresse e-mail ou votre mot de passe est incorrect',
          confirmButtonColor: '#3200aa',
          confirmButtonText: "D'accord",
        });
        console.error('Login failed', error);
      }
    );
  }
}
