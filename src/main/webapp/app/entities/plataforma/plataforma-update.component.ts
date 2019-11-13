import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IPlataforma, Plataforma } from 'app/shared/model/plataforma.model';
import { PlataformaService } from './plataforma.service';
import { IGame } from 'app/shared/model/game.model';
import { GameService } from 'app/entities/game/game.service';

@Component({
  selector: 'jhi-plataforma-update',
  templateUrl: './plataforma-update.component.html'
})
export class PlataformaUpdateComponent implements OnInit {
  isSaving: boolean;

  games: IGame[];

  editForm = this.fb.group({
    id: [],
    nome: [],
    game: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected plataformaService: PlataformaService,
    protected gameService: GameService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ plataforma }) => {
      this.updateForm(plataforma);
    });
    this.gameService
      .query()
      .subscribe((res: HttpResponse<IGame[]>) => (this.games = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(plataforma: IPlataforma) {
    this.editForm.patchValue({
      id: plataforma.id,
      nome: plataforma.nome,
      game: plataforma.game
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const plataforma = this.createFromForm();
    if (plataforma.id !== undefined) {
      this.subscribeToSaveResponse(this.plataformaService.update(plataforma));
    } else {
      this.subscribeToSaveResponse(this.plataformaService.create(plataforma));
    }
  }

  private createFromForm(): IPlataforma {
    return {
      ...new Plataforma(),
      id: this.editForm.get(['id']).value,
      nome: this.editForm.get(['nome']).value,
      game: this.editForm.get(['game']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlataforma>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackGameById(index: number, item: IGame) {
    return item.id;
  }
}
