import { IGame } from 'app/shared/model/game.model';

export interface IGenero {
  id?: number;
  nome?: string;
  game?: IGame;
}

export class Genero implements IGenero {
  constructor(public id?: number, public nome?: string, public game?: IGame) {}
}
