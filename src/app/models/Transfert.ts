import { Account } from "./Account";

export class Transfert {
  constructor(
    public id: number,
    public amount: string,
    public created: Date,
    public label: string,
    public transfertType: number,
    public account: Account
  ) {}
}
