import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Rate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  base_currency: string;

  @Column()
  currency: string;

  @Column()
  rate: string;

  @Column({ type: "date" })
  date: Date
}
