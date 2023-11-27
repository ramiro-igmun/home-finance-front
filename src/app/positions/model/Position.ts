export interface PositionInt {
  readonly date?: Date;
  readonly amount?: number;
  readonly description?: string;
  readonly category?: string;
  readonly parentCategory?: string;
  readonly type?: PositionType;
}
export class Position implements PositionInt {

  readonly amount: number= 0;
  readonly category: string = '';
  readonly parentCategory: string = '';
  readonly date: Date = new Date();
  readonly description: string = '';
  readonly type: PositionType = PositionType.INCOME;
  constructor(positionInt?: PositionInt) {
    this.amount = Number(positionInt?.amount);
    this.category = positionInt?.category || '';
    this.parentCategory = positionInt?.parentCategory || '';
    this.date = new Date(positionInt?.date || '2023');
    this.description = positionInt?.description || '';
    this.type = PositionType[positionInt?.type || PositionType.INCOME];
  }
}

export enum PositionType {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME'
}
