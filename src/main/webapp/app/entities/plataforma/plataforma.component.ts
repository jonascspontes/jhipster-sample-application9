import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IPlataforma } from 'app/shared/model/plataforma.model';
import { PlataformaService } from './plataforma.service';

@Component({
  selector: 'jhi-plataforma',
  templateUrl: './plataforma.component.html'
})
export class PlataformaComponent implements OnInit, OnDestroy {
  plataformas: IPlataforma[];
  eventSubscriber: Subscription;

  constructor(protected plataformaService: PlataformaService, protected eventManager: JhiEventManager) {}

  loadAll() {
    this.plataformaService.query().subscribe((res: HttpResponse<IPlataforma[]>) => {
      this.plataformas = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInPlataformas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPlataforma) {
    return item.id;
  }

  registerChangeInPlataformas() {
    this.eventSubscriber = this.eventManager.subscribe('plataformaListModification', () => this.loadAll());
  }
}
