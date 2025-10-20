import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { buildRemoteModuleConfig } from 'shared';
import { REMOTE_MFE_CONFIG } from '../../../mfe.config';
import { PublicLayoutComponent } from './components/public-layout/public-layout.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => loadRemoteModule(
          buildRemoteModuleConfig(REMOTE_MFE_CONFIG.login.remoteEntry, './AppModule')
        ).then(m => m.AppModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
