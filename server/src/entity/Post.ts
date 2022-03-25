import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  title!: string;

  @Column()
  contents!: string;

  @Column()
  imagePath!: string;

  @Column()
  address!: string;

  @Column()
  dueDate!: string;

  @Column()
  latitude!: string;

  @Column()
  longitude!: string;

  @CreateDateColumn({ name: "createdAt" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt!: Date;

  @ManyToOne((type) => User, (user) => user.post)
  user!: User;
}
