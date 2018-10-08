import { IDifficulty } from './game-difficulty';

export class GameOptions {
  constructor(public gameDifficulty: IDifficulty, public showConflictingCells: boolean) {}
}
