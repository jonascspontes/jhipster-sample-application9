import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplication9SharedModule } from 'app/shared/shared.module';
import { GeneroComponent } from './genero.component';
import { GeneroDetailComponent } from './genero-detail.component';
import { GeneroUpdateComponent } from './genero-update.component';
import { GeneroDeletePopupComponent, GeneroDeleteDialogComponent } from './genero-delete-dialog.component';
import { generoRoute, generoPopupRoute } from './genero.route';

const ENTITY_STATES = [...generoRoute, ...generoPopupRoute];

@NgModule({
  imports: [JhipsterSampleApplication9SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [GeneroComponent, GeneroDetailComponent, GeneroUpdateComponent, GeneroDeleteDialogComponent, GeneroDeletePopupComponent],
  entryComponents: [GeneroDeleteDialogComponent]
})
export class JhipsterSampleApplication9GeneroModule {}
