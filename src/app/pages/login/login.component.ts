import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  emailPattern = '^[a-z][a-z0-9_.]+@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$';
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: [
        localStorage.getItem('newEmail'),
        [Validators.required, Validators.pattern(this.emailPattern)],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  onLogin() {
    console.log(this.registerForm.value);
  }
}
