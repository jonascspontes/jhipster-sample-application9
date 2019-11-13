import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { JhipsterSampleApplication9SharedModule } from 'app/shared/shared.module';
import { JhipsterSampleApplication9CoreModule } from 'app/core/core.module';
import { JhipsterSampleApplication9AppRoutingModule } from './app-routing.module';
import { JhipsterSampleApplication9HomeModule } from './home/home.module';
import { JhipsterSampleApplication9EntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    JhipsterSampleApplication9SharedModule,
    JhipsterSampleApplication9CoreModule,
    JhipsterSampleApplication9HomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    JhipsterSampleApplication9EntityModule,
    JhipsterSampleApplication9AppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class JhipsterSampleApplication9AppModule {}
