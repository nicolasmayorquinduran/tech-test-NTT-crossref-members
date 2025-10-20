import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { PublicLayoutComponent } from './components/public-layout/public-layout.component';
import { HostBannerShellComponent } from './components/host-banner-shell/host-banner-shell.component';

@NgModule({
  declarations: [
    PublicLayoutComponent,
    HostBannerShellComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
