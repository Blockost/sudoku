export class GameDifficulty {
  static readonly EASY: IDifficulty = {
    name: 'Easy',
    description: 'In Easy mode, at most 3 cells are hidden randomly',
    icon: 'icon-difficulty-easy.svg',
    level: 3
  };

  static readonly MEDIUM: IDifficulty = {
    name: 'Medium',
    description: 'In Medium mode, at most 5 cells are hidden randomly',
    icon: 'icon-difficulty-medium.svg',
    level: 5
  };

  static readonly HARD: IDifficulty = {
    name: 'Hard',
    description: 'In Hard mode, at most 7 cells are hidden randomly',
    icon: 'icon-difficulty-hard.svg',
    level: 7
  };

  static getList(): IDifficulty[] {
    return [GameDifficulty.EASY, GameDifficulty.MEDIUM, GameDifficulty.HARD];
  }

  static parse(difficultyName: string): IDifficulty {
    switch (difficultyName) {
      case 'Easy':
        return GameDifficulty.EASY;
      case 'Medium':
        return GameDifficulty.MEDIUM;
      case 'Hard':
        return GameDifficulty.HARD;
      default:
        throw new Error(`Difficulty name ${difficultyName} is not parseable`);
    }
  }
}

export interface IDifficulty {
  name: string;
  description: string;
  icon: string;
  level: number;
}
