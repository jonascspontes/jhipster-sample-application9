import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'plataforma',
        loadChildren: () => import('./plataforma/plataforma.module').then(m => m.JhipsterSampleApplication9PlataformaModule)
      },
      {
        path: 'genero',
        loadChildren: () => import('./genero/genero.module').then(m => m.JhipsterSampleApplication9GeneroModule)
      },
      {
        path: 'game',
        loadChildren: () => import('./game/game.module').then(m => m.JhipsterSampleApplication9GameModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class JhipsterSampleApplication9EntityModule {}
