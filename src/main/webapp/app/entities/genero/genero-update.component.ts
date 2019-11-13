import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IGenero, Genero } from 'app/shared/model/genero.model';
import { GeneroService } from './genero.service';
import { IGame } from 'app/shared/model/game.model';
import { GameService } from 'app/entities/game/game.service';

@Component({
  selector: 'jhi-genero-update',
  templateUrl: './genero-update.component.html'
})
export class GeneroUpdateComponent implements OnInit {
  isSaving: boolean;

  games: IGame[];

  editForm = this.fb.group({
    id: [],
    nome: [],
    game: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected generoService: GeneroService,
    protected gameService: GameService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ genero }) => {
      this.updateForm(genero);
    });
    this.gameService
      .query()
      .subscribe((res: HttpResponse<IGame[]>) => (this.games = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(genero: IGenero) {
    this.editForm.patchValue({
      id: genero.id,
      nome: genero.nome,
      game: genero.game
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const genero = this.createFromForm();
    if (genero.id !== undefined) {
      this.subscribeToSaveResponse(this.generoService.update(genero));
    } else {
      this.subscribeToSaveResponse(this.generoService.create(genero));
    }
  }

  private createFromForm(): IGenero {
    return {
      ...new Genero(),
      id: this.editForm.get(['id']).value,
      nome: this.editForm.get(['nome']).value,
      game: this.editForm.get(['game']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGenero>>) {
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
