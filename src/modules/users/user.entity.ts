import { BaseEntity } from "src/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: "users" })
export abstract class User extends BaseEntity {
  @Column({ type: "varchar", nullable: false })
  name?: string;

  @Column({ type: "varchar", nullable: false })
  surname?: string;

  @Column({ type: "decimal", nullable: false })
  quota?: number;
}
