import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IdentityStateService } from '../../../../state/identity/state-service';
import { UserDto } from '../../../../state/users/models';
import { Observable } from 'rxjs/Observable';
import { LoggedInUserDetails } from '../../../../state/identity/identity.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  constructor(private identityStateService: IdentityStateService) { }

  LoggedInUser$: Observable<LoggedInUserDetails>

  ngOnInit() {

    this.LoggedInUser$ = this.identityStateService.selectLoginUser()

  }

}
