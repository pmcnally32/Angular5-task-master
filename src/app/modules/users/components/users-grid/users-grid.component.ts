import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { UserDto } from '../../../../state/users/models';

@Component({
  selector: 'app-users-grid',
  templateUrl: './users-grid.component.html',
  styleUrls: ['./users-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersGridComponent {

  @Input()
  list: UserDto[]

  @Output()
  doAction = new EventEmitter();

  constructor() { }

  gridAction(action: string, item: UserDto) {
    this.doAction.emit({ action, item })
  }

}
