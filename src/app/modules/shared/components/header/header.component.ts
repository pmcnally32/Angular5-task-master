import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { IdentityStateService } from '../../../../state/identity/state-service';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operator/filter';
import { map } from 'rxjs/operator/map';
import 'rxjs/Rx';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  menuHidden = true;

  constructor(private router: Router,
    private identityStateService: IdentityStateService
  ) { }

  ngOnInit() { }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  logout() {
    this.identityStateService.dispatchLogout();

  }

  get email(): Observable<string> {
    return this.identityStateService.selectLoginUser().filter(x => x != null).map(u => u.email)
  }

}
