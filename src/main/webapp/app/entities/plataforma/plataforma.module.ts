import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplication9SharedModule } from 'app/shared/shared.module';
import { PlataformaComponent } from './plataforma.component';
import { PlataformaDetailComponent } from './plataforma-detail.component';
import { PlataformaUpdateComponent } from './plataforma-update.component';
import { PlataformaDeletePopupComponent, PlataformaDeleteDialogComponent } from './plataforma-delete-dialog.component';
import { plataformaRoute, plataformaPopupRoute } from './plataforma.route';

const ENTITY_STATES = [...plataformaRoute, ...plataformaPopupRoute];

@NgModule({
  imports: [JhipsterSampleApplication9SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PlataformaComponent,
    PlataformaDetailComponent,
    PlataformaUpdateComponent,
    PlataformaDeleteDialogComponent,
    PlataformaDeletePopupComponent
  ],
  entryComponents: [PlataformaDeleteDialogComponent]
})
export class JhipsterSampleApplication9PlataformaModule {}
