
export class Account {
  constructor(
    public accountNumberAsString: string,
    public accountStatus: string,
    public balance: number,
    public created: Date,
    public id: number,
    public number: string,
    public rate: number,
    public overdraft: number
  ) {}
}
