import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  fg: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log('Ellow!')!
    this.fg = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    })
  }

  signIn() {
    if (this.fg.valid) {
      this.authService.signIn(this.fg.value.email, this.fg.value.password).subscribe(()=> {
        this.router.navigate(['/','apanjan', 'menus']);
      });
    } else {
      this.fg.markAllAsTouched();
    }
  }

}
