import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { buildRemoteModuleConfig, authGuard } from 'shared';
import { REMOTE_MFE_CONFIG } from '../../../mfe.config';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () => loadRemoteModule(
    buildRemoteModuleConfig(REMOTE_MFE_CONFIG.members.remoteEntry, './AppModule')
    ).then(m => m.AppModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
