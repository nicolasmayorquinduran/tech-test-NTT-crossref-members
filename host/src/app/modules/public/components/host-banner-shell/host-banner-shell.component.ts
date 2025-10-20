import { AfterViewInit, Component, ComponentRef, Injector, Type, ViewContainerRef, effect, inject } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { BannerComponentContract, buildRemoteModuleConfig, GlobalStateService } from 'shared';
import { REMOTE_MFE_CONFIG } from '../../../../../mfe.config';
import { Router } from '@angular/router';

type RemoteBannerModule = { BannerComponent: Type<BannerComponentContract> };

@Component({
  selector: 'app-host-banner-shell',
  template: `<ng-container></ng-container>`,
  standalone: false
})
export class HostBannerShellComponent implements AfterViewInit {
  private readonly globalState = inject(GlobalStateService);
  private readonly vcr = inject(ViewContainerRef);
  private readonly router = inject(Router);
  private readonly injector = inject(Injector);
  private cmpRef?: ComponentRef<BannerComponentContract>;

  async ngAfterViewInit(): Promise<void> {
    const config = buildRemoteModuleConfig(REMOTE_MFE_CONFIG.banner.remoteEntry, './BannerComponent');
    const remote = await loadRemoteModule<RemoteBannerModule>(config);
    const ref = this.vcr.createComponent(remote.BannerComponent) as ComponentRef<BannerComponentContract>;
    this.cmpRef = ref;

    ref.instance.memberName = this.globalState.memberName();
    ref.instance.isAuthenticated = this.globalState.isAuthenticated();

    effect(() => {
      if (!this.cmpRef) return;
      this.cmpRef.instance.memberName = this.globalState.memberName();
      this.cmpRef.instance.isAuthenticated = this.globalState.isAuthenticated();
    }, { injector: this.injector });

    ref.instance.viewWorks?.subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}
