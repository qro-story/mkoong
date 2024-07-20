import { PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class AbstractEntity {
  id: any;
}

export class NumberPkEntity extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;
}

export class StringPkEntity extends AbstractEntity {
  @PrimaryColumn()
  id: string;
}
