import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersStateService } from '../../../../state/users/state-service';
import { UserDto } from '../../../../state/users/models';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class UserEditComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private usersStateService: UsersStateService) { }

  selectedUser: Observable<UserDto>;
  
  ngOnInit() {
    this.selectedUser = this.route.params
      .flatMap(params => {
        if (params['userId'] > -1)
          return this.usersStateService.selectItem(params['userId'])
        return Observable.of(null)
      });
  }

}
