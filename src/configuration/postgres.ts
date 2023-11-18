import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { config } from "dotenv";
import { Transaction } from "src/modules/transactions/transaction.entity";
import { User } from "src/modules/users/user.entity";
config();

class ConfigPostgresService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue("PORT", true);
  }

  public isProduction() {
    const mode = this.getValue("MODE", false);
    return mode != "DEV";
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: "postgres",
      host: this.getValue("DB_HOST"),
      port: parseInt(this.getValue("DB_PORT")),
      username: this.getValue("DB_USER"),
      password: this.getValue("DB_PASS"),
      database: this.getValue("DB_NAME"),
      entities: [User, Transaction],
      synchronize: true,
      logging: true,
    };
  }
}

const configPostgresService = new ConfigPostgresService(
  process.env
).ensureValues(["DB_HOST", "DB_PORT", "DB_USER", "DB_PASS", "DB_NAME"]);

export { configPostgresService };
