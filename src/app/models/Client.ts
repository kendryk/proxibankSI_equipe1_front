import { Account } from './Account';

export class Client {
  constructor(
    public _id: number,
    public adress: string,
    public city: string,
    public firstName: string,
    public name: string,
    public phone: string,
    public zipCode: string,
    public owner_id: number,
    public accountList: Array<Account>
  ) {}
}
