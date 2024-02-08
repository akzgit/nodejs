import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'mean-contact-form';
  name: string = '';
  email: string = '';
  message: string = '';

  constructor(private http: HttpClient) {}

  submitForm() {
    const formData = { name: this.name, email: this.email, message: this.message };
    this.http.post('http://localhost:3000/api/contact', formData)
      .subscribe(response => {
        console.log(response);
        // Handle success, e.g., show a success message
      }, error => {
        console.error(error);
        // Handle error, e.g., show an error message
      });
  }
}
