export interface PositionInt {
  readonly date: Date;
  readonly amount: number;
  readonly description: string;
  readonly category: string;
  readonly type: PositionType;
}
export class Position implements PositionInt{

  readonly amount: number;
  readonly category: string;
  readonly date: Date;
  readonly description: string;
  readonly type: PositionType;
  constructor(positionInt: PositionInt) {
    this.amount = Number(positionInt.amount);
    this.category = positionInt.category;
    this.date = new Date(positionInt.date);
    this.description = positionInt.description;
    this.type = PositionType[positionInt.type];
  }
}

export enum PositionType {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME'
}
