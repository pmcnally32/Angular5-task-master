import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UsersStateService } from '../../../../state/users/state-service';
import { Observable } from 'rxjs/Observable';
import { PagingInfo } from '../../../../state/state-models';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDto } from '../../../../state/users/models';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit {

  usersList$;
  PageInfo$: Observable<PagingInfo>;
  constructor(private usersStateService: UsersStateService,
    private route: ActivatedRoute,
    private _router: Router) {
    usersStateService.dispatchLoad();
  }

  ngOnInit() {
    this.usersList$ = this.usersStateService.selectItems();
    this.PageInfo$ = this.usersStateService.selectPagingInfo();
  }

  doAction(action: string, item: UserDto) {
    switch (action) {
      case 'view':
        this._router.navigate(['/users', 'view', item.id])
        break;
      case 'edit':
      case 'new':
        this._router.navigate(['/users', 'edit', item.id])
        break;
      case 'delete':
        this.usersStateService.dispatchDelete(item);
        break;
    }
  }

  onPageSizeChange(newPageSize: number) {
    this.usersStateService.dispatchFilter({
      objectsPerPage: newPageSize
    });
  }

  onPageChange(newPageIndex: number) {
    this.usersStateService.dispatchFilter({
      page: newPageIndex
    });
  }
}
