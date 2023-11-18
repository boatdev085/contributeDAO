import { Injectable, Scope } from "@nestjs/common";

type User = {
  id: number;
};

@Injectable({ scope: Scope.REQUEST })
export class UserJWTService {
  private user: User;

  public getUser = (): User => this.user;
  public setUser = (user: User) => (this.user = user);
}
