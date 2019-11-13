import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { IGame } from 'app/shared/model/game.model';
import { GameService } from './game.service';

@Component({
  selector: 'jhi-game',
  templateUrl: './game.component.html'
})
export class GameComponent implements OnInit, OnDestroy {
  games: IGame[];
  eventSubscriber: Subscription;

  constructor(protected gameService: GameService, protected dataUtils: JhiDataUtils, protected eventManager: JhiEventManager) {}

  loadAll() {
    this.gameService.query().subscribe((res: HttpResponse<IGame[]>) => {
      this.games = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInGames();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IGame) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInGames() {
    this.eventSubscriber = this.eventManager.subscribe('gameListModification', () => this.loadAll());
  }
}
