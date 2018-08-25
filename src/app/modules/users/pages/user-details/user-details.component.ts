import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { UsersStateService } from '../../../../state/users/state-service';
import { UserDto } from '../../../../state/users/models';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsComponent implements OnInit {

  user: Observable<UserDto>;

  constructor(private route: ActivatedRoute,
    private usersStateService: UsersStateService) { }

  ngOnInit() {
    this.user = this.route.params
    .flatMap(params => this.usersStateService.selectItem(params['userId']));


  }

}
