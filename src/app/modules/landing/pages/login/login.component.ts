import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { IdentityStateService } from '../../../../state/identity/state-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  error: string;
  loginForm: FormGroup;

  formErrors = {
    email: null,
    password: null,
  };

  constructor(private router: Router,
    private identityStateService: IdentityStateService,
    private formBuilder: FormBuilder,
  ) {
    this.createForm();
    this.loginForm.valueChanges.subscribe(this.displayErrors.bind(this))
  }

  ngOnInit() { }

  login() {
    this.identityStateService.dispatchLogin(this.loginForm.value);
    this.identityStateService.selectLoginStatus()
      .map(status => status == true)
      .subscribe(x => {
        this.router.navigate(['/'], { replaceUrl: true });
      })
  }

  displayErrors() {
    for (const field in this.formErrors) {
      if (field) {
        this.formErrors[field] = null;
        const ctrl = this.loginForm.get(field);
        if (ctrl && !ctrl.valid && ctrl.dirty) {
          this.formErrors[field] = `this field is  ${Object.keys(ctrl.errors).join(', ')}`;
        }
      }
    }
  }

  UnsuccessfulLogin(_e) {
    _e.preventDefault();
    this.identityStateService.dispatchLogin({});
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }

}