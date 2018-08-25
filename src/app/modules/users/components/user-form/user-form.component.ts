import { Component, OnInit, Input } from '@angular/core';
import { UserDto } from '../../../../state/users/models';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersStateService } from '../../../../state/users/state-service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input()
  selectedUser: UserDto
  form: FormGroup;
  subscriptions: Subscription[] = [];
  formErrors = {
    name: null,
    job: null,
  };

  constructor(private formBuilder: FormBuilder,
    private _router: Router, private usersStateService: UsersStateService) {
    this.form = this.formBuilder.group({
      id: [0],
      first_name: [''],
      last_name: [''],
      name: ['', Validators.required],
      job: ['', Validators.required]
    });

    this.subscriptions
      .push(this.form.valueChanges.subscribe(this.displayErrors.bind(this)));
  }

  ngOnInit() {
    if (this.selectedUser)
      this.form.patchValue(this.prepareItemForEdit(this.selectedUser));
  }
  prepareItemForEdit(item: UserDto) {
    if (item)
      return { ...item, name: `${item.first_name} ${item.last_name}` }
  }

  onSubmitClick(action: string) {
    if (action == "Add") {
      this.usersStateService.dispatchAdd(this.form.value);
    } else if (action == "Update") {
      this.usersStateService.dispatchUpdate(this.form.value);
    }

    this.subscriptions
      .push(this.usersStateService.selectIsSavedSuccess()
        .filter(f => f == true).subscribe(isSuccess => {
          if (isSuccess) {
            this._router.navigate(['/users'])
          }
        }));
  }


  displayErrors() {
    for (const field in this.formErrors) {
      if (field) {
        this.formErrors[field] = null;
        const ctrl = this.form.get(field);
        if (ctrl && !ctrl.valid && ctrl.dirty) {
          this.formErrors[field] = `validation error in ${field}: ${Object.keys(ctrl.errors).join(',')}`;
        }
      }
    }
  }

  ngOnDestroy(): void {
    for (const i in this.subscriptions) {
      this.subscriptions[i].unsubscribe();
    }
  }



}
