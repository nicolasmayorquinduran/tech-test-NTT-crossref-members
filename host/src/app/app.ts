import { Component, signal, inject, OnInit, effect } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, EventStateBridgeService, GlobalStateService } from 'shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  protected readonly title = signal('host');
  private readonly eventStateBridge = inject(EventStateBridgeService);
  protected readonly globalState = inject(GlobalStateService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.eventStateBridge.initialize();
  }
}
